import React from 'react';

import styles from '@/styles/Home.module.css'

import paralax1 from '../../assets/images/parallaxImages/sun.png'
import paralax2 from '../../assets/images/parallaxImages/middle mountain.png'
import paralax3 from '../../assets/images/parallaxImages/last tree and mountain.png'
import paralax4 from '../../assets/images/parallaxImages/foreground tree and mountain.png'
import paralax5 from '../../assets/images/parallaxImages/Middle tree and mountain.png'
import paralax6 from '../../assets/images/parallaxImages/Adventure in the Jungle.png'


const ParallaxComponent: React.FC = () => {
    return (
        <div className={styles.containerParallax}>
            <img src={paralax1.src} className={`${styles.parallax} ${styles.parallax1}`} />
            <img src={paralax2.src} className={`${styles.parallax} ${styles.parallax2}`} />
            <img src={paralax3.src} className={`${styles.parallax} ${styles.parallax3}`} />
            <img src={paralax4.src} className={`${styles.parallax} ${styles.parallax4}`} />
        </div>
    )
}

export default ParallaxComponent;