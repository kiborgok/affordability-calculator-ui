import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative hidden md:flex items-center justify-center h-[600px]">
      <Image
        src="/new-banner-a005d667a5bf64c4c3e4b304b5630c2d.svg"
        alt="Banner"
        height={600}
        width={650}
        className="object-cover rounded-xl shadow-lg"
        priority
      />
    </div>
  );
}