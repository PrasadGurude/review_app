'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDebounceValue, useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/schemas/signUpSchema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'
import { signInSchema } from '@/schemas/signInSchema'
import { sign } from 'crypto'
import { signIn } from 'next-auth/react'

const page = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)


  const router = useRouter()

  // zod implementation 
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })

    if(result?.error){
      toast("Incorrect username or password")
    }
    
    if(result?.url){
      toast("Login is complete")
      router.replace('/dashboard')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full maxw-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl md-6">Join Mystery Message</h1>
          <p className="mb-4">sign in tostart your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username/Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username or email"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                      }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
            <Button type='submit' disabled={isSubmitting}>
              {
                isSubmitting ? (<><Loader2 className='m-2 h-4 w-4 animate-spin' /> please wait</>) : ('Signup')
              }
            </Button>
          </form>
        </Form>
        <div className='text-center mt-4'>
          <p>
            don't have a account?{' '}
            <Link href={'/sign-up'} className='text-blue-600 hover:text-blue-800'>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page