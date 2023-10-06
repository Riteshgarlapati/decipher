// Statements.js

import React, { useEffect, useState } from "react";
import ProblemStatement from "./PScard";
import { useSession } from "next-auth/react";
import { off, onValue, ref, runTransaction, set } from "firebase/database";
import { database } from "@/firebase";

import problemStatements from "../problemStatements.json";

function Statements() {
    const { data: session } = useSession();
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [selectedProblemId, setSelectedProblemId] = useState(null);
    const [selectedPSFromRealtimeDB, setSelectedPSFromRealtimeDB] =
        useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Real-time database listener to fetch selectedPS
        if (session.user && session.user.teamId) {
            const tId = session.user.teamId;
            const selectedPSRef = ref(database, `Teams/${tId}/S`);

            onValue(selectedPSRef, (snapshot) => {
                const selectedPS = snapshot.val();
                setSelectedPSFromRealtimeDB(selectedPS);
                console.log(selectedPSFromRealtimeDB);
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

    const handleModalClose = () => {
        setConfirmationModalOpen(false);
        setError(null);
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
                        ps.count <= 5 &&
                        !ps.teamIds.includes(session.user.teamId)
                    ) {
                        ps.teamIds.push(session.user.teamId);
                        ps.count++; // Increment count only if it's less than or equal to 5.
                    } else {
                        throw new Error(
                            "The problem might have reached it's limit, choose another problem"
                        );
                    }
                }
                return ps;
            }).then(async () => {
                const teamPSRef = ref(
                    database,
                    `/Teams/${session.user.teamId}/S`
                );
                await set(teamPSRef, problemId);
            });
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
            setError(error);
        }
    };

    return (
        <>
            {selectedPSFromRealtimeDB == "0" ? (
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
                            onSelect={handleSelect}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center w-5/6 h-[calc(100vh-4rem)] mx-auto">
                    <div className="flex flex-col items-center justify-center gap-4 px-8 py-4 mx-4 my-40 glass h-min">
                        <span className="text-2xl text-bblue-200 ">
                            You -{" "}
                            <span className="shimmer">
                                Team {session.user.teamId}
                            </span>
                            , have chosen{" "}
                            <span className="font-bold text-bgold-200 shimmer">
                                {selectedPSFromRealtimeDB}
                            </span>
                        </span>
                        {(() => {
                            const selectedProblem = problemStatements.find(
                                (problem) =>
                                    problem.Id === selectedPSFromRealtimeDB
                            );

                            if (selectedProblem) {
                                return (
                                    <div className="relative flex flex-col w-full gap-1 p-6 mx-auto shadow-md outline-border bg-none rounded-3xl">
                                        <div className="flex gap-4 font-bold md:text-xl text-bblue-200">
                                            <span className="text-bgold-200">
                                                {selectedPSFromRealtimeDB}
                                            </span>
                                            <span>
                                                {selectedProblem.statement}
                                            </span>
                                        </div>
                                        <p className="text-xs leading-5 md:text-base">
                                            <span className="text-base md:text-xl text-bred-200">
                                                Description:{" "}
                                            </span>
                                            {selectedProblem.description}
                                        </p>
                                    </div>
                                );
                            } else {
                                return (
                                    <span className="text-2xl text-bblue-200">
                                        Problem Statement not found.
                                    </span>
                                );
                            }
                        })()}
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
                        {error && (
                            <p className="text-lg font-bold text-bred-200">
                                {error}
                            </p>
                        )}
                        <div className="flex justify-center gap-2">
                            <button
                                onClick={handleModalClose}
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
