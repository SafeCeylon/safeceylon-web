import { NavBar } from '@/app/(protected)/_components/navbar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center ">
      {/* <NavBar /> */}
      {children}
    </div>
  );
};

export default ProtectedLayout;
