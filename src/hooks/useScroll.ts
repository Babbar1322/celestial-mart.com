import { useEffect, useState } from 'react';

type returnType = -1 | 0 | 1;

export function useScroll(offset: number): returnType {
    const getMatches = (offset: number): returnType => {
        // Prevents SSR issues
        if (typeof window !== 'undefined') {
            if(window.scrollY > offset) {
                return 1;
            } else if (window.scrollY === offset) {
                return 0;
            } else {
                return -1;
            }
        }
        return -1;
    };

    const [matches, setMatches] = useState<returnType>(getMatches(offset));

    function handleChange() {
        setMatches(getMatches(offset));
    }

    useEffect(() => {
        // Triggered at the first client-side load and if query changes
        handleChange();

        // Listen matchMedia
        window.addEventListener('scroll', handleChange);

        return () => {
            window.removeEventListener('scroll', handleChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset]);

    return matches;
}
