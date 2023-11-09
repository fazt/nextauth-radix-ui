"use client";
import { Flex, TextField, Button } from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/navigation'

function SigninForm() {
  const { control, handleSubmit } = useForm({
    values: {
      name: "",
      email: "",
      password: "",
    }
  });
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post('/api/auth/register', data)
    console.log(res)

    if (res.status === 201) {
      const result = await signIn('credentials', {
        email: res.data.email,
        password: data.password,
        redirect: false
      })

      if (!result?.ok) {
        console.log(result?.error)
        return;
      }

      router.push('/dashboard')
    }

  });

  return (
    <form onSubmit={onSubmit}>
      <Flex direction="column" gap="2">
        <label htmlFor="name">Name:</label>
        <TextField.Root>
          <TextField.Slot>
            <PersonIcon height="16" width="16" />
          </TextField.Slot>

          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                message: "Name is required",
                value: true,
              },
            }}
            render={({ field }) => {
              return (
                <TextField.Input
                  type="text"
                  placeholder="Write your name"
                  autoFocus
                  {...field}
                />
              );
            }}
          />
        </TextField.Root>

        <label htmlFor="email">Email</label>
        <TextField.Root>
          <TextField.Slot>
            <EnvelopeClosedIcon height="16" width="16" />
          </TextField.Slot>

          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                message: "Email is required",
                value: true,
              },
            }}
            render={({ field }) => {
              return (
                <TextField.Input
                  type="email"
                  placeholder="email@domain.com"
                  {...field}
                />
              );
            }}
          />
        </TextField.Root>

        <label htmlFor="password">Password</label>
        <TextField.Root>
          <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
          </TextField.Slot>
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                message: "Password is required",
                value: true,
              },
            }}
            render={({ field }) => {
              return (
                <TextField.Input
                  type="password"
                  placeholder="*******"
                  {...field}
                />
              );
            }}
          />
        </TextField.Root>

        <Button type="submit" color="blue">Sign Up</Button>
      </Flex>
    </form>
  );
}
export default SigninForm;
