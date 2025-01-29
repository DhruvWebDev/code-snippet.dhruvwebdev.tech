import jsonwebtoken from 'jsonwebtoken';
import { prisma } from "@/lib/prisma-client";
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { addJWTToHeader, createJWTToken, getUser } from '@/lib/utils';

export default async function POST(req, res) {
    const { username, password } = req.body;

    const existingUser = getUser({ username, password })
    // If user not found, return an error
    if (!existingUser) {
        return NextResponse.json(
            { message: "ADMIN Didnt Exist" },
            { status: 404 }
        );
    }
    const token = createJWTToken(existingUser.username)


    // Add the generated token to the cookie
    await addJWTToHeader(token);
    // Return the generated token in the response
    return NextResponse.json(
        { token },
        { status: 201 }
    );
}
