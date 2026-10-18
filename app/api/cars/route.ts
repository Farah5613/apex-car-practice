import { NextResponse } from 'next/server';
import { db } from '../../lib/couchdb';

// دریافت لیست تمام خودروها
export async function GET() {
  try {
    const { data, error } = await db.from('cars').select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ثبت خودروی جدید
// ثبت خودروی جدید
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // استخراج فقط فیلدهای معتبر که ستون‌های جدول Supabase هستند
    const carData = {
      title: body.title,
      image: body.image,
      description: body.description,
    };

    const { data, error } = await db.from('cars').insert([carData]).select();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, car: data });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}