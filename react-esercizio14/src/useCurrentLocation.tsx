import { useState } from "react";

type Position = {
  latitude: number;
  longitude: number;
};
export function useCurrentLocation() {
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  function getCurrentLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation non supportata dal browser");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }

  return { position, loading, error, getCurrentLocation };
}
