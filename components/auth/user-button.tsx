'use client';
import { ExitIcon, GearIcon, PersonIcon } from '@radix-ui/react-icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { useCurrentUser } from '@/hooks/use-current-user';
import { LogoutButton } from './logout-button';
import { SettingsButton } from '../settings-button';

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-sky-500">
            <PersonIcon className="text-white w-5 h-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={5}
        className="w-40 bg-white px-4 py-2 rounded-md"
        align="end"
      >
        <SettingsButton>
          <DropdownMenuItem className="flex items-center text-black text-[15px] my-2">
            <GearIcon className="w-5 h-5 mr-2" />
            Settings
          </DropdownMenuItem>
        </SettingsButton>
        <LogoutButton>
          <DropdownMenuItem className="flex items-center text-black text-[15px] mb-2">
            <ExitIcon className="w-5 h-5 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
