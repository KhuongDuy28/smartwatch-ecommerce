import { useEffect, useState } from "react"

const useScroll = () => {
    const [showGoToTop, setShowGoToTop] = useState(false);
    useEffect(() => {
        const handScroll = () => {
            if(window.scrollY >= 1200) {
                setShowGoToTop(true)
            }
            else {
                setShowGoToTop(false)
            }
        }
        window.addEventListener('scroll', handScroll);
        return () => {
            window.removeEventListener
        }
    }, [showGoToTop])

    function BackToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
    }
    return {showGoToTop, BackToTop}
}

export default useScroll