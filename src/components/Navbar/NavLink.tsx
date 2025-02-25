import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  
  return (
    <Link
      href={href}
      className={`text-personifyAccent4 font-light hover:text-personifyAccent3 transition-colors
        ${pathname === href ? 'border-b border-personifyAccent3' : ''}
        hover:border-b hover:border-personifyAccent3`}
    >
      {children}
    </Link>
  );
} 