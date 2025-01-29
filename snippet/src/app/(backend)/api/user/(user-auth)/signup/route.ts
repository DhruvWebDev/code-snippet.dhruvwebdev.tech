import { NextResponse } from 'next/server';
import { addUser, createJWTToken, getUser } from '@/lib/utils';

export default async function POST(req) {
    const { username, password } = await req.json();

const existingUser = await getUser({username, password})
    // If user already exists, return an error
    if (existingUser) {
        return NextResponse.json(
            { message: "User already exists" },
            { status: 400 }
        );
    }


    const newUser = await addUser({username, password})
    
    // Generate JWT token for the new user
    const token  = createJWTToken(newUser.username)
    // Return the JWT token in the response
    return NextResponse.json(
        { token },
        { status: 201 }
    );
}
