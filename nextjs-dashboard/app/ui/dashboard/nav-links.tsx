'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import clsx from 'clsx';

const baseLinks = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Map', href: '/dashboard/Map', icon: UserGroupIcon },
  { name: 'My spots', href: '/dashboard/user', icon: MapPinIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
];

const managerLink = {
  name: 'Manager',
  href: '/dashboard/manager',
  icon: Cog6ToothIcon,
};

export default function NavLinks({ userRole }: { userRole?: string | null }) {
  const pathname = usePathname();
  const links =
    userRole === 'manager' ? [...baseLinks, managerLink] : baseLinks;

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}