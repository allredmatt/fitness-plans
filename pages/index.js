import { makeStyles}  from '@material-ui/core/styles';
import { useRef }     from 'react';
import { TopBar }     from '../components/topbar';
import { HomeHeader } from '../components/homepage/imageHeader'
import { About }      from '../components/homepage/about'
import { Services }   from '../components/homepage/services'
import { Contact }    from '../components/homepage/contact'

const useStyles = makeStyles((theme) => ({
  backColour:{
    backgroundColor: theme.palette.primary.dark,
    marginBottom: '2px', 
    '-webkit-overflow-scrolling' : 'touch' 
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
        <Contact ref={contactRef} />
      <style jsx global>
      {`
        html {
          scroll-snap-type: y mandatory;
          -webkit-overflow-scrolling: touch;

        }
      `}
      </style>
    </div>
  );
}
