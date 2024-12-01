// src/pages/NotFoundPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div class="flex items-center justify-center h-screen bg-purple-300">
            <div class="text-center">
                <h1 className="text-5xl font-bold text-black-600">404 - Page Not Found</h1>
                <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
                <Link to="/" className="mt-6 text-blue-500 underline">
                    Go back to the Home Page
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;