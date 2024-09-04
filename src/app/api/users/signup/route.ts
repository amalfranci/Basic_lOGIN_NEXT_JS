import DbConn from "@/dbConfig/dbConn.js"
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

// Initialize database connection
DbConn()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody
    console.log("Received data:", reqBody)

    // Check if the user already exists
    const user = await User.findOne({ email })
    if (user) {
      return NextResponse.json({
        error: "User already exists"
      }, { status: 400 })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })
    const savedUser = await newUser.save()

    console.log("Saved user:", savedUser)

    // Return a success response, omitting the password
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      }
    }, { status: 200 })

  } catch (error: any) {
    console.error("Error occurred:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
