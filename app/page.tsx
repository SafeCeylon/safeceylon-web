import Image from 'next/image';
import Link from 'next/link';

import LandingSection from '../components/LandingSection';
import images from '../constants/images';

export default function Home() {
  return (
    <div className="bg-[#0D0D0F] ">
      <header className="px-[50px] md:px-[100px] py-[10px] fixed w-screen">
        <div className="flex items-center justify-between">
          <Image src={images.Logo3} alt="Logo1" className="h-[50px] w-auto" />
          <div>
            <Link href={'#'}>Login</Link>
          </div>
        </div>
      </header>
      <LandingSection />
    </div>
  );
}
