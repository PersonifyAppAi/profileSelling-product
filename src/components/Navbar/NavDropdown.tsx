import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface DropdownItem {
  name: string;
  href: string;
}

interface NavDropdownProps {
  name: string;
  items: DropdownItem[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NavDropdown({ name, items, isOpen, onOpenChange }: NavDropdownProps) {
  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger className="flex items-center text-personifyAccent4 font-light hover:text-personifyAccent3 outline-none">
        {name}
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item) => (
          <DropdownMenuItem key={item.name}>
            <Link
              href={item.href}
              className="w-full text-personifyAccent4 font-light hover:text-personifyAccent3"
            >
              {item.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 