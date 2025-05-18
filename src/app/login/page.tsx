"use client"
import { useState, useEffect } from "react";
import { login, signup } from "./actions";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const searchParams = useSearchParams();
  const method = searchParams.get("type") ?? "login";

  // Reset UI state when method changes
  useEffect(() => {
    setLoading(false);
    setLoginError("");
    setSuccessMessage("");
    setFormData({
      email: "",
      password: "",
      confirmPassword: ""
    });
  }, [method]);

  const handleLogin = async (formData: FormData) => {
    // setLoading(true);
    setLoginError(null);
    setSuccessMessage(null);
    
    // Create a data object to save form values
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string
    };
    
    // Save the form data state to persist values
    setFormData(data);
    
    if (method == "login") {
      const response = await login(formData);
      if (response?.error) {
        setLoginError(response.error);
      }
    } else {
      const response = await signup(formData);
      if (response?.error) {
        setLoginError(response.error);
      }
      if (response?.success) {
        setSuccessMessage(response.success);
        // Clear form on success
        setFormData({
          email: "",
          password: "",
          confirmPassword: ""
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <form className="flex flex-col justify-center w-lg" action={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input 
            className="mb-4 border-[1.5px] rounded-sm border-neutral-600 p-[4px] bg-neutral-50" 
            placeholder="Email"
            type="email"
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input 
            className="mb-4 border-[1.5px] rounded-sm border-neutral-600 p-[4px] bg-neutral-50" 
            placeholder="Password"
            type="password"
            id="password" 
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {method === "signup" && (
            <>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input 
                className="mb-1 border-[1.5px] rounded-sm border-neutral-600 p-[4px] bg-neutral-50" 
                placeholder="Confirm Password"
                type="password"
                id="confirmPassword" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={method === "signup"}
              />
            </>
          )}
          
          {method === "login" && 
            <Link href={"/login/reset-confirmation"} className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">
              Forgot Password
            </Link>
          }
          
          {loginError && (
            <span className="mt-4 text-sm text-red-400 font-semibold">
              {loginError}
            </span>
          )}
          
          {successMessage && (
            <span className="mt-4 text-sm text-green-600 font-semibold">
              {successMessage}
            </span>
          )}

          {method === "signup" ? (
            <div className="flex flex-col mt-4">
              <button   
                disabled={loading}
                className="p-[4px] mb-2 rounded-sm bg-green-600 hover:bg-green-800 text-white w-[200px] cursor-pointer"
              >{loading ? "Signing Up...": "Sign Up"}</button>
              <span>
                Already a user?
                <Link href={"/login?type=login"} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                  {" "}Log in
                </Link>
              </span>
            </div>
          ) : (
            <div className="flex flex-col mt-4">
              <button 
                disabled={loading}
                className="p-[4px] mb-2 rounded-sm bg-green-600 hover:bg-green-800 text-white w-[200px] cursor-pointer"
              >{loading ? "Logging in...": "Login"}</button>
              <span>
                Not a user yet? 
                <Link href={"/login?type=signup"} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                  {" "}Sign up
                </Link>
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}