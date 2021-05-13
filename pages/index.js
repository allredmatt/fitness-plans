import { HomeHeader, About, Services, Contacts }  from '../components/homepage/homePage.js'
import { useState, useEffect, useRef }            from 'react';
import { makeStyles}                              from '@material-ui/core/styles';
import { TopBar, AuthedTopBar }                   from '../components/topbar';


const useStyles = makeStyles((theme) => ({
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
        <HomeHeader />
        <About ref={aboutRef} />
        <Services ref={servicesRef}/>
        <Contacts ref={contactRef} />
      <style jsx global>
      {`
        html {
          scroll-snap-type: y mandatory;
        }
      `}
      </style>
    </div>
  );
}