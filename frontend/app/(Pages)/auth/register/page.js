"use client";
import Register from "@/app/(Components)/(Auth)/register";
import { signup } from "@/app/(redux)/(slices)/auth.slice";
import api from "@/app/(Axios)/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", data);
      const token = response.data.token;
      const role = response.data.role;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      dispatch(signup({ token, role }));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account Created Successfully",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        navigate.push("/");
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response?.data?.message || "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return <Register data={data} setData={setData} handleSubmit={handleSubmit} />;
}
