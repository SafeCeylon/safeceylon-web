import Image from 'next/image';
import images from '@/constants/images';
import Link from 'next/link';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-primary">
      <Link href="/">
        <Image
          src={images.Logo4}
          alt="Logo1"
          className="h-[50px] w-auto mt-[-80px] mb-[50px]"
        />
      </Link>

      {children}
    </div>
  );
};

export default AuthLayout;
