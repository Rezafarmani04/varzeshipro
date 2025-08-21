import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-5xl md:text-5xl font-semibold text-gray-100">404</h1>
      <h1 className="text-2xl md:text-3xl font-semibold mt-6">
        صفحه مورد نظر یافت نشد!
      </h1>
      <Link href={"/"} className="mt-4 text-xl md:text-2xl text-gray-500">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
