import React, { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // WhatsApp configuration - you can move these to environment variables
  const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER || "919876543210"; // Default number
  const defaultMessage =
    process.env.REACT_APP_WHATSAPP_MESSAGE ||
    "Hello! I am interested in NEET coaching. Can you provide more information?";

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* WhatsApp Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 z-50 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FaWhatsapp className="text-green-500 text-xl" />
              <span className="font-semibold text-gray-800">Chat with us</span>
            </div>
            <button
              onClick={toggleWidget}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">
              Hi there! 👋 How can we help you today?
            </p>
            <p className="text-xs text-gray-500">Typically replies instantly</p>
          </div>

          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <FaWhatsapp />
            Start Chat
          </button>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={isOpen ? handleWhatsAppClick : toggleWidget}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-40"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </button>
    </>
  );
};

export default WhatsAppButton;
