// import { Grid } from '@mui/material';
import React, { useContext, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
// import {FaUserCircle} from 'react-icons/fa'
import { IoLocationSharp } from "react-icons/io5";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Store } from "../../utils/store";
import DateRangeIcon from "@mui/icons-material/DateRange";
import styles from '../../styles/pages/MyAccount.module.css'

const MyAccount = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

   const logOutHandler = () => {
     dispatch({ type: "LOGOUT_USER" });
     Cookies.remove("userInformation");
     Cookies.remove("cartItems");
     router.push("/");
   };

  return (
    <div className={styles.container}>
      <h2>Your account</h2>
      <div className={styles.links}>
        <NextLink href="/infomation" passHref>
          <div className={styles.link}>
            <AccountCircleIcon style={{ fontSize: 40, color: " #24333b" }} />
            <span>INFORMATION</span>
          </div>
        </NextLink>
        <NextLink href="/infomation" passHref>
          <div className={styles.link}>
            <IoLocationSharp style={{ fontSize: 40, color: "#24333b" }} />
            <span>ADDRESS</span>
          </div>
        </NextLink>
        <NextLink href="/infomation" passHref>
          <div className={styles.link}>
            <DateRangeIcon style={{ fontSize: 40, color: "#24333b" }} />
            <span>ORDER DETAILS AND HISTORY</span>
          </div>
        </NextLink>
      </div>
      <span className={styles.logoutBtn} onClick={logOutHandler}>
        <span>Sign out</span>
      </span>
    </div>
  );
};

export default MyAccount;
