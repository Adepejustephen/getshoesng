import { Card, Grid } from "@mui/material";
import {MdLocationOn} from 'react-icons/md'
import { IoMdMail } from "react-icons/io";
import styles from '../../styles/pages/contact.module.css'
import { Hero } from "../../components";


const Contact = () => {
  return (
    <>
      <Hero currentPage={"Contact"} />
      <div className={styles.container}>
        <Grid container>
          <Grid item xs={12} md={3}>
            <div className={styles.info_container}>
              <h4>STORE INFORMATION</h4>
              <div className={styles.info_items}>
                <div className={styles.info_item}>
                  <div className={styles.info_icon_container}>
                    <MdLocationOn />
                  </div>
                  <div className={styles.info_text}>
                    <span>At Lagos</span>
                    <span>Nigeria</span>
                  </div>
                </div>
                <div className={styles.info_item}>
                  <div className={styles.info_icon_container}>
                    <IoMdMail />
                  </div>
                  <div className={styles.info_text}>
                    <span>Email us:</span>
                    <span>AdepejuIfeoluwa97@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={13} md={9}>
            <Card variant="outlined">
              <div className={styles.form_container}>
                <h2>CONTACT US</h2>
                <form action="" className={styles.form}>
                  <div className={styles.form_item}>
                    <label htmlFor="" className={styles.form_item_label}>
                      Subject
                    </label>
                    <select
                      name="subject"
                      id="subject"
                      className={styles.form_item_select}
                    >
                      <option value="1">Customer service</option>
                      <option value="2">Webmasters</option>
                    </select>
                  </div>
                  <div className={styles.form_item}>
                    <label htmlFor="" className={styles.form_item_label}>
                      Email address
                    </label>
                    <input
                      type=""
                      placeholder="youremail.com"
                      className={styles.form_item_input}
                    />
                  </div>
                  <div className={styles.form_item}>
                    <label htmlFor="" className={styles.form_item_label}>
                      Message
                    </label>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      placeholder="How can we help"
                      className={styles.form_item_textarea}
                    />
                  </div>
                  <button type="submit" className={styles.submit_btn}>
                    Send
                  </button>
                </form>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Contact;
