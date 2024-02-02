"use client";
import React, { useEffect, useState, useRef  } from 'react';
import { useOnScreen } from './utilitas/UseOnScreen';
import Image from 'next/image';
import logoPerushaan from '../public/image/logo.jpg';




const Heros = ({ title = "Hore" , isLoad}) => {

  const showImage = [
        "url('/slideshow/show1.JPG')",
        "url('/slideshow/show2.JPG')",
        "url('/slideshow/show3.JPG')",
        "url('/slideshow/show4.JPG')",
        "url('/slideshow/show5.JPG')",
      ];
  
  const [show, setShow] = useState(showImage[0]);
  const [counter, setCounter] = useState(0);

  const changeImage = () => {
    setShow(showImage[counter+1]);
  }

  if(counter <= showImage.length){
    setTimeout(changeImage, 1000);
  }
  



  return (
    <div className='flex flex-col h-full w-full px-32 py-10'>
      <div  className='flex w-full h-full bg-blue-950 rounded-3xl bg-cover drop-shadow-xl border-4 border-blue-600' 
            style={{ backgroundImage: show }}>

      </div>
    </div>
  );
};

const Informasi = ({title = "Hore", isLoad = false}) => {
  useEffect(() => {
    console.log("informasi page", isLoad);
  },[isLoad]);

  const [hasLoad, setHasLoad] = useState(false);

  const animateComponent = () => {
    setHasLoad(true);
  }

  useEffect(() => {
    animateComponent();
  }, []);


  return(
    <div className='h-screen'>
      Menampilkan Komponen Informasi gituloh
      <div className={`h-96 align-middle bg-indigo-950 w-96 transform transition-transform duration-700 ${hasLoad ? 'translate-x-0' : '-translate-x-full'}`}>
      </div>
    </div>
  )
}

const About = ({title = "Hore", isLoad = false}) => {
  useEffect(() => {
    console.log("About page", isLoad);
  },[isLoad]);


  return(
    <div className='h-screen'>
      ini menampilkan halaman about
    </div>
  )
}



const Home = () => {
  const [changeHeader, setChangeHeader] = useState(false);
  const handleScrll = () =>{
    window.scrollY> 32 ? toggleHeader(true) : toggleHeader(false);
  }
  const toggleHeader = (value) => {
    setTimeout(()=>{
      setChangeHeader(value);
    },150);
  }

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };





  const [informasiVisible, setInformasiVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  
  const informasiRef = useRef(null);
  const dashboardRef = useRef(null);
  const aboutRef = useRef(null);


  const pageInformasiScroll = () => {
    if (informasiRef.current) {
      const rect = informasiRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // Check if the top of the element is visible in the window
      const isInformasiVisible = rect.top <= windowHeight && rect.bottom >= 0;
      setInformasiVisible(isInformasiVisible);
    }
  };


  const pageAboutScroll = () => {
    if (aboutRef.current) {
      const rect = aboutRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // Check if the top of the element is visible in the window
      const isAboutVisible = rect.top <= windowHeight && rect.bottom >= 0;
      setAboutVisible(isAboutVisible);
    }
  };



  useEffect(() => {
    window.addEventListener('scroll', pageAboutScroll);
    window.addEventListener('scroll', pageInformasiScroll);
    window.addEventListener("scroll", handleScrll);
    return () => {
      window.removeEventListener("scroll", handleScrll);
      window.removeEventListener('scroll', pageInformasiScroll);
      window.removeEventListener('scroll', pageAboutScroll);
    }
  },[]);




  

  return (
    <>
    <div className={`sticky top-0 w-full ${changeHeader ? "h-16 bg-opacity-45" : "h-40 bg-opacity-0 backdrop-blur-0"} bg-blue-950 z-50 border-gray-50 transition-height duration-500 `}>
      
      <div className='w-full h-full '>
          <div className={`h-full flex justify-center items-center flex-col transition-opacity duration-300 ${changeHeader ? 'opacity-0' : 'opacity-100'}`}>
            <div className='text-center text-6xl my-2 font-bold text-blue-50'>PT SUMBER SEGARA PRIMADAYA</div>
          </div>

      </div>

      <div className={`flex justify-between z-50 -mt-16 h-16 transition-opacity duration-300 ${changeHeader ? 'opacity-100' : 'opacity-0'}`}>
        {/* LOGO */}
        <div className='flex w-56 justify-center items-center'>
          <Image src={logoPerushaan} width={80} height={10} alt='Logo'/>
        </div>

        {/* MENU WBSITE */}
        <div className='absolute w-1/2 flex justify-end items-center pr-16 right-0 h-full text-blue-50'>
          <div className='mx-2 cursor-pointer' onClick={() => scrollToRef(dashboardRef)}>Dahboard</div>
          <div className='mx-2 cursor-pointer' onClick={() => scrollToRef(informasiRef)}>Informasi</div>
          <div className='mx-2 cursor-pointer' onClick={() => scrollToRef(aboutRef)}>About</div>
        </div>
      </div>
    </div>



    <div className='-mt-40'>
      <div>
        <div ref={dashboardRef} className='h-screen'>
          <Heros title='Komponen Slide Show' isLoad={true}/>
        </div>

        <div ref={informasiRef} className='bg-cover h-screen' style={{ backgroundImage: `url('/background/background1.jpg')` }}>
          <Informasi title='Informasi' isLoad={informasiVisible} />
        </div>

        <div className='h-screen' ref={aboutRef}>
          <About title='Halaman About' isLoad={aboutVisible} />
        </div>
      </div>
    </div>
    </>
  )
}

export default Home