// pages/index.js
import React from "react";
import ProblemStatement from "./PScard";

const TEAM_ID = 1; // Replace with the actual team ID

const problemStatements = [
    {
        Id: "PS1",
        statement: "Problem Statement 1",
    },
    {
        Id: "PS2",
        statement: "Problem Statement 2",
    },
    // Add more problem statements...
];

function Statements() {
    return (
        <div>
            <h1>Problem Statement Selection</h1>
            {problemStatements.map((problem) => (
                <ProblemStatement
                    key={problem.Id}
                    Id={problem.Id}
                    statement={problem.statement}
                />
            ))}
        </div>
    );
}

export default Statements;
