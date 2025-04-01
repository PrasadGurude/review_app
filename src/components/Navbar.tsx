'use client'

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from '@react-email/components'

const Navbar = () => {
    const { data: session } = useSession()
    const user: User = session?.user as User

    return (
        <nav className='p-4 md:p-6 shadow-md'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                <Link className='text-xl font-bold mb-4 md:mb-0' href="#">Mystry Message</Link>
                {
                    session ? (
                        <div>
                            <span className='mr-4'>Welcome, {user?.username || user?.email}</span>
                            <Button className='w-full md:w-auto' onClick={() => { signOut() }}>Logout</Button>
                        </div>
                    ) : (
                        <Link href='/sign-in'>
                            <Button>Login</Button>
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar