import React, { useState, useEffect } from "react";

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center">
                <p>&copy; 2023 Your Name. All rights reserved.</p>
                <div className="flex justify-center mt-4 space-x-4">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </a>
                <a href="mailto:youremail@example.com">Email</a>
                </div>
            </div>
        </footer>
    );
};