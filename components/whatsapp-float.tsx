"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/966551231236", "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl z-50 transition-transform hover:scale-110"
      aria-label="تواصل معنا عبر واتساب"
    >
      <FontAwesomeIcon icon={faWhatsapp} />
    </button>
  );
}
