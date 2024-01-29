import { useEffect, useState } from "react";

const useMedia = (media) => {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    function checkMedia() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }

    checkMedia();

    window.addEventListener('orientationchange', checkMedia);

    return () => {
      window.removeEventListener('orientationchange', checkMedia);
    };
  }, [media]);

  return match;
};

export default useMedia;