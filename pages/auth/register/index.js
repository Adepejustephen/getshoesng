import NextLink from 'next/link'
import styles from '../../../styles/pages/Register.module.css'

const Register = () => {
  return (
    <div className={styles.container}>
      <h3>Create an account</h3>
      <form action="" className={styles.form}>
        <div className={styles.form_item}>
          <span>Already have an account?</span>
          <NextLink href={"/auth/register"} passHref>
            <a className={styles.form_link}>Login instead</a>
          </NextLink>
        </div>
        <div className={styles.form_item}>
          <label htmlFor="Full Name">Full Name</label>
          <input type="text" placeholder="Your name" />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="your@email.com" />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="email">Password</label>
          <input type="password" placeholder="password" />
        </div>
        <div className={styles.form_item}>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default Register