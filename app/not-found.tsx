import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 pt-36 pb-20 text-center">
      <p className="text-sm text-[#8d8d8d]">404</p>
      <h1 className="title-gradient mt-3 text-[40px]">没有这条片子</h1>
      <p className="mt-3 text-[#b5b5b5]">地址可能写错了，片库里还能接着看。</p>
      <Link href="/library" className="explore-btn mt-6">
        回到片库
      </Link>
    </div>
  );
}
