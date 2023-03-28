import React from 'react'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Login from '@/components/Login'
import Logout from '@/components/logout'
import DeleteUser from '@/components/deleteUser'

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <>
      <Head>
        <title>next-rails-google-auth</title>
      </Head>
      <div>
        <h1>next-rails-google-auth</h1>

        {status === 'authenticated' ? (
          <div>
            <p>セッションの期限：{session.expires}</p>
            <p>ようこそ、{session.user.name}さん</p>
            <img src={session.user.image} alt='' style={{ borderRadius: '50px' }} />
            <div>
              <Logout />
            </div>
            <div>
              <DeleteUser />
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </>
  )
}
