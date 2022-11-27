import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { IUser } from '../types'
import useAuthStore from '../store/authStore'

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers])

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="font-semibold text-gray-500 m-3 mt-4 hidden xl:block">
        Suggested accounts
      </p>
      <div>
        {
          allUsers.slice(0, 6).map((user: IUser) => (
            <Link key={user._id} href={`/profile/${user._id}`}>
              <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded hover:bg-primary">
                <div className="w-8 h-8">
                  <Image alt={"user-profile"} src={user.image} width={34}
                    height={34} className="rounded-full" layout='responsive' />
                </div>
                <div className="hidden xl:block">
                  <p className="flex gap-1 items-center text-md font-bold lowercase text-primary">{user.userName.replaceAll(' ','')}
                  <GoVerified className="text-blue-400"/>
                  </p>
                  <p className="captitalize text-gray-400 text-xs">{user.userName}</p>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default SuggestedAccounts