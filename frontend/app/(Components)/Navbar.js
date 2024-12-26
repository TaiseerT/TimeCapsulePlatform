"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { login, logout } from "../(redux)/(slices)/auth.slice";

export default function Navbar() {
  const pathname = usePathname();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      dispatch(login({ token, role }));
    }
    setIsInitializing(false);
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(logout());
    router.push("/");
  };

  if (isInitializing) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link href="/" className="navbar-brand fw-bold">
          Misraj
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FiMenu size={24} />
        </button>

        {/* Collapsible Navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {isLoggedIn && (
              <>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger d-flex align-items-center"
                >
                  <FaSignOutAlt className="me-2" />
                  Logout
                </button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link href="/auth/login" className="btn btn-secondary me-2">
                  <FaUserCircle className="me-2" />
                  Login
                </Link>
                <Link href="/auth/register" className="btn btn-primary">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
