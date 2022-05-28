import React from "react";
import NextLink from "next/link";
import styles from "../../styles/components/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.group}>
        <header className={styles.group_header}>
          <div className={styles.title}>
            <NextLink href={"/"} passHref>
              <a>
                <h2>
                  MENSHOESNG <span>.</span>
                </h2>
              </a>
            </NextLink>
          </div>
        </header>
        <div>
          <p>no8 TCurrent Street, Alapere, Lagos Nigeria</p>
          <p>+2348149735987</p>
          <p>
            <a href="mailto:adepejuifeoluwa97@gmail.com">
              adepejuifeoluwa97@gmail.com
            </a>
          </p>
        </div>
      </div>
      <div className={styles.group}>
        <header className={styles.group_header}>
          <div className={styles.title}>
            <h4>Our Products</h4>
          </div>
        </header>
        <div>
          <ul>
            <li className={styles.links_item}>
              <NextLink href={"products"} passHref>
                <a>New products</a>
              </NextLink>
            </li>
            <li className={styles.links_item}>
              <NextLink href={"products"} passHref>
                <a>Trending products</a>
              </NextLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.group}>
        <header className={styles.group_header}>
          <div className={styles.title}>
            <h4>Useful Links</h4>
          </div>
        </header>
        <div>
          <ul>
            <li className={styles.links_item}>
              <NextLink href={"/products"} passHref>
                <a>About Us</a>
              </NextLink>
            </li>
            <li className={styles.links_item}>
              <NextLink href={"/contact"} passHref>
                <a>Contact</a>
              </NextLink>
            </li>
            <li className={styles.links_item}>
              <NextLink href={"/"} passHref>
                <a>Blog</a>
              </NextLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.group}>
        <header className={styles.group_header}>
          <div className={styles.title}>
            <h4>Newsletter signup</h4>
          </div>
        </header>
        <div>
          <span>Stay Updated on all that is new add noteworthy</span>
          <form>
            <div className={styles.form_items}>
              <input type="email" placeholder="Your Email" />
              <button type="submit">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
