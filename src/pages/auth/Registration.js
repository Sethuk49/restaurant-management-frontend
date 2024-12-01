// src/pages/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';
import { commonService } from "../../services/api.service";
import { useFlashMessage } from '../../components/FlashMessageContext';
import Loader from '../../components/Loader';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { addMessage } = useFlashMessage();

    const navigate = useNavigate();

    const handleRegistration = (e) => {
        setIsLoading(true)
        e.preventDefault();
        commonService.postService("/auth/register", {
            name: name,
            mobile_number: mobileNumber,
            email: username,
            password: password
        }).then((result) => {
            setIsLoading(false)
            addMessage(result?.data?.message, 'success');
            navigate('/login')
        }).catch(err => {
            setIsLoading(false)
            addMessage(err?.response?.data?.message, 'error');
            console.log(err)
        });
    };

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && <div className="mx-auto h-screen flex items-center justify-center bg-purple-300">
                <div>
                    <h1 className="text-3xl font-bold">Registration</h1>
                    <form onSubmit={handleRegistration} className="mt-4">
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Name *"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border rounded p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Email *"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border rounded p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Mobile Number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="border rounded p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="Password *"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border rounded p-2"
                            />
                        </div>
                        <button type="submit" className="bg-purple-400 text-white px-4 py-2 rounded">
                            Register
                        </button>
                    </form>
                    <br />
                    <a className='mt-48 text-black' href='/login'>click to here login!</a>
                </div>
            </div>
            }
        </>
    );
};

export default Registration;
