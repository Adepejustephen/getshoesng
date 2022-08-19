import React from 'react';
import NextLink from 'next/link';
import styles from '../../styles/components/Hero.module.css'

const Hero = ({ parentLink, currentPage }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__links}>
        <NextLink href={"/"} passHref>
          <a>Home/</a>
        </NextLink>
        {parentLink && (
          <NextLink href={parentLink} passHref>
            <a>{parentLink}/</a>
          </NextLink>
        )}
        <p className={styles.hero__current}>{currentPage}</p>
      </div>
    </section>
  );
};

export default Hero