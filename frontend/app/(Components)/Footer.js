"use client";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <div className="container">
        <p className="mb-2">© 2024 Misraj. All Rights Reserved.</p>
        <div>
          <a
            href="#"
            className="text-white me-3"
            style={{ textDecoration: "none" }}
          >
            <FaFacebook className="me-2" />
            Facebook
          </a>
          <a
            href="#"
            className="text-white me-3"
            style={{ textDecoration: "none" }}
          >
            <FaTwitter className="me-2" />
            Twitter
          </a>
          <a href="#" className="text-white" style={{ textDecoration: "none" }}>
            <FaInstagram className="me-2" />
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
