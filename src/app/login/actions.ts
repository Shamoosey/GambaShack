'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const response = await supabase.auth.signInWithPassword(data)

  if (response.error) {
    return {
      error: "Invalid credentials, please try again.",
      data
    }
  }

  // Check if email has been verified
  if (response.data.user && !response.data.user.email_confirmed_at) {
    return {
      error: "Please verify your email before logging in.",
      data
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  const returnVal = {
    error: null,
    success: null,
    data,
  }

  if(data.password != data.confirmPassword) {
    returnVal.error = "Passwords do not match"
    return returnVal
  }

  const response = await supabase.auth.signUp({
    email: data.email,
    password: data.password
  })

  if (response.error) {
    // Check if the error is related to an existing user
    if (response.error.message?.includes("already registered")) {
      returnVal.error = "A user already exists with this email"
    } else {
      returnVal.error = "An error occurred, please try again."
    }
    return returnVal
  }

  // Success message for email verification
  if (response.data.user && !response.data.user.email_confirmed_at) {
    returnVal.success = "Please check your email to verify your account before logging in.";
    return returnVal;
  }

  // If we get here with a user, it means signup was successful
  revalidatePath('/', 'layout')
  redirect('/')
}