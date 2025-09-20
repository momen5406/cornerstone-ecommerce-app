import Image from "next/image";
import banner1 from "../../../../public/banner1.jpg";
import banner2 from "../../../../public/banner2.jpg";
import banner3 from "../../../../public/banner3.jpg";
import banner4 from "../../../../public/banner4.jpg";
import HomeSlider from "@/components/features/HomeSlider";

export default function Header() {
  return (
    <div className="my-10">
      <div className="grid items-stretch md:grid-cols-4 gap-5">
        <div className="md:col-span-1 col-span-2 flex md:flex-col w-full rounded-lg overflow-hidden">
          <div className="relative group">
            <Image
              className="w-full object-cover md:h-[200px]"
              src={banner1}
              alt="Banner 1"
              height={400}
              width={400}
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-transparent group-hover:bg-black/80 transition-colors duration-300 text-white text-xl font-semibold">
              <span className="scale-0 group-hover:scale-100 transition-transform duration-300 hover:text-accent">
                Women&apos;s Fashion
              </span>
            </div>
          </div>
          <div className="relative group">
            <Image
              className="w-full object-cover md:h-[200px]"
              src={banner2}
              alt="Banner 1"
              height={400}
              width={400}
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-transparent group-hover:bg-black/80 transition-colors duration-300 text-white text-xl font-semibold">
              <span className="scale-0 group-hover:scale-100 transition-transform duration-300 hover:text-accent">
                Men&apos;s Fashion
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-2 rounded-lg overflow-hidden">
          <HomeSlider />
        </div>
        <div className="md:col-span-1 col-span-2 flex md:flex-col rounded-lg overflow-hidden">
          <div className="relative group">
            <Image
              className="w-full object-cover md:h-[200px]"
              src={banner3}
              alt="Banner 1"
              height={400}
              width={400}
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-transparent group-hover:bg-black/80 transition-colors duration-300 text-white text-xl font-semibold">
              <span className="scale-0 group-hover:scale-100 transition-transform duration-300 hover:text-accent">
                Electronics
              </span>
            </div>
          </div>
          <div className="relative group">
            <Image
              className="w-full object-cover md:h-[200px]"
              src={banner4}
              alt="Banner 1"
              height={400}
              width={400}
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-transparent group-hover:bg-black/80 transition-colors duration-300 text-white text-xl font-semibold">
              <span className="scale-0 group-hover:scale-100 transition-transform duration-300 hover:text-accent">
                Home
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
