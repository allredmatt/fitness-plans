import { HomeHeader, About, Services, Contacts }  from '../components/homepage/homePage.js'
import { useState, useEffect, useRef }            from 'react';
import { makeStyles}                              from '@material-ui/core/styles';
import { TopBar, AuthedTopBar }                   from '../components/topbar';


const useStyles = makeStyles((theme) => ({
  viewer:{
    width: "100%",
    height: `calc(100vh - 65px)`,
    [theme.breakpoints.up('md')]: {
      overflowY: "scroll",
      scrollSnapType: "y mandatory"
    },
    backgroundColor: theme.palette.primary.light,
  },
  backColour:{
    backgroundColor: theme.palette.primary.light,
    marginBottom: '2px'
  }
}))

export default function Index() {

  const classes = useStyles()

  let aboutRef = useRef()
  let servicesRef = useRef()
  let contactRef = useRef()
  let articleRef = useRef()

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
        <Services ref={servicesRef}/>
        <Contacts ref={contactRef} />
      </article>
    </div>
  );
}