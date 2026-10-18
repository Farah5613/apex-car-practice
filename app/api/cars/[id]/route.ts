import { NextResponse } from 'next/server';
import { db } from '../../../lib/couchdb';

// دریافت یک خودرو با شناسه مشخص
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { data, error } = await db
      .from('cars')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
}

// ویرایش اطلاعات خودرو
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const body = await request.json();

    const updateData = { ...body };
    delete updateData.id;
    delete updateData._id;

    const { data, error } = await db
      .from('cars')
      .update(updateData)
      .eq('id', params.id)
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, car: data });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// حذف خودرو
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { error } = await db.from('cars').delete().eq('id', params.id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}