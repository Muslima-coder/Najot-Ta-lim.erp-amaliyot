import { Skeleton } from 'antd'

const StackSkeleton = () => {
    return (
        <div className='flex justify-between gap-[10px] flex-wrap'>
            <div className='w-[260px] h-[355px]'>
                <Skeleton.Button className='!w-full !h-full' active />
            </div>
            <div className='w-[260px] h-[355px]'>
                <Skeleton.Button className='!w-full !h-full' active />
            </div>
            <div className='w-[260px] h-[355px]'>
                <Skeleton.Button className='!w-full !h-full' active />
            </div>
            <div className='w-[260px] h-[355px]'>
                <Skeleton.Button className='!w-full !h-full' active />
            </div>
            <div className='w-[260px] h-[355px]'>
                <Skeleton.Button className='!w-full !h-full' active />
            </div>
            <div className='w-[260px] h-[355px]'>
                <Skeleton.Button className='!w-full !h-full' active />
            </div>
        </div>
    )
}

export default StackSkeleton