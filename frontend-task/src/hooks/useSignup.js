import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    name,
    email,
    city,
    password,
    confirm_password,
    role,
  }) => {
    const success = handleInputErrors({
      name,
      email,
      city,
      password,
      confirm_password,
      role,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          city,
          password,
          confirm_password,
          role,
        }),
      });

      const data = await res.json();
      if (data.statusCode == 500) {
        throw new Error("Error Registering new User");
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      localStorage.setItem("webToken", JSON.stringify(data.token));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;

function handleInputErrors({
  name,
  email,
  city,
  password,
  confirm_password,
  role,
}) {
  if (!name || !email || !password || !confirm_password || !city || !role) {
    console.log(name, email, password, confirm_password, city, role);
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirm_password) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
