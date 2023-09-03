import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'

connect();

export async function POST(req:NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    console.log("reqBody is : ", reqBody)

    const user = await User.findOne({ email })
    
    // 이미 입력한 이메일이 있다면
    if (user) {
      return NextResponse.json(
        { error: '가입한 이메일이 있습니다!' },
        { status: 400 }
      )
    }

    //hash pw
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: '회원 가입 완료!',
      success: true,
      savedUser
    })
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message },{ status: 500 }
    )
  }
}