import React, { useState } from 'react'
import NextLink from 'next/link'
import styles from '../../../styles/pages/Login.module.css'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        
        try {
           const { data } = await axios.post("/api/users/login", {
             email,
             password,
           });
           alert('successful') 
        } catch (error) {
            alert(error.message)
        }
    }
    
  return (
    <>
      <div className={styles.container}>
        <h3>Log in to your account</h3>
        <form action="" className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form_item}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.form_item}>
            <label htmlFor="email">Password</label>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.form_item}>
            <button type="submit">SIGN IN</button>
          </div>
          <div className={styles.form_item}>
            <NextLink href={"/auth/register"} passHref>
              <a className={styles.form_link}>No account? Create one here</a>
            </NextLink>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login