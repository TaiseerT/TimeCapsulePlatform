"use client";
export default function Capsules({ isLoggedIn, capsules, loading, error }) {
  return (
    <div className="container my-5" id="capsules">
      {/* Section Header */}
      <h2 className="text-center fw-bold mb-4" style={{ fontSize: "2.5rem" }}>
        Your Time Capsules
      </h2>

      {/* Loading State */}
      {isLoggedIn && loading ? (
        <div className="row g-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="col-md-4 col-sm-6">
              <div
                className="card border-0 shadow-sm p-3"
                style={{ minHeight: "300px" }}
              >
                <div
                  className="skeleton-image"
                  style={{
                    height: "130px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "8px",
                  }}
                ></div>
                <div className="mt-3">
                  <div
                    className="skeleton-text"
                    style={{
                      height: "20px",
                      backgroundColor: "#e0e0e0",
                      width: "60%",
                      margin: "10px auto",
                      borderRadius: "4px",
                    }}
                  ></div>
                  <div
                    className="skeleton-text"
                    style={{
                      height: "20px",
                      backgroundColor: "#e0e0e0",
                      width: "40%",
                      margin: "10px auto",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !isLoggedIn ? (
        /* Error State */
        <p className="text-center text-danger fw-bold">
          You must be logged in to view your time capsules
        </p>
      ) : capsules.length === 0 ? (
        /* Empty State */
        <div className="text-center">
          <i className="bi bi-box-seam" style={{ fontSize: "3rem" }}></i>
          <p className="text-muted mt-3" style={{ fontSize: "1.2rem" }}>
            You have no time capsules.
          </p>
        </div>
      ) : (
        /* Time Capsule Grid */
        <div className="row g-4">
          {isLoggedIn &&
            capsules?.data?.map((capsule, index) => (
              <div key={capsule._id || index} className="col-md-4 col-sm-6">
                <div
                  className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden"
                  style={{ transition: "transform 0.3s" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{capsule.title}</h5>
                    <a
                      href={`/capsule/${capsule._id}`}
                      className="btn btn-outline-primary"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          {!isLoggedIn && (
            <div>You must be logged in to view your time capsules</div>
          )}
        </div>
      )}
    </div>
  );
}
