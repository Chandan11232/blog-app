'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { signOut, signIn, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession();
  const [toggledropdown, setToggledropdown] = useState(false);
  const [providers, setProviders] = useState(null);


  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }
    setUpProviders();
  }, [])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" width={30} alt='Promptopia Logo' height={30} />
        <p className='logo_text'>Promptopia</p>
      </Link>



      {/* Desktop navigation  */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
            <Link href="/profile">
              <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile' />
            </Link>
          </div>
        ) : <>
          {providers && Object.values(providers).map((provider) => (
            <button type='button' onClick={() => signIn(provider.id)} key={provider.name} className='black_btn'>
              Sign In
            </button>
          ))}
        </>}
      </div>



      {/* mobile navigation */}
      <div className='sm:hidden flex relative cursor-pointer'>
        {session?.user ? (
          <div className='flex'>
            <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile' onClick={() => setToggledropdown((prev) => !prev)} />
            {toggledropdown && (
              <div className='dropdown'>
                <Link href="/profile" className='dropdown_link' onClick={() => setToggledropdown(false)}>My Profile</Link>
                <Link href="/create-prompt" className='dropdown_link' onClick={() => setToggledropdown(false)}>Create Prompt</Link>
                <button type='button' onClick={() => {
                  setToggledropdown(false);
                  signOut();
                }} className='mt-5 w-full black_btn'>Sign Out</button>
              </div>
            )}
          </div>
        ) : <>
          {providers && Object.values(providers).map((provider) => (
            <button type='button' onClick={() => signIn(provider.id)} key={provider.name} className='black_btn'>
              Sign In
            </button>
          ))}
        </>
        }
      </div>
    </nav>
  )
}

export default Nav

