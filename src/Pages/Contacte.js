import React, { useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false); 

  const postContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !msg) {
      toast.error("Please fill in all fields and provide a valid email.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://contact-my-portfolio.vercel.app/Contact",
        { name, email, msg },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
      setName("");
      setEmail("");
      setMsg("");
      toast.success("Sent successfully", { autoClose: 1000 });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-sky-50 pb-[124px]  pt-10">
      <div className="text-center">
        <p className="text-4xl font-bold text-gray-600">Contact Me</p>
      </div><br />
      
      <div className="md:flex justify-center pt-4 md:mr-12 md:space-x-24 md:space-y-0 space-y-10">
        <div className="space-y-6 pt-7">
          <div className="flex items-center justify-center mr-20 space-x-4">
            <i className="bx bx-phone text-blue-500 text-3xl" />
            <p>Call Me<br /><span className="text-xs text-gray-500">+212600000000</span></p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <i className="bx bx-envelope text-blue-500 text-3xl" />
            <p>Email<br /><span className="text-xs text-gray-500">abdellahedaoudi80@gmail.com</span></p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <i className="bx bx-current-location text-blue-500 text-3xl" />
            <p>Location<br /><span className="text-xs mr-14 text-gray-500">Morocco - Laayoune</span></p>
          </div>
        </div>

        <form method="post" className="space-y-4 text-center pt-4 flex-row">
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" required placeholder="Full Name"
            className="shadow-md pb-7 pl-3 pt-1 w-[300px] sm:w-44 md:w-44 bg-blue-50 border border-sky-500 rounded-md" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" required placeholder="Email"
            className="shadow-md md:ml-2 pb-7 pl-3 pt-1 ml-1 w-[300px] sm:w-44 md:w-64 bg-blue-50 border border-sky-500 rounded-md" /><br />
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)} name="msg" required placeholder="Message"
            className="shadow-md pl-3 pt-1 w-[300px] sm:w-[370px] md:w-[440px] bg-blue-50 border border-sky-500 rounded-md"
            cols={1} rows={4} /><br />
          <button
            disabled={loading}
            onClick={postContact}
            className="flex gap-2 bg-blue-400 justify-center font-medium text-white px-5 py-3 rounded-lg items-center text-[14px]"
          >
            {loading ? (
              <>
                Sending Message <i className="fa fa-spinner fa-spin"></i>
              </>
            ) : (
              <>
                Send Message <span><Send /></span>
              </>
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
