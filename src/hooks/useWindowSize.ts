import { useCallback, useEffect, useState } from "react";

export default function useWindowSize() {
  const [width, setWidth] = useState(0);

  const resizeWindow = useCallback(() => {
    console.log('resize');
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);

    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, [width]);

  return width;
}