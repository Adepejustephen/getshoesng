import React from "react";
import { Hero } from "../../components";
import styles from "../../styles/pages/Information.module.css";


const Information = () => {
  return (
    <>
      <Hero parentLink={'my-account'} currentPage={"Information"} />
      <div className={styles.container}>
        <h3>Your personal information</h3>
        <form
          action=""
          className={styles.form}
          // onSubmit={handleSubmit(submitHandler)}
        >
          <div className={styles.form_item}></div>
          <div className={styles.form_item}>
            <label htmlFor="Full Name">Full Name</label>

            <input type="text" placeholder="Full name" />
          </div>
          <div className={styles.form_item}>
            <label htmlFor="email">Email</label>

            <input
              type="email"
              placeholder="your@email.com"
              pattern=" /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
          </div>
          <div className={styles.form_item}>
            <label htmlFor="password"> New Password</label>

            <input type="password" placeholder="password" />
          </div>
          <div className={styles.form_item}>
            <label htmlFor="password"> Confirm Password</label>

            <input type="password" placeholder=" Confirm password" />
          </div>
          <div className={styles.form_item}>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Information;
