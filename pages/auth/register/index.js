import axios from 'axios';
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/pages/Register.module.css'
import { Store } from '../../../utils/store';
import Cookies from "js-cookie";
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const Register = () => {

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  
const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar(); 

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    closeSnackbar()
    if (password !== confirmPassword) {
      alert("password don't match")
      return
    }

    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });

      dispatch({ type: "USER_LOGIN", payload: data });

      Cookies.set("userInfo", data);

      router.push(redirect || "/");

       enqueueSnackbar("registration successful", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(
        error.response.data ? error.response.data.message : err.message,
        { variant: "error" }
      );
    }
  };
  return (
    <div className={styles.container}>
      <h3>Create an account</h3>
      <form action="" className={styles.form} onSubmit={submitHandler}>
        <div className={styles.form_item}>
          <span>Already have an account?</span>
          <NextLink href={`/auth/login?redirect=${redirect || "/"}`} passHref>
            <a className={styles.form_link}>Login instead</a>
          </NextLink>
        </div>
        <div className={styles.form_item}>
          <label htmlFor="Full Name">Full Name</label>
          <input
            type="text"
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <label htmlFor="email"> Confirm Password</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.form_item}>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default Register