import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image from Next.js
import { signOut } from "next-auth/react";

const Navbar = ({ session }) => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsSticky(scrollTop > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className="z-20 flex justify-center w-full px-4 py-1 bg-void text-md text-bblue-200">
                <span className="shimmer">Learn. Code. Share.</span>
            </div>
            <div
                className={`${
                    isSticky
                        ? "sticky top-0 h-16 backdrop-blur-3xl bg-[#0f0913] bg-opacity-70 shadow-md navbar-ios"
                        : "bg-void"
                } left-0 h-16 py-2 px-4 flex justify-between items-center w-full transition-all duration-300 z-10 text-2xl `}
                style={{
                    zIndex: 20,
                }}>
                <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center ">
            <Image
              src="/images/LogoCOSC.png" // Replace with your logo image path
              width={51}
              height={45}
              alt="Hf10 Logo"
              style={{ padding: 0, scale: 1.0 }}
            />
            <div className="w-[1px] h-5 bg-[#efedef] mx-2"></div>
            <Image
              src="/images/openSysLogo.png" // Replace with your logo image path
              width={51}
              height={45}
              alt="Hf10 Logo"
              style={{ padding: 0, scale: 1.0 }}
            />
          </Link>
        </div>
                <div className="">
                    {session ? (
                        <button
                            type="button"
                            className="px-4 py-2 my-2 text-base font-bold duration-300 border rounded-lg cursor-pointer text-bblue-200 border-bgold-200 hover:text-bgold-200"
                            onClick={() => signOut()}>
                            Sign out
                        </button>
                    ) : (
                        <Link href={"/"}>
                            <button
                                type="button"
                                className="px-4 py-2 my-2 text-base font-bold duration-300 border rounded-lg cursor-pointer text-bblue-200 border-bgold-200 hover:text-bgold-200">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
