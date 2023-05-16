import React from 'react'
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  return <>
<div className={ `d-flex justify-content-center align-items-center  position-absolute top-0 bottom-0 start-0 end-0 ${styles.bgFaint} `}>
  <iframe title='framStyle' src="https://embed.lottiefiles.com/animation/69398"></iframe>
</div>
  </>
}
