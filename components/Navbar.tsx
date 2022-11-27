import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiFillLayout, AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';


export interface IEvent{
  preventDefault:()=>void
}

const Navbar = () => {
  const [user, setUser] = useState(false);
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: IEvent) => {
    e.preventDefault();
    if(searchValue){
      router.push(`/search/${searchValue}`)
    }
  }

  return (/*py-1=0.25rem */
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        {/* md:w-[130px] md:h-[30px] */}
        <div className="w-[100px] h-[38px]">
          {/* Automatically responsive hence media queries not required */}
          <Image className="cursor-pointer" src={Logo} alt="TikTik" layout='responsive' />
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form className="absolute md:static top-10 left-20 bg-white" onSubmit={handleSearch}>
          <input type="text" value={searchValue} onChange={(e) => {setSearchValue(e.target.value) }} placeholder="Search Accounts and Videos"
            className="bg-primary w-[300px] md:w-[350px] top-0 rounded-full p-3 md:text-md 
         font-medium border-2 border-gray-100 focus:outline-none focus:border-2"
          />
          <button className="absolute md:right-5 right-6 top-4 border-l-2 
          border-gray-300 text-2xl text-gray-400 pl-4">
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {
          userProfile ?
            (
              <div className="flex items-center gap-5 md:gap-10">
                <Link href={"/upload"}>
                  <button className="flex gap-2 items-center text-md font-semibold border-2 px-2 md:px-4">
                    <IoMdAdd className="" />{` `}
                    <span className="">Upload</span>
                  </button>
                </Link>
                {userProfile.image && (
                  <Link href={"/"}>
                    <>
                      <Image alt="Profile Photo" className="rounded-full cursor-pointer"
                        width={40} height={40} src={userProfile.image} />
                    </>
                  </Link>
                )
                }
                <button type="button" className="px-2" onClick={() => {
                  googleLogout();
                  removeUser();
                }} >
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              </div>
            ) :
            (
              <GoogleLogin
                onSuccess={(response) => createOrGetUser(response, addUser)}
                onError={() => console.log('Error')}
              />
            )
        }
      </div>
    </div>
  )
}

export default Navbar