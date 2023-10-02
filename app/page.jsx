"use client";

import Login from "@/components/Login";
import ProblemStatements from "@/components/Ps";
import Statements from "@/components/Statements";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();
    return (
        <div className=" spacer layer1">
            {session ? <Statements /> : <Login />}
        </div>
    );
}
