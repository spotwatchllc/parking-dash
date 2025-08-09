import postgres from 'postgres';

// Create the database connection
const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: false
});

export { sql };

let initializationPromise: Promise<void> | null = null;

export async function ensureInitialized() {
    if (!initializationPromise) {
        initializationPromise = BoxDatabase.initializeTable();
    }
    return initializationPromise;
}

export type Box = {
    box_id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

// database operations for boxes
export class BoxDatabase {
    // Init the database table
    static async initializeTable() {
        try {
            await sql`
                CREATE TABLE IF NOT EXISTS boxes (
                    id SERIAL PRIMARY KEY,
                    box_id INTEGER NOT NULL,
                    x1 NUMERIC NOT NULL,
                    y1 NUMERIC NOT NULL,
                    x2 NUMERIC NOT NULL,
                    y2 NUMERIC NOT NULL,
                    is_calibration BOOLEAN DEFAULT true,
                    is_locked BOOLEAN DEFAULT false,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;

            await sql`ALTER TABLE boxes ADD COLUMN IF NOT EXISTS is_calibration BOOLEAN DEFAULT true`;
            await sql`ALTER TABLE boxes ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT false`;

            await sql`CREATE INDEX IF NOT EXISTS idx_boxes_box_id ON boxes(box_id)`;
            await sql`CREATE INDEX IF NOT EXISTS idx_boxes_calibration ON boxes(is_calibration, is_locked)`;

            console.log('Boxes table initialized successfully.');
        } catch(error) {
            console.error('Error initializing boxes table: ', error);
            throw error;
        }
    };

    // Replace the current setBoxes func
    static async setBoxes(boxes: Box[]): Promise<void> {
        try {
            await sql.begin(async (sql) => [
                // clear existing boxes
                await sql`DELETE FROM boxes`,

                // insert new boxes if it exists
                ...(boxes.length > 0 ? [
                    await sql`
                        INSERT INTO boxes ${sql(boxes, 'box_id', 'x1', 'y1', 'x2', 'y2')}
                    `
                ] : [])
            ]);

            console.log(`Successfully stored ${boxes.length} boxes.`);
        } catch(error) {
            console.error('Error storing boxes: ', error);
            throw error;
        }
    }

    // Replace the current getBoxes func
    static async getBoxes(): Promise<Box[]> {
        try {
            const result = await sql<Box[]>`
                SELECT box_id, x1, y1, x2, y2
                FROM boxes
                ORDER BY box_id ASC
            `;

            console.log(`Retrieved ${result.length} boxes from database`);
            return result;
        } catch(error) {
            console.error('Error retrieving boxes: ', error);
            throw error;
        }
    }

    // Get boxes by specific box_id
    static async getBoxById(boxId: number): Promise<Box | null> {
        try {
            const result = await sql<Box[]>`
                SELECT box_id, x1, y1, x2, y2
                FROM boxes
                WHERE box_id = ${boxId}
                LIMIT 1
            `;

            return result[0] || null;
        } catch(error) {
            console.error('Error retrieving box by ID: ', error);
            throw error;
        }
    }

    // Add timestamp for when boxes were last updated 
    static async getLastUpdated(): Promise<Date | null> {
        try {
            const result = await sql`
                SELECT MAX(updated_at) as last_updated
                FROM boxes
            `;

            return result[0]?.last_updated || null;
        } catch(error) {
            console.error('Error getting last updated time: ', error);
            return null;
        }
    }
};