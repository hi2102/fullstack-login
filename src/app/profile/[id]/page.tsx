'use client';

import Link from "next/link";
import { useParams } from "next/navigation";

export default function UserProfile() {
  const currentParam = useParams();
  return <div className="min-h-screen flex flex-col items-center justify-center py-2">
    <h1>User Profile</h1>
    <hr />
    <p className="text-4xl">User Profile Page <span className="ml-2 p-2 rounded bg-orange-500">
      {currentParam.id}
    </span>
    </p>
    <Link href='/'>go to Home</Link>
    <Link href='/signin'>go to signin</Link>
    <Link href='/login'>go to login</Link>
  </div>
}