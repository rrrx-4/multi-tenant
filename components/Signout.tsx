
'use client'
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from 'react'

const Signout = () => {

    const router = useRouter();
  return (
    <div className="flex justify-center items-center">  <button
              className="border border-solid border-black rounded p-[2px]"
              onClick={() => {
                signOut({ redirect: false }).then(() => {
                  router.replace("/login");
                });
              }}
            >
              Sign Out
            </button></div>
  )
}

export default Signout