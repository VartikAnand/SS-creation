import React from "react";
import { useNavigate } from "react-router-dom";
import { GrGoogle } from "react-icons/gr";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { client } from "../utils/client";
import { app } from "../utils/auth";
import { Logo, ssbgvideo } from "../Assets";

const Login = () => {
    const navigate = useNavigate();
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {


            firebaseAuth.onAuthStateChanged((userCred) => {
                // console.log(userCred)
                //user info in the localbrowser storage
                localStorage.setItem('user', JSON.stringify(userCred))

                const { displayName, photoURL, uid } = userCred;
                //savinf into local storage

                const doc = {
                    _id: uid,
                    _type: 'user',
                    userName: displayName,
                    image: photoURL,

                };
                client.createIfNotExists(doc).then(() => {
                    navigate('/*', { replace: true });
                });
            });



        });
    };

    // login contianer
    return (

        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                {/* login screen video */}
                <video
                    src={ssbgvideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover "
                />
            </div>

            {/* overlay for the video */}
            <div className="absolute flex-col flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay">
                {/* login content */}

                {/* logo */}
                <div

                    className="flex pb-5 gap-2">
                    <img
                        src={Logo}
                        alt=""
                        className=" h-32 pt-3"

                    />
                    {/* <img src={Logo} alt=""
                        className="h-16"
                    /> */}

                </div>

                {/* login Button */}
                <div
                    onClick={loginWithGoogle}
                    className=" cursor-pointer bg-white rounded-lg p-2 gap-2 shadow-2xl flex justify-center items-center text-xl text-secColor">
                    <GrGoogle className=" text-primary " />
                    SignIn With Google
                </div>
            </div>
        </div>
    )


};

export default Login;