import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { useData } from "../../context/data/myState";
import Loader from "../../components/loader/Loader";

function Login() {
  const navigate = useNavigate();
  const context = useData();
  const { loading, setLoading } = context;
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (form.email === "") {
      return toast.warning("Please enter your email...");
    } else if (form.password === "") {
      return toast.warning("Please enter your password...");
    }

    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      localStorage.setItem("user", JSON.stringify(result));
      toast.success("Login Successfully...!");
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast.error("Invalid Email or Password!");
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className=" flex justify-center items-center my-8">
        <form
          className="bg-gray-800 p-8 rounded-xl shadow-md w-96"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Login
          </h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 border bg-gray-400 outline-0 border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 border bg-gray-400 outline-0 border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 font-semibold text-black py-2 rounded hover:bg-yellow-500"
          >
            Register
          </button>
          <p className="mt-4 text-center text-white">
            Don't have an account?{" "}
            <Link to="/signup" className="text-yellow-400 outline-0-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
