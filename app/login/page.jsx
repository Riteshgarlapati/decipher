"use client";

import React from "react";
import Login from "@/components/Login";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
const Page = () => {
    const { data: session, status } = useSession();
    if (session) redirect("/");
    return (
        <>
            <Navbar session={session} />
            <Login />;
        </>
    );
};

export default Page;
