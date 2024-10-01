import genrateotp from "@/app/lib/otp";
import { NextResponse } from "next/server";
import sendEmail from "@/app/lib/mail";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  return NextResponse.json({ ststes: true });
}

export async function POST(response) {
  const client = await clientPromise;
  const res = await response.json();
  const db = await client.db("userdtabase");
  const posts = await db
    .collection("users")
    .find({ email: res.email })
    .toArray();
  const otps = await db
    .collection("otp")
    .find({ emailId: res.email })
    .toArray();
  if (posts.length === 0 && otps.length === 0) {
    const serverotp = genrateotp();
    const mailstst = await sendEmail(
      res.email,
      "Verification Email",
      serverotp
    );
    if (mailstst) {
      const db = await client.db("userdtabase");
      const posts = await db
        .collection("otp")
        .insertOne({ emailId: res.email, otp: serverotp });
      if (posts) {
        return NextResponse.json({ states: true });
      }
    } else {
      return NextResponse.json({ states: false, messege: "server ERROR" });
    }
    return NextResponse.json({ states: true, messege: "OTP send" });
  } else {
    return NextResponse.json({ states: false, messege: "email alredy exist" });
  }
}
