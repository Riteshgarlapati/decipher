// ProblemStatement.js

import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { firestore } from "../firebase";
import { ref, onValue, off, runTransaction } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";

function ProblemStatement({ Id, statement, description, user, onSelect }) {
    const teamId = user.teamId;
    const [count, setCount] = useState(0);

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
        onSelect(Id); // Call the parent's onSelect callback with the selected problem Id
    };

    return (
        <div className="relative z-0 flex justify-center">
            <div
                className={` ${
                    count >= 5 ? "inline " : "hidden"
                } text-bred-200 text-xl md:text-2xl font-bold z-10 backdrop-blur-[1px] cursor-not-allowed absolute  w-5/6 flex items-center justify-center  h-full`}
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

                <button
                    onClick={handleSelect}
                    className="px-4 py-2 mx-auto mt-2 text-xl font-bold duration-300 border rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:hover:text-bblue-200 w-min text-bblue-200 border-bgold-200 hover:text-bgold-200"
                    disabled={count >= 5}
                >
                    Select
                </button>
            </div>
        </div>
    );
}

export default ProblemStatement;
