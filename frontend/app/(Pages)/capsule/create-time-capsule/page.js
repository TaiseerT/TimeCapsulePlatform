"use client";

import { createCapsule } from "@/app/(redux)/(slices)/capsules.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { formatISO } from "date-fns";
import Swal from "sweetalert2";
import Navbar from "@/app/(Components)/Navbar";
import Footer from "@/app/(Components)/Footer";

export default function CreateCapsulePage() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    content: "",
    release_date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...data,
        release_date: formatISO(new Date(data.release_date), {
          representation: "complete",
        }),
      };

      await dispatch(createCapsule(formattedData)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Time capsule created successfully!",
        timer: 1000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      setData({
        title: "",
        content: "",
        release_date: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error || "Failed to create time capsule",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="col-lg-9 mx-auto">
          <div className="card shadow-sm border-0 rounded">
            <div className="card-body p-5">
              <h2 className="text-center fw-bold text-primary mb-4">
                Create Time Capsule
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label fw-semibold">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter a title for your capsule"
                    required
                    value={data.title}
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="form-label fw-semibold">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    id="content"
                    rows="5"
                    placeholder="Write the content of your capsule here..."
                    required
                    value={data.content}
                    onChange={(e) =>
                      setData({ ...data, content: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="release_date"
                    className="form-label fw-semibold"
                  >
                    Release Date
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="release_date"
                    required
                    value={data.release_date}
                    onChange={(e) =>
                      setData({ ...data, release_date: e.target.value })
                    }
                  />
                  <small className="text-muted">
                    Choose the date and time to release this capsule.
                  </small>
                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primary btn-lg px-4">
                    Create Capsule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
