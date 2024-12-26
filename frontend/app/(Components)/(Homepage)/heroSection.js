"use client";
export default function HeroSection() {
  return (
    <>
      <div
        className="hero-section bg-light text-center py-5"
        style={{
          backgroundImage: `url(/misraj-hero.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <div
          className="container py-5"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
            animation: "fadeIn 1.5s ease-in-out",
          }}
        >
          <h1
            className="display-4 fw-bold mb-3"
            style={{ fontSize: "3rem", animation: "slideInUp 1s ease-out" }}
          >
            Time Capsules Are Here!
          </h1>
          <p
            className="lead text-white-50 mb-4"
            style={{
              fontSize: "1.25rem",
              animation: "slideInUp 1.2s ease-out",
            }}
          >
            Create and manage your time capsules easily.{" "}
          </p>
          <a
            href="/capsule/create-time-capsule"
            className="btn btn-primary btn-lg px-5 py-3"
            style={{
              fontWeight: "bold",
              animation: "slideInUp 1.4s ease-out",
              transition: "transform 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Create one now!
          </a>
        </div>
      </div>
    </>
  );
}
