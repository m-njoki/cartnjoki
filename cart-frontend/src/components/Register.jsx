import { useState } from "react";
import RegisterUser from "./RegisterUser";
import RegisterAdmin from "./RegisterAdmin";
import { Link } from "react-router-dom";

const Register = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          {isAdmin ? "Admin Registration" : "User Registration"}
        </h2>

        <div className="mb-4 text-center">
          <button
            onClick={() => setIsAdmin(false)}
            className={`px-4 py-2 rounded-l ${
              !isAdmin ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setIsAdmin(true)}
            className={`px-4 py-2 rounded-r ${
              isAdmin ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Admin
          </button>
        </div>

        {isAdmin ? <RegisterAdmin /> : <RegisterUser />}

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
