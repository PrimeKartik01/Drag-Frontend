
import { useEffect, useState } from "react";

const POPUP_DELAY = 5000;
const SUBMITTED_KEY = "ssprime_enquiry_submitted";

export const useEnquiryPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(
    () => sessionStorage.getItem(SUBMITTED_KEY) === "true"
  );

  // Automatically open popup after 5 seconds
  useEffect(() => {
    if (isSubmitted || isOpen) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, POPUP_DELAY);

    return () => window.clearTimeout(timer);
  }, [isOpen, isSubmitted]);

  // Open popup manually
  const openPopup = () => {
    if (!isSubmitted) {
      setIsOpen(true);
    }
  };

  // Close popup. Timer will restart automatically.
  const closePopup = () => {
    setIsOpen(false);
  };

  // Stop popup after successful submission
  const markAsSubmitted = () => {
    sessionStorage.setItem(SUBMITTED_KEY, "true");
    setIsSubmitted(true);
    setIsOpen(false);
  };

  return {
    isOpen,
    isSubmitted,
    openPopup,
    closePopup,
    markAsSubmitted,
  };
};
