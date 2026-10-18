import { NextResponse } from 'next/server';
import { db } from '../../lib/couchdb';

// دریافت لیست تمام ماشین‌ها از Supabase
export async function GET() {
  try {
    const { data: cars, error } = await db.from('cars').select('*');

    if (error) {
      throw error;
    }

    return NextResponse.json(cars);
  } catch (error: any) {
    console.error("Supabase Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ثبت ماشین جدید در Supabase
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await db.from('cars').insert([body]).select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, car: data });
  } catch (error: any) {
    console.error("Supabase Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}