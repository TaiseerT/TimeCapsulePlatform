"use client";
import Navbar from "../../../(Components)/Navbar";
import Footer from "../../../(Components)/Footer";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSingleCapsule,
  fetchCapsuleById,
  fetchCapsuleByLink,
} from "@/app/(redux)/(slices)/capsules.slice";
import CapsuleDetails from "@/app/(Components)/(Capsule)/capsuleDetails";

export default function CapsuleDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { capsule, error, loading } = useSelector((state) => state.capsules);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!id) return;

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    if (isObjectId) {
      dispatch(fetchCapsuleById(id));
    } else {
      dispatch(fetchCapsuleByLink(id));
    }

    return () => {
      dispatch(clearSingleCapsule());
    };
  }, [dispatch, id]);

  return (
    <>
      <Navbar />
      <div className="container py-5">
        {isLoggedIn && (loading || !capsule) ? (
          <div className="row g-4">Loading...</div>
        ) : error ? (
          <div className="text-center text-danger py-5">
            <h4>⚠️ {error}</h4>
          </div>
        ) : capsule ? (
          <>
            {/* Capsule Details */}
            <CapsuleDetails capsule={capsule} error={error} loading={loading} />
          </>
        ) : (
          <div className="text-center py-5">
            <p>Capsule not found.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
