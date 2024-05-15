import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import SignUpPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
function App() {
  const { authUser } = useAuthContext();
  return (
    // <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    // <div className="max-w-md w-full space-y-8">
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUpPage />}
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
    // </div>
    // </div>
  );
}

export default App;
