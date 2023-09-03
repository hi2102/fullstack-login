'use client';

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignUp = async () => {
    try {
      setLoading(true)
      const res = await axios.post('/api/users/signup', user);
      console.log('회원 가입 성공', res.data)
      router.push('/login')
    } catch (error: any) {
      console.log('회원 가입 실패', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if ( user.email && user.password && user.username ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  
  return <form className="min-h-screen flex flex-col items-center justify-center py-2">
    <h1>{!loading ? 'Sign Up':'Processing...'}</h1>
    <hr />
    <label htmlFor="username">이름</label>
    <input
      className="mb-4 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-600"
      id="username"
      type="text"
      value={user.username}
      onChange={e => setUser({ ...user, username: e.target.value })}
      placeholder="username"
      required
    />
    <label htmlFor="email">이메일</label>
    <input
      className="mb-4 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-600"
      id="email"
      type="email"
      value={user.email}
      onChange={e => setUser({ ...user, email: e.target.value })}
      placeholder="email"
      required
    />
    <label htmlFor="password">비밀번호</label>
    <input
      className="mb-4 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-600"
      id="password"
      type="password"
      value={user.password}
      onChange={e => setUser({ ...user, password: e.target.value })}
      placeholder="password"
      required
    />
    <button
      onClick={onSignUp}
      type="submit" className="mb-4 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-600">{buttonDisabled ? "no sign up":'sign up'}</button>
    <div className="text-center">
      <h6>회원이신가요?</h6>
      <Link href='/login'>로그인 페이지로 가기</Link>
    </div>
  </form>
}