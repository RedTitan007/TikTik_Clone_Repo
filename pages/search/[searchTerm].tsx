import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import axios from 'axios';

import NoResults from '../../components/NoResults';
import VideoCard from '../../components/VideoCard';
import useAuthStore from '../../store/authStore';
import { BASE_URL } from '../../utils';
import { IUser, Video } from '../../types';

export interface Iprops {
    videos: Video[]
}

const Search = ({ videos }: Iprops) => {
    const [isAccounts, setisAccounts] = useState(true);
    const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
    const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
    const router = useRouter();
    const { allUsers } = useAuthStore()
    const { searchTerm }: any = router.query
    const searchAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(
        searchTerm.toLowerCase()
    ));
    return (
        <div>
            <div className="flex gap-6 border-b-2 mb-10 mt-10 border-gray-200 bg-white w-full">
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
                    onClick={() => setisAccounts(true)}
                >Accounts</p>
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
                    onClick={() => setisAccounts(false)}
                >Videos</p>
            </div>
            {isAccounts ?
                (
                    <div className="md:mt-15">
                        {searchAccounts.length > 0 ? (
                            searchAccounts.map((user: IUser, idx: number) => (
                                <Link href={`/profile/${user._id}`} key={idx}>
                                    <div className="flex items-start gap-3 border-b-2 border-gray-200
                                    p-2 cursor-pointer font-semibold rounded">
                                        <div>
                                            <Image alt={"user-profile"} src={user.image} width={50}
                                                height={50} className="rounded-full" />
                                        </div>
                                        <div className="hidden xl:block">
                                            <p className="flex gap-1 items-center text-md font-bold lowercase text-primary">
                                                {user.userName.replaceAll(' ', '')}
                                                <GoVerified className="text-blue-400" />
                                            </p>
                                            <p className="captitalize text-gray-400 text-xs">{user.userName}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) :
                            <NoResults text={`No Video Results for ${searchTerm}`} />
                        }
                    </div>
                ) :
                (
                    <div className="md:mt-16 flex gap-6 flex-wrap md:justify-start">
                        {
                            videos.length > 0 ?
                                (
                                    videos.map((post: Video, idx: number) => (
                                        <VideoCard post={post} key={idx} />
                                    ))
                                ) : <NoResults text={`No Video Results for ${searchTerm}`} />

                        }

                    </div>
                )
            }
        </div>
    )
}

export const getServerSideProps = async ({
    params: { searchTerm },
}: {
    params: { searchTerm: string };
}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

    return {
        props: { videos: res.data },
    };
};

export default Search;
