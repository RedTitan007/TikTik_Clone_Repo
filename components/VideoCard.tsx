import { NextPage } from 'next'
import React, { useEffect, useState, useRef } from 'react'
import { Video } from '../types'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';


export interface Iprops {
  post: Video
}

const VideoCard: NextPage<Iprops> = ({ post }) => {

  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    }
    else {
      videoRef.current?.play();
      setPlaying(true);
    }
  }
  const onMutePress = () => {
    if (isVideoMuted) {
      videoRef.current?.muted;
      setIsVideoMuted(false);
    }
    else {
      videoRef.current?.play();
      setIsVideoMuted(true);
    }
  }
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted])

  return (
    <div className="flex flex-col border-b-2 border-grap-300 pb-6">
      <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
        <div className="w-10 h-10 md:w-16 md:h-16">
          <Link href={`/profile/${post.postedBy._id}`}>
            <>
              <Image alt="Profile Photo" className="rounded-full"
                width={62} height={62} src={post.postedBy.image} />
            </>
          </Link>
        </div>
        <div>
        <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex gap-3 items-center">
              <p className='flex gap-2 items-center'>{post.postedBy.userName}{` `}
                <GoVerified className="text-blue-400 text-md" />
              </p>
              <p className="capitalize text-xs font-medium text-gray-500 hidden md:block">{post.postedBy.userName}</p>
            </div>
          </Link>
        </div>  
      </div>
      <div className="lg:ml-20 flex gap-4 relative">
        <div className="rounded-3xl" onMouseEnter={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}>
          <Link href={`/detail/${post._id}`}>
            <video
              ref={videoRef}
              loop src={post.video.asset.url}
              className="lg:w-[600px] h-[300px] md:h-[400px] rounded-2xl cursor-pointer bg-gray-100"></video>
          </Link>
          {
            isHover &&
            (
              <div className="absoulte bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between
              w-[100px] md:w-[50px] p-3">
                {playing ?
                  (<button onClick={onVideoPress}>
                    <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                  </button>
                  ) :
                  (<button onClick={onVideoPress}>
                    <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                  </button>
                  )}

                {isVideoMuted ?
                  (<button onClick={onMutePress}>
                    <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                  </button>
                  ) :
                  (<button onClick={onMutePress}>
                    <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                  </button>
                  )}
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default VideoCard