'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <div className="bg-slate-200 flex text-black">
      Not signed in <br />
      <button className="bg-orange-400 p-2 m-1 rounded-2xl" onClick={() => signIn()}>Sign in</button>
    </div>
  )
}