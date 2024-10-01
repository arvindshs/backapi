import { NextResponse } from "next/server";

export async function GET() {
  // const db = await client.db("wasteuserdtabase");
  // const dbresponse = await db.collection("posts").find().toArray();
  return NextResponse.json({ srates: true });
}
