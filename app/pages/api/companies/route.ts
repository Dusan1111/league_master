// app/api/companies/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("football_league_db");
    const allCompanies = await db.collection("companies").find({}).toArray();
    return NextResponse.json({ status: 200, data: allCompanies });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal Server Error" }, { status: 500 });
  }
}
