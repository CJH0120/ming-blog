'use client'
import Image from 'next/image'
interface ImagePorps {
  src: string
  alt?: string
  className?: string
}

const ImageProxy = ({ src, alt = '', className }: ImagePorps) => {
  const Loader = () => {
    return src
  }
  return <Image src={src} alt={alt} fill loader={Loader} className={className} objectFit="cover" />
}

export default ImageProxy
