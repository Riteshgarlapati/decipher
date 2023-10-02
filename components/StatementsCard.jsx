"use client";
import React, { useState } from "react";

const Card = (p) => {
    const [statusCount, setStatusCount] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const incrementStatusCount = () => {
        setStatusCount(statusCount + 1);
    };
    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };
    const isButtonDisabled = statusCount >= 5;

    const strikeThroughStyle = {
        textDecoration: statusCount >= 5 ? "line-through" : "none",
    };

    return (
        <div className="flex flex-col items-center justify-center gap-2 min-h bg-slate-900 md:py-10">
            <div className="w-5/6 p-8 border shadow-md outline-border bg-none rounded-3xl">
                <h1
                    className="justify-center mb-4 text-2xl text-3xl font-bold text-left text-blue-300"
                    style={strikeThroughStyle}
                >
                    {p.ptitle}
                </h1>
                <h2 className="justify-center mb-4 text-2xl text-left text-slate-200">
                    Status: ({statusCount}/5)
                </h2>
                <h2 className="justify-center mb-4 text-xl text-2xl text-left text-gray-200">
                    {p.descTitle}
                </h2>
                <h3 className="justify-center mb-4 text-xl text-2xl text-left text-slate-200">
                    {p.content}
                </h3>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className={`bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600 ${
                            isButtonDisabled ? "cursor-not-allowed" : ""
                        }`}
                        onClick={() => {
                            incrementStatusCount();
                            openPopup();
                        }}
                        disabled={isButtonDisabled}
                    >
                        Select
                    </button>
                </div>
            </div>
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="p-4 rounded-lg shadow-lg text-void bg-Manga-100">
                        <h2 className="mb-2 text-2xl font-semibold ">
                            Confirmation
                        </h2>
                        <p className="text-black">
                            Successfully selected the {p.ptitle}
                        </p>
                        <button
                            className="flex justify-center px-4 py-2 mt-4 text-white bg-blue-400 rounded hover:bg-blue-600"
                            onClick={closePopup}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
