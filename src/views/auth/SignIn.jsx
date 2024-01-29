import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import React, { useEffect, useState } from 'react';
import Login from "api/auth/login";
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword} from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useAuth } from "provider/AuthProvider";
import GoogleLogin from "api/auth/googleLogin";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const { user, setUser } = useAuth();

  // useEffect(() => {
  //   const handleRedirectResult = async () => {
  //     try {
  //       const result = await getRedirectResult(auth);
  //       // Handle the authentication result
  //       console.log(result.user);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  //   handleRedirectResult();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email === '' || password === ''){
      return;
    }

    const data = {
      email: email,
      password: password
    }

    try {
      signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const response = await Login(data);
        if (response.ok) {
          // const userData = await response.json();
          // console.log(userData);
          // setUser(userData);
          navigate('/admin');
        } else if (response.status === 400) {
          alert("Invalid credentials");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    } catch (error) {
      // Handle authentication errors
      console.error('Sign-in error:', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider)
        .then(async (data)=>{
          const res = await GoogleLogin(data.user);
          if(res.ok){
            navigate('/admin');
          } else{
            alert("Something went wrong");
          }
        })
    } catch (error) {
      // Handle errors during sign-in
      console.error(error.message);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <button onClick={handleGoogleLogin} className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </button>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            onChange={handleEmailChange}
            placeholder="mail@simmmple.com"
            id="email"
            type="text"
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            onChange={handlePasswordChange}
            placeholder="Min. 8 characters"
            id="password"
            type="password"
          />
          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div>
          <button type="submit "className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href=" "
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}
