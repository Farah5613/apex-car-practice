import { NextResponse } from 'next/server';
import { db } from '../../lib/couchdb';

// دریافت لیست خودروها
export async function GET() {
  try {
    const { data: cars, error } = await db.from('cars').select('*');
    if (error) throw error;
    return NextResponse.json(cars);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ثبت خودروی جدید
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Request Body:", body); // چاپ داده‌های ارسالی

    const { data, error } = await db.from('cars').insert([body]).select();

    if (error) {
      console.error("Supabase Error Detail:", error); // چاپ خطای دقیق Supabase
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, car: data });
  } catch (error: any) {
    console.error("Server Catch Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}