import Main                                       from './components/pageWrapper.js'
import { HomeHeader, About, Services, Contacts }  from './components/homePage.js'
import { useRef } from 'react';

export default function Index() {

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
    <Main scrollToRef={scrollToRef}>
          <HomeHeader />
          <About ref={aboutRef} />
          <Services ref={servicesRef} />
          <Contacts ref={contactRef} />
    </Main>
  );
}