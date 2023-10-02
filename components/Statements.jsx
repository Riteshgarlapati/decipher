"use client";
// pages/index.js
import React from "react";
import ProblemStatement from "./PScard";
import { useSession } from "next-auth/react";

const problemStatements = [
    {
        Id: "PS1",
        statement: "Healthcare Practice Management System.",
        description:
            "Create a mobile app or web app that facilitates user registration and login, enabling users to access and manage their profiles. It offers features such as appointment scheduling, secure file uploads and viewing, comprehensive treatment planning, cost estimation, and seamless billing generation for efficient healthcare practice management ",
    },
    {
        Id: "PS2",
        statement: "Hostel Management System",
        description:
            "Create a mobile app or web app that facilitates user registration and login, enabling users to access and manage their profiles. It offers features such as appointment scheduling, secure file uploads and viewing, comprehensive treatment planning, cost estimation, and seamless billing generation for efficient healthcare practice management ",
    },
    {
        Id: "PS3",
        statement: "Hostel Management System",
        description:
            "Create a mobile app or web app that facilitates user registration and login, enabling users to access and manage their profiles. It offers features such as appointment scheduling, secure file uploads and viewing, comprehensive treatment planning, cost estimation, and seamless billing generation for efficient healthcare practice management ",
    },
    {
        Id: "PS4",
        statement: "Hostel Management System",
        description:
            "Create a mobile app or web app that facilitates user registration and login, enabling users to access and manage their profiles. It offers features such as appointment scheduling, secure file uploads and viewing, comprehensive treatment planning, cost estimation, and seamless billing generation for efficient healthcare practice management ",
    },
    {
        Id: "PS5",
        statement: "Hostel Management System",
        description:
            "Create a mobile app or web app that facilitates user registration and login, enabling users to access and manage their profiles. It offers features such as appointment scheduling, secure file uploads and viewing, comprehensive treatment planning, cost estimation, and seamless billing generation for efficient healthcare practice management ",
    },
    // Add more problem statements...
];

function Statements() {
    const { data: session, status } = useSession();

    return (
        <>
            {session.user.selectedPS == "0" ? (
                <div className="flex flex-col min-h-screen gap-8 pb-20">
                    <h1 className="mx-auto mt-8 text-xl md:text-3xl shimmerb">
                        Problem Statement Selection
                    </h1>
                    {problemStatements.map((problem) => (
                        <ProblemStatement
                            key={problem.Id}
                            Id={problem.Id}
                            description={problem.description}
                            statement={problem.statement}
                            user={session.user}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center w-full h-full">
                    <div className="px-8 py-4 my-40 glass h-min">
                        <span className="text-2xl text-bblue-200">
                            You -{" "}
                            <span className=" shimmer">
                                Team {session.user.teamId}
                            </span>
                            , have already chosen{" "}
                            <span className="font-bold text-bgold-200 shimmer">
                                {" "}
                                {session.user.selectedPS}
                            </span>
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}

export default Statements;
