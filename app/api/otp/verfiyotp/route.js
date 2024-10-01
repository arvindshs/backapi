import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  return NextResponse.json({ ststes: true });
}
export async function POST(response) {
  const res = await response.json();
  const client = await clientPromise;
  const db = await client.db("userdtabase");
  const posts = await db
    .collection("otp")
    .find({ emailId: res.email })
    .toArray();

  if (posts) {
    if (posts.length !== 0) {
      if (Number(res.otp) === posts[0].otp) {
        const db = await client.db("userdtabase");
        const postdb = await db
          .collection("otp")
          .deleteOne({ emailId: res.email });
        if (postdb) {
          return NextResponse.json({ states: true });
        }
      } else {
        return NextResponse.json({ states: false, message: "Wrong otp" });
      }
    } else {
      return NextResponse.json({
        states: false,
        message: "Something Went Wrong",
      });
    }
  }
}
