import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly force window viewport context back to absolute zero coordinates
    window.scrollTo(0, 0);
  }, [pathname]); // Fires instantly every single time a navigation path switch occurs

  return null;
}