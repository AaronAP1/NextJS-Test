import React from "react";
import { ModeToggle } from "./theme-toggle-button";
import Modal from "@/components/util/modal";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 py-2">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Reservas UPPEREAT</h1>
      <div className="flex items-center space-x-4">
        <Modal />
        <ModeToggle/>
      </div>
    </nav>
  );
}

export default Navbar;
