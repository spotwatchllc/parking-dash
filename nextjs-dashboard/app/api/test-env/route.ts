export async function GET() {
  return new Response(process.env.NEXTAUTH_SECRET || "No secret set")
}