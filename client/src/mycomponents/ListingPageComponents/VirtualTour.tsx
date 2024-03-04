

interface VirtualTourProps {
    url: string
}

const VirtualTour = ({url}: VirtualTourProps) => {
  return (
    <div>
       <iframe src={url} className="w-full h-[500px]" allowFullScreen></iframe>
    </div>
  )
}

export default VirtualTour