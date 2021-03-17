import Main                                       from '../components/pageWrapper.js'
import { HomeHeader, About, Services, Contacts }  from '../components/homePage.js'
import { useState, useEffect, useRef }            from 'react';
import { makeStyles}                              from '@material-ui/core/styles';
import { TopBar, AuthedTopBar }                   from '../components/topbar';


const useStyles = makeStyles((theme) => ({
  viewer:{
    width: "100%",
    height: "calc(100vh - 65px)",
    overflowY: "scroll",
    scrollSnapType: "y mandatory"
  },
  backColour:{
    backgroundColor: theme.palette.primary.main
  }
}))

export default function Index() {

  const classes = useStyles()

  let aboutRef = useRef()
  let servicesRef = useRef()
  let contactRef = useRef()
  let articleRef = useRef()

  const [ pageOnScreen, setPageOnScreen] = useState('pic')
  
  useEffect(() => {

    function calcScrollPercentage () {
      let percentageScrolled = Math.round((articleRef.current.scrollTop / articleRef.current.scrollHeight)*100)
      switch(percentageScrolled){
        case 0:
          setPageOnScreen('pic')
          break
        case 25:
          setPageOnScreen('about')
          break
        case 50:
          setPageOnScreen('service')
          break
        case 75:
          setPageOnScreen('contact')
          break
      }
    }

    articleRef.current.addEventListener('scroll', calcScrollPercentage)

    return () => articleRef.current.removeEventListener('scroll', calcScrollPercentage)
  })

  const scrollToRef = (reference) => {
    switch(reference){
    case 'about':
      aboutRef.current.scrollIntoView({behaviour: "smooth"})
      break
    case 'service':
      servicesRef.current.scrollIntoView({behaviour: "smooth"})
      break
    case 'contact':
      contactRef.current.scrollIntoView({behaviour: "smooth"})
      break
    default:
      break
    }
  }

  return (
    <div className={classes.backColour}> 
      <TopBar scrollToRef={scrollToRef}/>
      <article className={classes.viewer} ref={articleRef}>
        <HomeHeader />
        <About ref={aboutRef} />
        <Services ref={servicesRef} isOnScreen={pageOnScreen === 'service'}/>
        <Contacts ref={contactRef} />
      </article>
    </div>
  );
}