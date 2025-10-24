import React from "react";
import { Link } from "react-router-dom";
import { FaWrench } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center bg-gradient-to-b from-gray-50 to-gray-100 px-6">
      <FaWrench className="text-6xl text-gray-700 mb-4 animate-spin-slow" />
      <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Halaman yang kamu cari kayaknya lagi kabur ke bengkel 🚗💨
      </p>
      <Link
        to="/"
        className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
      >
        Balik ke Beranda
      </Link>
    </div>
  );
}
