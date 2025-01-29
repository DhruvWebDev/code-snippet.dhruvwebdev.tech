import { addJWTToHeader, addUser, createJWTToken, getUser } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const {username, password} = req.body;

    const existingUser = getUser({username, password});

    if(!existingUser){
        const newUser  = addUser({username, password})
        const jwtToken = createJWTToken(newUser.username)
        await  addJWTToHeader(jwtToken)
    }

    return new NextResponse.json({jwtToken}, {status:201})
}