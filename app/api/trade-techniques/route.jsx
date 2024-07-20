import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { technique, Contract, LongShort, Leverage, EntryPrice, ExitPrice, Pip, Note, Timeframe, result } = await request.json();

  // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
  if (!technique || !result) {
    return NextResponse.json({ message: 'Technique and result are required' }, { status: 400 });
  }

  try {
    const newTradeTechnique = await prisma.tradeTechnique.create({
      data: {
        userId: token.id, // ดึง userId จาก token
        technique,
        Contract,
        LongShort,
        Leverage,
        EntryPrice,
        ExitPrice,
        Pip,
        Note,
        Timeframe,
        result,
      },
    });
    return NextResponse.json(newTradeTechnique, { status: 201 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
