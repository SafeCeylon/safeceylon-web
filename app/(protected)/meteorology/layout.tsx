import { RoleGate } from '@/components/auth/role-gate';
import MeteorologyNavbar from '@/components/MeteorologyNavbar';
import { UserRole } from '@prisma/client';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const DisasterLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <RoleGate
      allowedRole={[UserRole.METEOROLOGY_ADMIN, UserRole.METEOROLOGY_OFFICER]}
    >
      <div className="bg-primary h-screen w-full">
        <MeteorologyNavbar />
        {children}
      </div>
    </RoleGate>
  );
};

export default DisasterLayout;
