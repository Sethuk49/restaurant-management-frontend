import React, { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';
import { commonService } from "../../services/api.service";
import Loader from '../../components/Loader';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, startTransition] = useTransition();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        commonService.postService("/auth/login", {
            email: username,
            password: password
        }).then((result) => {
            setIsLoading(false);
            // Store in local storage
            localStorage.setItem('token', result?.data?.token);
            localStorage.setItem('role', result?.data?.data?.role);
            // Store in Redux
            dispatch(setUser({ ...result?.data?.data }));

            startTransition(() => {
                if (result?.data?.data?.role === "admin") {
                    navigate('/');
                } else if (result?.data?.data?.role === "restaurant_owner") {
                    navigate('/restaurant/menu-items');
                } else if (result?.data?.data?.role === "user") {
                    navigate('/home');
                }
            });
        }).catch(err => {
            setIsLoading(false);
            console.error(err);
            // Handle error feedback here
        });
    };

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && (
                <div className="mx-auto h-screen flex items-center justify-center bg-purple-300">
                    <div>
                        <h1 className="text-3xl font-bold">Login</h1>
                        <form onSubmit={handleLogin} className="mt-4">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="border rounded p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border rounded p-2"
                                />
                            </div>
                            <button type="submit" className="bg-purple-400 text-white px-4 py-2 rounded">
                                Login
                            </button>
                        </form>
                        <br />
                        <a className='mt-48 text-black' href='/registration'>Click here to register!</a>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginPage;
