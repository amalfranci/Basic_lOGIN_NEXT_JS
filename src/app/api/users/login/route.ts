import DbConn from "@/dbConfig/dbConn.js"
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
DbConn()

export async function POST(request:NextRequest) {

    try {
        const reqBody =await request.json()
        const {email,password}= reqBody
        const user = await User.findOne({email})
        if(!user){

            return NextResponse.json({error:"user not found"},{status:400})
        }
        const validPassword=await bcrypt.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"},{status:400})
        }
        const tokenData= {
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'})

        const response=NextResponse.json({
            message:"Login successfull",
            success:true,
            UserToken:token,
        })
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response

        
    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
    
}