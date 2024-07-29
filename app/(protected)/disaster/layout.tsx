import { RoleGate } from '@/components/auth/role-gate';
import DisasterNavbar from '@/components/DisasterNavbar';
import { UserRole } from '@prisma/client';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const DisasterLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <RoleGate
      allowedRole={[UserRole.DISASTER_ADMIN, UserRole.DISASTER_OFFICER]}
    >
      <div className="bg-primary h-screen w-full">
        <DisasterNavbar />
        {children}
      </div>
    </RoleGate>
  );
};

export default DisasterLayout;
