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

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("football_league_db");

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ status: 400, message: "All fields are required" }, { status: 400 });
    }

    const newCompany = { name };
    const result = await db.collection("companies").insertOne(newCompany);

    return NextResponse.json({ status: 201, message: "Company added successfully", data: result.ops[0] });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal Server Error" }, { status: 500 });
  }
}
