import { useState, useEffect } from 'react'

export default function useScrollPercentage (ref) {
    //Use a ref if wanting scroll position of individual elements of page scroll
    const [scrollPercentage, setScrollPercentage] = useState (0)

    let elementToListen
    //Set elementToListen to be either window or the ref passed to function
    if (ref.current) {
        elementToListen = ref.current
    } else {
        elementToListen = window
    }

    //Function to find % of way through scrolled 
    function calcScrollPercentage () {
        if(ref) {
            setScrollPercentage(Math.round((elementToListen.scrollTop / elementToListen.scrollHeight)*100))
        } else {
            setScrollPercentage(Math.round((window.pageYOffset / document.documentElement.scrollHeight)*100))
        }
    }

    useEffect(() => {
        elementToListen.addEventListener('scroll', calcScrollPercentage)
        return () => elementToListen.removeEventListener('scroll', calcScrollPercentage)
    })

    return scrollPercentage
}