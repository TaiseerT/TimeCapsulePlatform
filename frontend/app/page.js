"use client";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "./(Components)/(Homepage)/heroSection";
import Footer from "./(Components)/Footer";
import Navbar from "./(Components)/Navbar";
import { useEffect } from "react";
import {
  clearCapsules,
  fetchCapsules,
} from "./(redux)/(slices)/capsules.slice";
import Capsules from "./(Components)/(Homepage)/capsulesSection";

export default function Home() {
  const dispatch = useDispatch();
  const { capsules, loading, error } = useSelector((state) => state.capsules);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    dispatch(fetchCapsules());
    return () => {
      dispatch(clearCapsules());
    };
  }, [dispatch]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container py-5 flex-grow-1">
        <div className="container-fluid p-0">
          <HeroSection />
          <Capsules
            capsules={capsules}
            loading={loading}
            error={error}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
