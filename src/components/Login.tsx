import { useGoogleLogin } from "@react-oauth/google";
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import UseUsers from "../hooks/UseUsers";
import { Link } from "react-router-dom";
import Loading from "./Loading";

type Prop = {
    handleSwitch: () => void
}

export default function Login({ handleSwitch }: Prop) {
    const { loginWithGoogle, loginByPassword, loading } = UseUsers();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        loginByPassword({ email, password });
    };


    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            });

            const userData = await userInfo.json();
            if (userData.email_verified)
                loginWithGoogle(userData.email);
        },
        onError: () => console.log("Google Login Failed"),
    });

    if (loading) return <Loading />

    return (
        <div>
            <div>
                <h2 className="mt-2 text-center text-3xl font-extrabold ">Login to your account</h2>
            </div>
            <form className="mt-6 space-y-6" onSubmit={handleLogin}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500  dark:text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 dark:text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Login
                    </button>
                </div>
            </form>
            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500 dark:bg-gray-700 dark:text-white">Or continue with</span>
                    </div>
                </div>
                <div className="mt-6 w-full">
                    <button
                        onClick={() => googleLogin()}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <img
                            src="https://developers.google.com/identity/images/g-logo.png"
                            alt="Google logo"
                            className="h-5 w-5 mr-2"
                        />
                        Sign in with Google
                    </button>
                </div>
                <div className='text-center text-gray-500 mt-3 dark:text-white'>
                    <div>
                        Don't have an account? <span onClick={handleSwitch} className='text-blue-700 cursor-pointer font-semibold hover:underline dark:text-blue-400'>Sign up</span>
                    </div>
                    <div className="text-center text-gray-500 mt-3">
                        Send Code via <Link to="/sendEmail" className='text-blue-700 cursor-pointer font-semibold hover:underline'>Email</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}