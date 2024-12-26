"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import CapsuleEditModal from "./capsuleEditModal";
import {
  deleteCapsule,
  editCapsule,
} from "@/app/(redux)/(slices)/capsules.slice";
import Swal from "sweetalert2";
import { format, parseISO, differenceInMilliseconds, isPast } from "date-fns";
import { useRouter } from "next/navigation";

export default function CapsuleDetails() {
  const dispatch = useDispatch();
  const { capsule, loading, error } = useSelector((state) => state.capsules);
  const [isOwner, setIsOwner] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isReleased, setIsReleased] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    _id: capsule?._id || "",
    title: capsule?.title || "",
    content: capsule?.content || "",
    release_date: capsule?.release_date
      ? format(parseISO(capsule.release_date), "yyyy-MM-dd'T'HH:mm")
      : "",
  });

  useEffect(() => {
    if (capsule) {
      setFormData({
        _id: capsule._id,
        title: capsule.title,
        content: capsule.content,
        release_date: capsule.release_date
          ? format(parseISO(capsule.release_date), "yyyy-MM-dd'T'HH:mm")
          : "",
      });
    }
  }, [capsule]);

  useEffect(() => {
    if (!capsule?.release_date) return;
  
    const releaseDate = parseISO(capsule.release_date);
  
    const checkReleaseStatus = () => {
      const now = new Date();
      const diff = differenceInMilliseconds(releaseDate, now);
  
      if (isPast(releaseDate)) {
        setIsReleased(true);
        setTimeRemaining(null);
      } else {
        setTimeRemaining(diff);
        setIsReleased(false);
      }
    };
  
    checkReleaseStatus();
    const timer = setInterval(checkReleaseStatus, 1000);
  
    return () => clearInterval(timer);
  }, [capsule]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const extractedUserId = decoded?.userId;
        if (extractedUserId === capsule?.userId) {
          setIsOwner(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [capsule]);

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = async () => {
    try {
      await dispatch(deleteCapsule(capsule._id)).unwrap();
      router.push("/");
    } catch (err) {
      console.error("Failed to delete capsule:", err);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        release_date: formData.release_date,
      };

      const updatedCapsule = await dispatch(
        editCapsule(updatedFormData)
      ).unwrap();
      setIsModalOpen(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Time Capsule updated successfully",
        showConfirmButton: false,
        timer: 1000,
      });

      // Re-initialize timer and status
      setFormData({
        ...updatedCapsule,
        release_date: updatedCapsule.release_date
          ? format(parseISO(updatedCapsule.release_date), "yyyy-MM-dd'T'HH:mm")
          : "",
      });

      const releaseDate = parseISO(updatedCapsule.release_date);
      if (isPast(releaseDate)) {
        setIsReleased(true);
        setTimeRemaining(null);
      } else {
        setIsReleased(false);
        setTimeRemaining(differenceInMilliseconds(releaseDate, new Date()));
      }
    } catch (err) {
      console.error("Failed to update capsule:", err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to update time capsule",
        text: err.message || "Please try again later.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="d-flex flex-column align-items-center min-vh-100 bg-light py-5">
      <h1 className="fw-bold text-primary mb-4">Time Capsule Details</h1>

      <div className="card shadow-lg w-75">
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Fetching capsule details...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center" role="alert">
              ⚠️{" "}
              {typeof error === "string"
                ? error
                : "An unexpected error occurred."}
            </div>
          ) : (
            <div>
              <h2 className="card-title mb-3 text-dark fw-bold">
                {capsule?.title || "Untitled Capsule"}
              </h2>

              <p className="card-text text-secondary mb-4">
                <strong>Release Date:</strong>{" "}
                {capsule?.release_date
                  ? format(
                      parseISO(capsule.release_date),
                      "yyyy-MM-dd hh:mm:ss a"
                    )
                  : "Not set"}
              </p>
              <p className="card-text text-secondary mb-3">
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    isReleased ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {isReleased ? "Released" : "Pending"}
                </span>
              </p>

              {isReleased ? (
                <>
                  <p className="card-text text-secondary mb-4">
                    <strong>Content:</strong>{" "}
                    {capsule?.content || "No content available."}
                  </p>

                  {capsule?.link && (
                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p>
                          <strong>Link:</strong>{" "}
                          <a
                            href={capsule.link}
                            className="text-primary text-decoration-underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {capsule.link}
                          </a>
                        </p>
                        {isOwner && (
                          <div className="d-flex justify-content-end gap-2">
                            <button
                              onClick={handleEditClick}
                              className="btn btn-sm btn-warning"
                            >
                              Edit
                            </button>
                            <button
                              onClick={handleDeleteClick}
                              className="btn btn-sm btn-danger"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <button
                          onClick={() =>
                            navigator.clipboard
                              .writeText(
                                `http:localhost:3000/capsule/${capsule.link}`
                              )
                              .then(() => {
                                Swal.fire({
                                  position: "center",
                                  icon: "success",
                                  title: "Copied to clipboard",
                                  showConfirmButton: false,
                                  timer: 1000,
                                });
                              })
                          }
                          className="btn btn-sm btn-secondary d-flex align-items-center"
                        >
                          <i className="bi bi-clipboard"></i> Copy to Clipboard
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <p className="text-muted">Release date not reached yet.</p>
                  <div className="text-primary fs-4">
                    Countdown: {timeRemaining ? formatTime(timeRemaining) : ""}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Edit Capsule Modal */}
      <CapsuleEditModal
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        handleModalClose={handleModalClose}
        formData={formData}
        isModalOpen={isModalOpen}
      />
    </div>
  );
}
