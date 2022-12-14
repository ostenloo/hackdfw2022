import Head from 'next/head'
import Image from 'next/image'
import Camera from '../components/Camera'
import styles from '../styles/Home.module.css'
import Google from '../components/Google'
import React, {useEffect, useState} from 'react' 

export default function Home() {
  const [isHidden, setIsHidden] = useState(true)

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => { 
    setHasMounted(true)
  }, [])

  if(!hasMounted)
  {
    return null; 
  }

  const keyHandler = (e) => {
    console.log(e.code)
    if(e.code === "ShiftLeft" || e.code === "ShiftRight")
    {
      setIsHidden(!isHidden)
    }
    document.removeEventListener("keydown", keyHandler);
  }
  
  document.addEventListener("keydown", keyHandler);

  return (
    <div className={styles.container}>
      <Head>
        <title>Google</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/GoogleIcon.png" />
      </Head>
      <div className = {isHidden ? "visible" : "invisible"}>
        <Google /> 
      </div>  
      <div className = {`${isHidden ? "invisible" : "visible"} absolute top-0`}>
        <Camera />
      </div> 
    </div>
  )
}

//{`min-h-[150px] max-h-[290px] flex flex-col ${Styles.height}`}
