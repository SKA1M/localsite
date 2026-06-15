import Image from 'next/image'

export default function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={630}
      priority
      style={{ width: '100%', height: 'auto', borderRadius: 10 }}
    />
  )
}
