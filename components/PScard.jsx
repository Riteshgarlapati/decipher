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

function ProblemStatement({ Id, statement }) {
    const [count, setCount] = useState(0);
    const [selected, setSelected] = useState(false);
    const TEAM_ID = 1;

    useEffect(() => {
        console.log(Id);
        console.log(1);
        const problemRef = ref(database, `ProblemStatements/1`);
        console.log(2);
        console.log(problemRef);
        onValue(problemRef, (snapshot) => {
            console.log(3);

            const problemData = snapshot.val();
            console.log(problemData);
            if (problemData) {
                setCount(problemData.count);
            }
        });

        return () => {
            console.log(4);
            // off(problemRef);
        };
    }, [Id, statement]);

    const handleSelect = () => {
        console.log(5);
        const problemRef = ref(database, `ProblemStatements/${id}`);
        const transaction = (problem) => {
            if (problem) {
                if (problem.count < 5 && !problem.teamIds?.includes(TEAM_ID)) {
                    problem.count++;
                    problem.teamIds = problem.teamIds || [];
                    problem.teamIds.push(TEAM_ID); // Replace TEAM_ID with the actual team ID
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
        <div>
            <h2>{statement}</h2>
            <p>Selected by {count} teams</p>
            {selected ? (
                <p>Selected</p>
            ) : (
                <button onClick={handleSelect}>Select</button>
            )}
        </div>
    );
}

export default ProblemStatement;
