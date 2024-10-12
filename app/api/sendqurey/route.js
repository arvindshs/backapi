// import { NextResponse } from "next/server";
// import genrateotp from "@/app/lib/otp";
// import sendEmail from "@/app/lib/mail";
// import clientPromise from "@/app/lib/mongodb";
// import { ObjectId } from "mongodb";
// import { nextImageLoaderRegex } from "next/dist/build/webpack-config";

// export async function GET() {
//   return NextResponse.json({ ststes: true });
// }

// export async function POST(response) {
//   const client = await clientPromise;
//   const resdata = await response.json();
//   // const product = `mobial number:${posts[0].number} , product:${resdata.title}`;
//   // const mailstst = await sendEmail(
//   //   resdata.email,
//   //   "Request to buy your product",
//   //   product
//   // );
//   // if (mailstst) {
//   //   return NextResponse.json({
//   //     states: true,
//   //   });
//   // }
//   // return NextResponse.json({
//   //   states: false,
//   // });
//   return NextResponse.json({
//     data: resdata,
//   });
// }

import { NextResponse } from "next/server";
import sendEmail from "@/app/lib/mail";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  return NextResponse.json({ status: true });
}

export async function POST(request) {
  const resdata = await request.json();
  const product = `mobial number:${resdata.mobialNum} , product:${resdata.type},name:${resdata.name} was requested to buy this product that you have been sell in the recycle rally site`;
  const mailstst = await sendEmail(
    resdata.email,
    "Request to buy your product",
    product
  );
  if (mailstst) {
    return NextResponse.json({
      states: true,
    });
  }
  return NextResponse.json({
    states: false,
  });
}
