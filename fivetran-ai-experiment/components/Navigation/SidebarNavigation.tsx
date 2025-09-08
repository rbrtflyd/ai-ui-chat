import Link from 'next/link';
import { Text } from '@radix-ui/themes';

const navigationItems = [
  {
    label: 'Connections',
    href: '/connections',
  },
  {
    label: 'Transformations',
    href: '/transformations',
  },
  {
    label: 'Overview',
    href: '/overview',
  },
  {
    label: 'Destinations',
    href: '/destinations',
  },
];

function NavigationItem({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="px-4 py-3 text-sm font-semibold hover:bg-white">
      <Text>{label}</Text>
    </Link>
  );
}

export default function SidebarNavigation() {
  return (
    <div className="flex flex-col w-62 h-full bg-surface-light shrink-0 border-r">
      <div className="px-4 py-3 h-30 flex flex-row items-center border-b font-semibold">
        Fivetran
      </div>
      <div className="flex flex-col w-full h-full">
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.label}
            href={item.href}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
}
