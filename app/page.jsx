"use client";

import Login from "@/components/Login";
import ProblemStatements from "@/components/Ps";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();
    return (
        <main className="flex flex-col items-center justify-between min-h-screen ">
            <div className=" spacer layer1">
                {session ? <ProblemStatements /> : <Login />}
            </div>
        </main>
    );
}
