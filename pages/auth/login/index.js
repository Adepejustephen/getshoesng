import { useRouter } from 'next/router';
import React, { useContext, useEffect } from "react";
import NextLink from "next/link";
import styles from "../../../styles/pages/Login.module.css";
import axios from "axios";
import { Store } from "../../../utils/store";
import Cookies from "js-cookie";
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const Login = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const router = useRouter();
  const { redirect } = router.query;
  
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()  



 useEffect(() => {
   if (userInfo) {
     router.push("/");
   }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);
  

  const submitHandler = async ({email, password}) => {
    closeSnackbar()

    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });

      dispatch({ type: "USER_LOGIN", payload: data });

      Cookies.set("userInfo", data);

      router.push(redirect || "/");
      enqueueSnackbar('login successful', {variant: 'success'})

      
    } catch (error) {
      enqueueSnackbar(error.response.data ? error.response.data.message : err.message, { variant: 'error' },
      );
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h3>Log in to your account</h3>
        <form
          action=""
          className={styles.form}
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className={styles.form_item}>
            <label htmlFor="email">Email</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                patter: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <input
                  type="email"
                  placeholder="your@email.com"
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Email is not valid"
                        : "Email is required"
                      : ""
                  }
                  // onChange={(e) => setEmail(e.target.value)}
                  {...field}
                />
              )}
            ></Controller>
          </div>
          <div className={styles.form_item}>
            <label htmlFor="email">Password</label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <input
                  type="password"
                  placeholder="password"
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === "minLength"
                        ? "password length is less than 5"
                        : "password is required"
                      : ''
                  }
                  // onChange={(e) => setEmail(e.target.value)}
                  {...field}
                />
              )}
            ></Controller>
            {/* <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            /> */}
          </div>
          <div className={styles.form_item}>
            <button type="submit">SIGN IN</button>
          </div>
          <div className={styles.form_item}>
            <NextLink
              href={`/auth/register?redirect=${redirect || "/"}`}
              passHref
            >
              <a className={styles.form_link}>No account? Create one here</a>
            </NextLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
