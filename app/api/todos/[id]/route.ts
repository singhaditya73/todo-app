import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { NextRequest } from 'next/server'

const prisma = new PrismaClient()

interface RouteParams {
  params: {
    id: string;
  };
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await prisma.todo.delete({
      where: { id: parseInt(params.id) }
    })
    return new NextResponse(JSON.stringify({ message: 'Todo deleted successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to delete todo' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}