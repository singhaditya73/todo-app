import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
interface TodoRequest {
    body: string;
  }

export async function GET():Promise<NextResponse> {
    try {
    const todos = await prisma.todo.findMany()
    return NextResponse.json(todos);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            {error:"something went wrong!"},
            {status:500}
        )
    }   
}

export async function POST(request:NextRequest):Promise<NextResponse>{
    try {
        const {body} = await request.json() as TodoRequest;
        const todo = await prisma.todo.create({
            data:{
            body,
            updated:new Date()
            }
        })
        return NextResponse.json(todo)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            {error:"somethiong went wrong"},
            {status:500}
        )
    }
   

}