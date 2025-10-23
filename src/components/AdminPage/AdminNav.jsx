import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/userAPI";

function AdminNav({ setError }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.error("Logout failed", err);
            setError("Logout failed");
        }
    };
    
    return (
        <nav className="flex flex-row justify-between items-center px-5 py-3 shadow">
            <div className="flex flex-row gap-2">
                <Link to="/" className="">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shopping-basket-icon lucide-shopping-basket"
                    >
                        <path d="m15 11-1 9" />
                        <path d="m19 11-4-7" />
                        <path d="M2 11h20" />
                        <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
                        <path d="M4.5 15.5h15" />
                        <path d="m5 11 4-7" />
                        <path d="m9 11 1 9" />
                    </svg>
                </Link>
                <h2>Admin Panel</h2>
            </div>

            <button onClick={handleLogout} className="px-4 py-1.5 cursor-pointer border bg-black text-white transition hover:bg-white hover:text-black font-semibold">
                Log out
            </button>
        </nav>
    )
}

export default AdminNav