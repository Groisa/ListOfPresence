import React from 'react';

import styles from '@/styles/Home.module.css'




const ParallaxComponent: React.FC = () => {
    return (
        <div className={styles.containerParallax}>
            <div className={`${styles.parallax} ${styles.parallax1}`} />
            <div className={`${styles.parallax} ${styles.parallax2}`} />
            <div className={`${styles.parallax} ${styles.parallax3}`} />
            <div className={`${styles.parallax} ${styles.parallax4}`} />
            <div className={`${styles.parallax} ${styles.parallax5}`} />
        </div>
    )
}

export default ParallaxComponent;