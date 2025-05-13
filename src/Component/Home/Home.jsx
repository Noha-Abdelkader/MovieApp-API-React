
import React from 'react'
import HomeSlider from '../HomeSlider/HomeSlider';
import Movie from '../Movie/Movie';
import LoadingCard from '../LoadingCard/LoadingCard';

export default function Home() {


 return <div className='container p-2'>
   <LoadingCard/>
  <HomeSlider/>
  <Movie/>

   </div>
}


