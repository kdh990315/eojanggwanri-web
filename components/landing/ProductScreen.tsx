import Image from "next/image";

type ProductScreenProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ProductScreen({
  src,
  alt,
  className = "",
}: ProductScreenProps) {
  return (
    <div
      className={`mx-auto w-[min(100%,330px)] rounded-[2.25rem] border-4 border-slate-200 bg-white lg:border-[5px] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={853}
        height={1844}
        sizes="(min-width: 1024px) 330px, min(100vw - 40px, 330px)"
        className="h-auto w-full rounded-[1.9rem]"
      />
    </div>
  );
}
