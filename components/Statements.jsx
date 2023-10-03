// Statements.js

import React, { useEffect, useState } from "react";
import ProblemStatement from "./PScard";
import { useSession } from "next-auth/react";
import { off, onValue, ref, runTransaction, set } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";
import { database, firestore } from "@/firebase";

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
    const { data: session } = useSession();
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [selectedProblemId, setSelectedProblemId] = useState(null);
    const [selectedPSFromRealtimeDB, setSelectedPSFromRealtimeDB] =
        useState(null);

    useEffect(() => {
        // Real-time database listener to fetch selectedPS
        if (session.user && session.user.teamId) {
            const teamId = session.user.teamId;
            const selectedPSRef = ref(database, `Teams/${teamId}/S`);

            onValue(selectedPSRef, (snapshot) => {
                const selectedPS = snapshot.val();
                setSelectedPSFromRealtimeDB(selectedPS);
            });

            return () => {
                off(selectedPSRef);
            };
        }
    }, [session.user]);

    const handleSelect = (problemId) => {
        setSelectedProblemId(problemId);
        setConfirmationModalOpen(true);
    };

    const confirmSelection = async (problemId) => {
        try {
            console.log(1);
            // Realtime database update
            const psRef = ref(database, `/ProblemStatements/${problemId}`);
            await runTransaction(psRef, (ps) => {
                if (ps) {
                    if (!ps.teamIds) {
                        ps.teamIds = [];
                    }

                    if (
                        ps.count <= 4 &&
                        !ps.teamIds.includes(session.user.teamId)
                    ) {
                        ps.teamIds.push(session.user.teamId);
                        ps.count++; // Increment count only if it's less than or equal to 5.
                    }
                }
                return ps;
            });

            const teamPSRef = ref(database, `/Teams/${session.user.teamId}/S`);
            await set(teamPSRef, problemId);

            // Firestore update
            // const docRef = doc(firestore, "users", session.user.email);
            // await setDoc(docRef, { selectedPS: problemId }, { merge: true });

            // Close the modal and perform any necessary actions
            setConfirmationModalOpen(false);

            // You can also trigger a page reload or any other actions here if needed
            // location.reload();
        } catch (error) {
            // Handle any errors that occur during database updates
            console.error("Error confirming selection:", error);
            // You can display an error message or take appropriate action here
        }
    };

    return (
        <>
            {selectedPSFromRealtimeDB === "0" ? (
                <div className="flex flex-col gap-8 pb-20">
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
                            onSelect={handleSelect}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center w-full h-[calc(100vh-4rem)]">
                    <div className="px-8 py-4 mx-4 my-40 glass h-min">
                        <span className="text-2xl text-bblue-200">
                            You -{" "}
                            <span className="shimmer">
                                Team {session.user.teamId}
                            </span>
                            , have already chosen{" "}
                            <span className="font-bold text-bgold-200 shimmer">
                                {selectedPSFromRealtimeDB}
                            </span>
                        </span>
                    </div>
                </div>
            )}

            {isConfirmationModalOpen && (
                <div className="fixed inset-0 left-0 z-50 flex items-center justify-center h-full bg-fixed bg-Manga-100 bg-opacity-5 backdrop-blur">
                    <div className="flex flex-col w-1/2 gap-2 p-4 bg-white rounded-lg shadow-lg modal-container glass">
                        <p className="text-xl text-bblue-200">
                            Are you sure you want to select the problem
                            statement{" "}
                            <span className="text-2xl font-bold text-bgold-200">
                                {selectedProblemId}
                            </span>
                            ?
                        </p>
                        <div className="flex justify-center gap-2">
                            <button
                                onClick={() => setConfirmationModalOpen(false)}
                                className="px-4 py-2 my-2 text-base font-bold duration-300 border rounded-lg cursor-pointer text-bred-200 border-bgold-200 hover:text-bgold-200"
                            >
                                No
                            </button>
                            <button
                                onClick={() =>
                                    confirmSelection(selectedProblemId)
                                }
                                className="px-4 py-2 my-2 text-base font-bold duration-300 border rounded-lg cursor-pointer text-void border-bgold-200 bg-bblue-200 hover:bg-bblue-100"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Statements;
