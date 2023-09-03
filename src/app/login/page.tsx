'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const res = await axios.post('/api/users/login', user);
      console.log('로그인 성공', res.data)
      toast.success('로그인 성공')
      router.push('/profile')
    } catch (error: any) {
      console.log('로그인 실패', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    if ( user.email && user.password ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  
  return <form className="min-h-screen flex flex-col items-center justify-center">
    <div className="flex flex-col items-center justify-center border border-neutral-500 rounded-2xl p-20">

    
    <h1>Login Page</h1>
    <hr />
    <label htmlFor="email">이메일</label>
    <input
      className="mb-4 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-600"
      id="email"
      type="email"
      value={user.email}
      onChange={e => setUser({ ...user, email: e.target.value })}
      placeholder="email"
    />
    <label htmlFor="password">비밀번호</label>
    <input
      className="mb-4 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-600"
      id="password"
      type="password"
      value={user.password}
      onChange={e => setUser({ ...user, password: e.target.value })}
      placeholder="password"
    />
    <button
      onClick={onLogin}
      type="submit" className="mb-4 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-600">{loading ? 'Processing...':'Login'}</button>
    <div className="text-center">
      <h6>아직 회원이 아니신가요?</h6>
        <Link href='/signup'>
          <button className="mt-20 border border-neutral-500 px-4 py-2 rounded-lg">
          회원가입 하기
          </button>
        </Link>
      </div>
      </div>
  </form>
}