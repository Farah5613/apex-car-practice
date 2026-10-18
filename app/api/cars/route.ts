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
    
    // اگر در دیتابیس Supabase فیلد id به صورت خودکار ساخته می‌شود، نیازی به ارسال دستی _id نیست
    const { data, error } = await db.from('cars').insert([body]).select();

    if (error) throw error;
    return NextResponse.json({ success: true, car: data });
  } catch (error: any) {
    console.error("Supabase Insert Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}