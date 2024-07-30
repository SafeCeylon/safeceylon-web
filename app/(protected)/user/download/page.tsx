'use client';
import Image from 'next/image';

import UserApp from '@/public/assets/userApp.svg';
import UserLogin from '@/public/assets/userLogin.svg';
import GooglePlay from '@/public/assets/icons/google_play.png';
import AppStore from '@/public/assets/icons/app_store.png';

export default function Admin() {
  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20 mt-5">
      <div className="flex justify-center">
        <Image src={UserLogin} alt="mobile app" className="h-full" />
        <div className="w-2/3 h-full flex flex-col gap-14 text-center items-center">
          <h1 className="text-6xl font-semibold text-white">
            Download
            <br />
            <span className="text-4xl">Our Mobile App</span>
          </h1>
          <p className="text-lg text-gray-200">
            The user app is a mobile application that allows users to access the
            platform from their mobile devices. The app is available on both
            Android and iOS devices.
          </p>
          <div className="flex gap-5">
            <a
              href="https://play.google.com/store/apps/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={GooglePlay}
                alt="Google Play"
                className="h-12 w-auto"
              />
            </a>
            <a
              href="https://apps.apple.com/us/app/"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={AppStore} alt="App Store" className="h-12 w-auto" />
            </a>
          </div>
        </div>
        <Image src={UserApp} alt="mobile app" className="h-full" />
      </div>
    </div>
  );
}
