
const WatchPageSkeleton = () => {
  return (
    <div className='animate-pulse'>
			<div className='bg-gray-500 rounded-md w-40 h-6 mb-4 shimmer'></div>
			<div className='bg-gray-500 rounded-md w-full h-96 mb-4 shimmer'></div>
			<div className='bg-gray-500 rounded-md w-3/5 h-6 mb-2 shimmer'></div>
			<div className='bg-gray-500 rounded-md w-1/2 h-6 mb-4 shimmer'></div>
			<div className='bg-gray-500 rounded-md w-full h-24 shimmer'></div>
		</div>
  )
}

export default WatchPageSkeleton