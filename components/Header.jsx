import Head from 'next/head'
import CLOUDS from 'vanta/dist/vanta.clouds.min'
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script'


export default function Header(){
    const [vantaEffect, setVantaEffect] = useState(null)
    const myRef = useRef(null)

    useEffect(() => {
        if(!vantaEffect) {
          setVantaEffect(CLOUDS({
            el:myRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: true
          }))
        }
        return () => {
          if (vantaEffect) vantaEffect.destroy()
        }
      }, [vantaEffect])


    return(
        <>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"/>
            <div ref={myRef}>
                <div >
                    <div className='header'>
                        <h1 className='section-header-text--large'>Marcelo Mata</h1>
                    </div>
                </div>
            </div>
        </>
    )
}