import { MediaPlayer, MediaProvider } from '@vidstack/react';


interface VideoTourProps {
    url: string
}

const VideoTour = ({url}: VideoTourProps) => {

    console.log(url)
  return (

    
    
<MediaPlayer className='rounded-3xl' autoPlay controls title="VideoTour" src={url}>
  <MediaProvider />


</MediaPlayer>
  )
}

export default VideoTour