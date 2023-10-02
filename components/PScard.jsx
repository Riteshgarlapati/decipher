"use client";

// components/ProblemStatement.js

import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import {
    ref,
    // transaction as dbTransaction,
    onValue,
    off,
} from "firebase/database";

function ProblemStatement({ Id, statement, description, teamId }) {
    console.log(teamId);
    const [count, setCount] = useState(0);
    const [selected, setSelected] = useState(false);
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

    useEffect(() => {
        const problemRef = ref(database, `ProblemStatements/${Id}`);

        onValue(problemRef, (snapshot) => {
            const problemData = snapshot.val();

            if (problemData) {
                setCount(problemData.count);
            }
        });

        return () => {
            off(problemRef);
        };
    }, [Id, statement]);

    const handleSelect = () => {
        setConfirmationModalOpen(true); // Open the confirmation modal
    };

    const confirmSelection = () => {
        const problemRef = ref(database, `ProblemStatements/${Id}`);
        const transaction = (problem) => {
            if (problem) {
                if (problem.count < 5 && !problem.teamIds?.includes(teamId)) {
                    problem.count++;
                    problem.teamIds = problem.teamIds || [];
                    problem.teamIds.push(teamId); // Replace teamId with the actual team ID
                }
            }
            return problem;
        };
        dbTransaction(problemRef, transaction)
            .then(() => {
                console.log("Data updated successfully");
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });
    };

    return (
        <div className="relative ">
            <div
                className={` ${
                    count >= 5 ? "inline " : "hidden"
                } text-bred-200 text-xl md:text-2xl font-bold z-10 backdrop-blur-[1px] cursor-not-allowed absolute flex items-center justify-center w-full h-full`}
            >
                <span className="px-4 py-2 border shadow-md rounded-xl bg-void border-bred-200">
                    {" "}
                    Max selections reached
                </span>
            </div>
            <div
                className={
                    "flex flex-col w-5/6 gap-1 p-6 mx-auto shadow-md outline-border bg-none rounded-3xl relative"
                }
            >
                <div
                    className={
                        " flex gap-4 font-bold md:text-xl text-bblue-200 "
                    }
                >
                    <span className=" text-bgold-200">{Id}</span>
                    <span>{statement}</span>
                </div>

                <p className="justify-center text-left md:text-xl text-slate-200">
                    Status: ({count}/5){" "}
                </p>
                <p className="text-xs leading-5 md:text-base">
                    <span className="text-base md:text-xl text-bblue-200">
                        Description:{" "}
                    </span>
                    {description}
                </p>
                {selected ? (
                    <p>Selected</p>
                ) : (
                    <>
                        <button
                            onClick={handleSelect}
                            className="px-4 py-2 mx-auto mt-2 text-xl font-bold duration-300 border rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:hover:text-bblue-200 w-min text-bblue-200 border-bgold-200 hover:text-bgold-200"
                            disabled={count >= 5}
                        >
                            Select
                        </button>
                        {isConfirmationModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-Manga-100 bg-opacity-5 backdrop-blur">
                                <div className="flex flex-col w-1/2 gap-2 p-4 bg-white rounded-lg shadow-lg modal-container glass">
                                    <p className="text-xl text-bblue-200">
                                        Are you sure you want to select the
                                        problem statement{" "}
                                        <span className="text-2xl font-bold text-bgold-200">
                                            {Id}
                                        </span>
                                        ?
                                    </p>
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() =>
                                                setConfirmationModalOpen(false)
                                            }
                                            className="px-4 py-2 my-2 text-base font-bold duration-300 border rounded-lg cursor-pointer text-bred-200 border-bgold-200 hover:text-bgold-200"
                                        >
                                            No
                                        </button>
                                        <button
                                            onClick={confirmSelection}
                                            className="px-4 py-2 my-2 text-base font-bold duration-300 border rounded-lg cursor-pointer text-void border-bgold-200 bg-bblue-200 hover:bg-bblue-100"
                                        >
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default ProblemStatement;
