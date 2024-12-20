import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-purple-300">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-black-600">Unauthorized</h1>
                <p className="mt-4">You do not have permission to access this page.</p>
                <Link to="/" className="mt-6 text-blue-500 underline">
                    Go back to the Home Page
                </Link>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
