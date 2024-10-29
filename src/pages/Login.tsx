import React, { useState } from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import loginImg from '../assets/worker-login.jpg';

interface IUserGoogle {
    email: string;
    picture: string | undefined;
    given_name: string;
    family_name: string;
}

export default function Login() {
    const [user, setUser] = useState<IUserGoogle | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted");
    };
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {

            const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            });

            const userData = await userInfo.json();
            console.log("User Data:", userData);

            setUser(userData);
        },
        onError: () => console.log("Google Login Failed"),
    });


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1200px] w-full grid md:grid-cols-5 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-2xl col-span-2 lg:order-1 order-2 h-[450px]">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login in to your account</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
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
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
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
                    </div>
                </div>
                <div className="hidden md:block bg-indigo-100 rounded-xl shadow-xl order-2 lg:order-1 h-[450px] col-span-3">
                    <div className="h-full flex items-center justify-center">
                        <img src={loginImg} alt="Login illustration" className="w-full object-cover h-full rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}