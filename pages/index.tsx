import axios from "axios"
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { Video } from "../types";
import { BASE_URL } from "../utils";

export interface Iprops {
  videos: Video[]
}
export interface IQuery {
  query: {
    topic: string
  }
}

const Home = ({ videos }: Iprops) => {
  console.log(videos);
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {
        videos.length > 0 ?
          (
            videos.map((video: Video) => (
              <VideoCard post={video} key={video._id} />
            ))) : (
            <NoResults text={"No Videos"} />
          )
      }
    </div>
  )
}

export const getServerSideProps = async ({ query: { topic } }: IQuery) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }
  else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: response.data
    }
  }
}

export default Home;