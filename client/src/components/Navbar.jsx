import { School, User, LogOut, Menu } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-50 dark:border-b-gray-800">
      {/* for Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-4">
        <div className="flex items-center gap-2">
          <School size={30} />
          <h1 className="hidden md:block font-extrabold text-2xl">LMS</h1>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link className="flex" to={"/my-learning"}>
                    <School className="mr-2 h-4 w-4" />
                    <span>My Learning</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="flex" to={"/profile"}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
                {user.role === "instructor" && (
                  <DropdownMenuItem>
                    <Button className=" ">Dashboard</Button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <DarkMode />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button onClick={() => navigate("/login")} size="sm">
                Sign Up
              </Button>
            </div>
            <DarkMode />
          </div>
        )}
      </div>
      {/* for Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <div className="flex items-center gap-2">
          <School size={30} />
          <h1 className=" font-extrabold text-xl">LMS</h1>
        </div>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-400"
          variant="outline"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <School size={24} />
            <span>LMS</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          {user ? (
            <>
              <Button variant="ghost" className="justify-start">
                <School className="mr-2 h-4 w-4" />
                <span>My Learning</span>
              </Button>
              <Button variant="ghost" className="justify-start">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Button>
              <Button variant="ghost" className="justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
              {user.role === "instructor" && (
                <Button className=" ">Dashboard</Button>
              )}
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/login")} variant="outline">
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Sign Up</Button>
            </>
          )}
        </div>
        <SheetFooter>
          <div className="flex justify-between items-center w-full">
            <span className="text-sm text-gray-500">Theme</span>
            <DarkMode />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
