import { RoleGate } from '@/components/auth/role-gate';
import UserNavbar from '@/components/UserNavbar';
import { UserRole } from '@prisma/client';
import { User } from 'lucide-react';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const DisasterLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <RoleGate allowedRole={[UserRole.USER]}>
      <div className="bg-primary h-screen w-full">
        <UserNavbar />
        {children}
      </div>
    </RoleGate>
  );
};

export default DisasterLayout;
