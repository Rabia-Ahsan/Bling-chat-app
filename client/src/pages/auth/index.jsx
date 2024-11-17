import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
// import {Tabs,TabsList,TabsTrigger} from "@radix-ui/react-tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
// import { toast } from "sooner";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client.js";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants.js";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
    const navigate = useNavigate();
    const {setUserInfo} = useAppStore()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateLogin = () =>{
        if(!email.length){
            toast.error("Email is required");
            return false;
        }
        if(!password.length){
            toast.error("Password is Required.");
            return false;
        }
        return true;
    };

    const validateSignup = () =>{
        if(!email.length){
            toast.error("Email is required");
            return false;
        }
        if(!password.length){
            toast.error("Password is Required.");
            return false;
        }
        if(password !== confirmPassword){
            toast.error("Password and Confirm Password should be same.");
            return false;
        }
        return true;
    };

    const handlelogin = async () => {
        if(validateLogin()){
            try{
                const response = await apiClient.post(LOGIN_ROUTE,{email, password},{withCredentials:true});
            console.log({response});
            if(response.data.user.id){
                setUserInfo(response.data.user);
                if(response.data.user.profileSetup) navigate("/chat");
                else navigate("/profile");
            }
            }catch (error) {
                toast.error("Login failed. Please try again.");
                console.error(error);
            }
        }
    };

    const handleSignup = async () =>{
        if(validateSignup()){
            const response = await apiClient.post(SIGNUP_ROUTE,{email, password},{withCredentials:true});
            console.log({response});
            if(response.status === 201){
                setUserInfo(response.data.user);
                navigate("/profile");
            }
            console.log({response});
        }
    };

    return <div className="h-[100vh] w-[100vw] flex items-center justify-center">
        <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-20">
            <div className="flex flex-col gap-10 items-center justify-center">
                <div className="flex items-center justify-center flex-col">
                    <div className="flex items-center justify-center">
                        <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
                        <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
                    </div>
                    <p className="font-medium text-center">
                        Fill in the details to get started with the Bling!
                    </p>
                </div>
                <div className="flex items-center justify-center w-full">
                    <Tabs className="w-3/4" defaultValue="login">
                        <TabsList className="flex flex-row bg-transparent rounded-none w-full">
                            {/* <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Signup</TabsTrigger> */}
                        <TabsTrigger 
                        value="login" 
                        className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 ">Login</TabsTrigger>
                        <TabsTrigger 
                        value="signup"
                        className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 ">Signup</TabsTrigger>
                        </TabsList>
                        <TabsContent className="flex flex-col gap-5 mt-10 w-full" value="login">
                            <Input
                            placeholder="Email"
                            type="email"
                            className="rounded-full p-6"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                            placeholder="Password"
                            type="password"
                            className="rounded-full p-6"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button className="rounded-full p-6" onClick={handlelogin}>Login</Button>
                        </TabsContent>
                        <TabsContent className="flex flex-col gap-5 wl-full" value="signup">
                        <Input
                            placeholder="Email"
                            type="email"
                            className="rounded-full p-6"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                            placeholder="Password"
                            type="password"
                            className="rounded-full p-6"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <Input
                            placeholder="Confirm Password"
                            type="password"
                            className="rounded-full p-6"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Button className="rounded-full p-6" onClick={handleSignup}>Signup</Button>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    </div>;
};

export default Auth;
