import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        created: 'desc'
      }
    })
    return new NextResponse(JSON.stringify(todos), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch todos'}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { body } = await request.json()
    const todo = await prisma.todo.create({
      data: { 
        body,
        updated: new Date()
      }
    })
    return new NextResponse(JSON.stringify(todo), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to create todo' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
