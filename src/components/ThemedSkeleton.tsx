import React from 'react'
import { Skeleton } from 'antd'
import { SkeletonProps } from 'antd/lib/skeleton'
import './ThemedSkeleton.less'

const ThemedSkeleton: React.FC<SkeletonProps> = (props) => {
  return <Skeleton {...props} className="themed-skeleton" />
}

export default ThemedSkeleton