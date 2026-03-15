#!/usr/bin/env bash
set -euo pipefail

# Find repo root so script works from anywhere
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

# Prefer nextjs-dashboard/.env, fallback to repo root .env
ENV_CANDIDATES=(
  "$REPO_ROOT/nextjs-dashboard/.env"
  "$REPO_ROOT/.env"
)

# Always ignore any previously-exported DATABASE_URL
unset DATABASE_URL

# Load first env file that defines DATABASE_URL
ENV_FILE_USED=""
for f in "${ENV_CANDIDATES[@]}"; do
  if [[ -f "$f" ]]; then
    set -a
    # shellcheck disable=SC1090
    source "$f"
    set +a
    if [[ -n "${DATABASE_URL:-}" ]]; then
      ENV_FILE_USED="$f"
      break
    fi
  fi
done

if [[ -z "$ENV_FILE_USED" ]]; then
  echo "ERROR: DATABASE_URL not found in:"
  printf "  - %s\n" "${ENV_CANDIDATES[@]}"
  exit 1
fi

if ! command -v psql >/dev/null 2>&1; then
  echo "ERROR: psql not found. Install PostgreSQL client tools (psql)."
  exit 1
fi

# Defaults (you don't need to set anything)
IMAGES="${IMAGES:-12}"                 # comma-separated image_ids
BOXES_PER_IMAGE="${BOXES_PER_IMAGE:-200}"
DEFAULT_AVAIL="${DEFAULT_AVAIL:-0}"

# Convert Prisma DATABASE_URL -> psql-compatible by removing ?schema=...
DB_URL_PSQL="$(python3 - <<'PY'
import os, urllib.parse
u = os.environ.get("DATABASE_URL","").strip()
p = urllib.parse.urlparse(u)
q = urllib.parse.parse_qs(p.query, keep_blank_values=True)
q.pop("schema", None)  # Prisma-only
new_q = urllib.parse.urlencode({k:v[0] for k,v in q.items()}, doseq=False)
print(urllib.parse.urlunparse((p.scheme, p.netloc, p.path, p.params, new_q, p.fragment)))
PY
)"

# Force TCP on macOS (avoid unix socket quirks)
DB_URL_PSQL="${DB_URL_PSQL/localhost/127.0.0.1}"

echo "Seeding Postgres boxes table..."
echo "  Using .env: $ENV_FILE_USED"
echo "  IMAGES=$IMAGES"
echo "  BOXES_PER_IMAGE=$BOXES_PER_IMAGE"
echo "  DEFAULT_AVAIL=$DEFAULT_AVAIL"

psql "$DB_URL_PSQL" -v ON_ERROR_STOP=1 <<SQL
DO \$\$
DECLARE
  image_ids int[] := string_to_array('$IMAGES', ',')::int[];
  img int;
  b int;

  -- Placeholder deterministic coords (real coords come from your bbox detection pipeline)
  x int;
  y int;
  w int := 10;
  h int := 10;
BEGIN
  FOREACH img IN ARRAY image_ids LOOP
    FOR b IN 1..$BOXES_PER_IMAGE LOOP
      x := ((b - 1) % 20) * (w + 2);
      y := ((b - 1) / 20) * (h + 2);

      INSERT INTO boxes (
        image_id, box_id,
        x1, y1, x2, y2, x3, y3, x4, y4,
        availability, updated_at
      ) VALUES (
        img, b,
        x, y,
        x + w, y,
        x + w, y + h,
        x, y + h,
        $DEFAULT_AVAIL, NOW()
      )
      ON CONFLICT (image_id, box_id) DO NOTHING;
    END LOOP;
  END LOOP;
END
\$\$;

SELECT image_id, COUNT(*) AS boxes_seeded
FROM boxes
WHERE image_id = ANY(string_to_array('$IMAGES', ',')::int[])
GROUP BY image_id
ORDER BY image_id;
SQL

echo "Done."
