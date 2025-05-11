import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/data/myState";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

function Signup() {
  const context = useData();
  const { loading, setLoading } = context;

  const [form, setForm] = useState({
    name: "",
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
    if (form.name === "" || form.email === "" || form.password === "") {
      return toast.error("All fields are required");
    }

    try{
      const users = await createUserWithEmailAndPassword(auth, form.email, form.password);

      //Storing Data into firebase Database- - - -- - - 
      const user = {
        name: form.name,
        uid: users.user.uid,
        email: users.user.email,
        signedupAt: new Date().toISOString(),
      }
      const userRef = collection(firebaseDB, "users");
      await addDoc(userRef, user);
      setForm({name: "", email: "", password: ""});
      toast.success("Register Successfully!")
    } 
    catch (error) {
      toast.error("Registeration Failed...");
    }
  }

  return (
    <div className=" flex justify-center items-center my-8">
      <form
        className="bg-gray-800 p-8 rounded-xl shadow-md w-96"
        onSubmit={handleSubmit}
      >

        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Register
        </h2>
        <input
          type="name"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 outline-0 bg-gray-400 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 outline-0 bg-gray-400 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 outline-0 bg-gray-400 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-500"
        >
          Register
        </button>
        <p className="mt-4 text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
