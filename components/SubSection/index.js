import React from 'react'
import styles from '../../styles/components/Subscription.module.css'

const Subsection = () => {
  return (
    <section className={styles.container}>
      <div>
        <h4>Get Juicy Fashion Tips Right in your Inbox</h4>
        <form>
          <input type="email" placeholder="Your email address" />
          <button type="submit">SUBSCRIBE</button>
        </form>
      </div>
    </section>
  );
}

export default Subsection