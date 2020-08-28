import React from 'react';
// import classes from './BackgroundVideo.module.css';
import backgroundVid from '../vids/slow-motion-smashing-computer-monitor_-jm_0mwgr__WL.mp4';

const BackgroundVideo = () => {
  // const videoSource = {backgroundVid}
  return (
    <div className='container-fluid'>
      <video autoPlay='autoplay' loop='loop'>
        <source src={backgroundVid} type='video/mp4' />
      </video>
    </div>
  );
};
export default BackgroundVideo;
