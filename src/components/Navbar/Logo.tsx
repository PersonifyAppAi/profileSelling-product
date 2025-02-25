import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex flex-col">
		<span className="text-3xl font-bold text-personifyAccent3 -mt-0.5">
			Personify
		</span>
		<span className="text-base font-bold text-personifyAccent6 -mt-2.5">
			Profiles
		</span>
	</Link>
  );
} 