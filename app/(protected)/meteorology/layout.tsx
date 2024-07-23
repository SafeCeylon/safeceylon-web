import DisasterNavbar from '@/components/DisasterNavbar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const DisasterLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="bg-primary h-screen w-full">
      <DisasterNavbar />
      {children}
    </div>
  );
};

export default DisasterLayout;
