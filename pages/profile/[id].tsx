import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils'

export interface Iprops {
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[]
    }
}

const Profile = ({ data }: Iprops) => {
    const [showUserVideos, setShowUserVideos] = useState(true);
    const [videosList, setVideosList] = useState<Video[]>([])
    const { user, userVideos, userLikedVideos } = data
    const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
    const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

    useEffect(() => {
        if (showUserVideos) {
            setVideosList(userVideos)
        }
        else {
            setVideosList(userLikedVideos);
        }
    }, [showUserVideos, userLikedVideos, userVideos])

    return (
        <div className="w-full">
            <div className="flex gap-6 md:gap-10 mb-4 w-full bg-white">
                <div className="w-16 h-16 md:w-32 md:h-32">
                    <Image alt={"user-profile"} src={user.image} width={120}
                        height={120} className="rounded-full" layout='responsive' />
                </div>
                <div className="flex flex-col justify-center">
                    <p className="flex gap-1 md:text-2xl tracking-wider 
                    items-center text-md font-bold lowercase text-primary">
                        {user.userName.replaceAll(' ', '')}
                        <GoVerified className="text-blue-400" />
                    </p>
                    <p className="captitalize text-gray-400 text-xs">{user.userName}</p>
                </div>
            </div>

            <div className="flex gap-6 border-b-2 mb-10 mt-10 border-gray-200 bg-white w-full">
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
                    onClick={() => setShowUserVideos(true)}
                >Videos</p>
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
                    onClick={() => setShowUserVideos(false)}
                >Liked</p>
            </div>

            <div className="flex gap-6 flex-wrap md:justify-start">
                {
                    videosList.length > 0 ? (
                        videosList.map((post: Video, idx: number) => (
                            <VideoCard post={post} key={idx} />
                        ))
                    )
                        : (
                            <NoResults text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`} />
                        )
                }
            </div>

        </div>
    )
}
export const getServerSideProps = async ({
    params: { id },
}: {
    params: { id: string };
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

    return {
        props: { data: res.data },
    };
};

export default Profile