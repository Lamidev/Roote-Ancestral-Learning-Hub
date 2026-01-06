import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // "instant" behavior is crucial for mobile to override CSS scroll-behavior: smooth
        // This ensures a crisp navigation experience without disorientation
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
