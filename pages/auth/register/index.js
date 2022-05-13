import axios from 'axios';
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { useContext, useEffect } from 'react';
import styles from '../../../styles/pages/Register.module.css'
import { Store } from '../../../utils/store';
import Cookies from "js-cookie";
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const Register = () => {

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  

  
  const {
    handleSubmit,control,
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

  const submitHandler = async ({name,email, password, confirmPassword}) => {
   
    closeSnackbar()
    if (password !== confirmPassword) {
      enqueueSnackbar(
       "Passwords don't match",
        { variant: "error" }
      );
      return
    }

    try {
    const { data } = await axios.post("/api/users/register", {
      name,
      email,
      password,
    });

       dispatch({ type: "USER_LOGIN", payload: data });
      //  Cookies.set('userInformation', data);
       Cookies.set("userInformation", data);

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
      <form
        action=""
        className={styles.form}
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className={styles.form_item}>
          <span>Already have an account?</span>
          <NextLink href={`/auth/login?redirect=${redirect || "/"}`} passHref>
            <a className={styles.form_link}>Login instead</a>
          </NextLink>
        </div>
        <div className={styles.form_item}>
          <label htmlFor="Full Name">Full Name</label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <input
                type="text"
                placeholder="Full name"
                control={control}
                inputProps={{ type: "type" }}
                error={Boolean(errors.name)}
                {...field}
              />
            )}
          ></Controller>
          {errors.name ? (
            errors.name.type === "required" ? (
              <span style={{ color: "red", fontSize: 12 }}>
                Full name is required
              </span>
            ) : (
              <span style={{ color: "red", fontSize: 12 }}>
                Full name is required
              </span>
            )
          ) : (
            ""
          )}
        </div>
        <div className={styles.form_item}>
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            }}
            render={({ field }) => (
              <input
                type="email"
                placeholder="your@email.com"
                control={control}
                inputProps={{ type: "email" }}
                error={Boolean(errors.email)}
                {...field}
              />
            )}
          ></Controller>
          {errors.email ? (
            errors.email.type === "pattern" ? (
              <span style={{ color: "red", fontSize: 12 }}>
                Email is not valid
              </span>
            ) : (
              <span style={{ color: "red", fontSize: 12 }}>
                Email is required
              </span>
            )
          ) : (
            ""
          )}
        </div>
        <div className={styles.form_item}>
          <label htmlFor="password">Password</label>
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
                {...field}
              />
            )}
          ></Controller>
          {errors.password ? (
            errors.password.type === "minLength" ? (
              <span style={{ color: "red", fontSize: 12 }}>
                password is less than 5
              </span>
            ) : (
              <span style={{ color: "red", fontSize: 12 }}>
                password is required
              </span>
            )
          ) : (
            ""
          )}
        </div>
        <div className={styles.form_item}>
          <label htmlFor="email"> Confirm Password</label>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 6,
            }}
            render={({ field }) => (
              <input
                type="password"
                placeholder=" Confirm password"
                error={Boolean(errors.confirmPassword)}
                {...field}
              />
            )}
          ></Controller>
          {errors.confirmPassword ? (
            errors.confirmPassword.type === "minLength" ? (
              <span style={{ color: "red", fontSize: 12 }}>
                password is less than 5
              </span>
            ) : (
              <span style={{ color: "red", fontSize: 12 }}>
               confirm  password
              </span>
            )
          ) : (
            ""
          )}
        </div>
        <div className={styles.form_item}>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default Register