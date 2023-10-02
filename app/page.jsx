"use client";

import Login from "@/components/Login";
import Navbar from "@/components/Navbar";

import Statements from "@/components/Statements";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();
    return (
        <div className=" spacer layer1">
            <Navbar session={session} />
            {session ? <Statements /> : <Login />}
        </div>
    );
}
