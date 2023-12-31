import React, { useState } from "react";
import PagePadding from './../../components/PagePadding';
import PageHeading from './../../components/PageHeading';
import Navbar from './../../components/Navbar';
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import emitToast from './../../utils/emitToast';

const SignupPage = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleInputChange = (event, attributeName)=>{
        console.log(event.target.value, attributeName);
        setFormData(prev => ({...prev ,[attributeName]: event.target.value}))
    }

    const handleSignupClick = async ()=>{
        console.log(formData);
        const response = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        console.log(data);
        if(response.status === 203){ // then account exist with given id.
            console.log("account exist with given id TODO: add notification to it");
            emitToast(toast, "An Account is already there with given emailId.")
        } else if(response.status === 200){
            router.push("/auth/login")
        }
    }
    
  return <div className="">
        <Navbar/>
        <PagePadding>
            <PageHeading>SIGN UP</PageHeading>
            <div>
                <ToastContainer/>
            </div>
            <div className="outerBox py-2 flex flex-col justify-center items-center">
                <div className="innerBox w-full lg:w-1/2 flex flex-col items-center space-y-6">
                    <div className="w-full">
                        <div htmlFor="name">Name</div>
                        <input value={formData.name} onChange={(e)=>handleInputChange(e, "name")} type="text" className="py-3 px-5 text-lg w-full border-gray-300 border-2"/>
                    </div>
                    <div className="w-full">
                        <div htmlFor="email">Email Id</div>
                        <input value={formData.email} onChange={(e)=>handleInputChange(e, "email")} type="email" className="py-3 px-5 text-lg w-full border-gray-300 border-2"/>
                    </div>
                    <div className="w-full">
                        <div htmlFor="phone">Phone</div>
                        <input value={formData.phone} onChange={(e)=>handleInputChange(e, "phone")} type="tel" className="py-3 px-5 text-lg w-full border-gray-300 border-2"/>
                    </div>
                    <div className="w-full">
                        <div htmlFor="password">Password</div>
                        <input value={formData.password} onChange={(e)=>handleInputChange(e, "password")} type="password" className="py-3 px-5 text-lg w-full border-gray-300 border-2"/>
                    </div>
                    
                    <div className="flex justify-center py-5">
                        <button onClick={handleSignupClick} className="px-10 text-lg text-white rounded-sm py-3 bg-blue-600">SIGN UP</button>
                    </div>
                 </div>
            </div>
        </PagePadding>
  </div>;
};

export default SignupPage;
