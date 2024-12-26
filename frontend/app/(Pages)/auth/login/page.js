"use client";
import api from "@/app/(Axios)/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { login } from "@/app/(redux)/(slices)/auth.slice";
import Login from "@/app/(Components)/(Auth)/login";
import store from "@/app/(redux)/(store)/store";

export default function LoginPage() {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", data);

      const { token, role, _id: userId } = response.data;
      console.log("response.data: ", response.data);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      dispatch(login({ token, role, userId }));
      console.log("Redux state after login:", store.getState().auth);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful",
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

  return <Login handleSubmit={handleSubmit} data={data} setData={setData} />;
}
