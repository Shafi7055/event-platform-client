import Link from 'next/link';
import Image from 'next/image';
import { useSession } from '@/lib/auth-client';
import { signOut } from '@/lib/auth-client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import ThemeToggle from '@/app/components/ThemeToggle';

export default function Navbar() {
  const { data: session, isPending } = useSession();

  return (
    <nav className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
        <span className="text-xl font-bold text-gray-800 dark:text-white">Social Events Platform</span>
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/upcoming-events" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Upcoming Events</Link>
        <ThemeToggle />
        {isPending ? (
          <span className="text-sm text-gray-500">Loading...</span>
        ) : session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  {session.user.image ? (
                    <AvatarImage src={session.user.image} alt={session.user.name} />
                  ) : (
                    <AvatarFallback>{session.user.name?.[0] ?? 'U'}</AvatarFallback>
                  )}
                </Avatar>
                <span className="hidden md:inline-block text-gray-800 dark:text-gray-200">{session.user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login" className="btn-primary">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
