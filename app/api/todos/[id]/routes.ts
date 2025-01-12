import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

interface RouteParams{
    param: {
        id: string
    }
}

export async function DELETE(
    request:NextRequest,
    {param} :RouteParams
) : Promise <NextResponse>{
    try {
        await prisma.todo.delete({
            where:{id: parseInt(param.id)}
        })
        return NextResponse.json({message:'todos deleted succesfully'})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            {error:"failed to delete"},
            {status:500}
        )
    }
}