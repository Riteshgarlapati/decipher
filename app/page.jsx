"use client";

import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const DynamicStatements = dynamic(() => import("@/components/Statements"), {
    loading: () => (
        <div className="layer1 flex justify-center w-min mx-auto text-6xl items-center justify-center gap-4 px-8 py-4 my-40 glass h-min">
            <h2 className="py-4 text-3xl text-center shimmerb text-bblue-200">
                Loading...
            </h2>
        </div>
    ),
});

const DynamicLogin = dynamic(() => import("@/components/Login"), {
    loading: () => (
        <div className="layer1 flex justify-center w-min mx-auto text-6xl items-center justify-center gap-4 px-8 py-4 my-40 glass h-min">
            <h2 className="py-4 text-3xl text-center shimmerb text-bblue-200">
                Loading...
            </h2>
        </div>
    ),
});
function Home() {
    const { data: session, status } = useSession();
    return (
        <div className=" spacer layer1">
            <Navbar session={session} />
            {session ? (
                <Suspense>
                    <DynamicStatements />
                </Suspense>
            ) : (
                <Suspense>
                    <DynamicLogin />
                </Suspense>
            )}
        </div>
    );
}

export default Home;
