import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req:NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log("reqBody is : ", reqBody)

    const user = await User.findOne({ email })
    
    // 이미 입력한 이메일이 있다면
    if (!user) {
      return NextResponse.json(
        { error: '가입한 이메일이 있습니다!' },
        { status: 400 }
      )
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password)

    if (!validPassword) {
      return NextResponse.json({error:'Invalid Password'},{status: 400})
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    // create JWT
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})
    
    const res = NextResponse.json({
      message: '로그인 성공',
      success: true,
    })

    res.cookies.set('token', token, { httpOnly: true });
    return res;
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message },{ status: 500 }
    )
  }
}