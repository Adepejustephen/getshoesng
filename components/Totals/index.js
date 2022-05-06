import React, { Fragment, useState } from 'react'
import NextLink from "next/link";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import styles from '../../styles/components/Totals.module.css'

const Totals = ({ cartItems }) => {
     const [shippingPrice, setShippingPrice] = useState(5);
  return (
    <Fragment>
      <div className={styles.totals}>
        <div className={styles.sub_total}>
          <div className={styles.sub_total_group}>
            <span className={styles.sub_total_text}>
              {cartItems.reduce((a, c) => a + c.quantity, 0)} items
            </span>
            <span className={styles.sub_total_price}>
              ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
            </span>
          </div>
          <div className={styles.sub_total_group}>
            <span className={styles.sub_total_text}>Shipping</span>
            <span className={styles.sub_total_price}>
              ${cartItems.length < 1 ? "0" : shippingPrice}
            </span>
          </div>
        </div>
        <div className={styles.sub_total}>
          <div className={styles.sub_total_group}>
            <span className={styles.sub_total_text}>Total</span>
            <span className={styles.sub_total_price}>
              $
              {cartItems.length < 1
                ? "0"
                : cartItems.reduce((a, c) => a + c.quantity * c.price, 0) +
                  shippingPrice}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.policy_container}>
        <div className={styles.policy_item}>
          <GppGoodOutlinedIcon className={styles.policy_icon} />
          <span>Security policy (edit with Customer reassurance module)</span>
        </div>
        <div className={styles.policy_item}>
          <span>
            <LocalShippingOutlinedIcon className={styles.policy_icon} />
            Delivery policy (edit with Customer reassurance module)
          </span>
        </div>
        <div className={styles.policy_item}>
          <SwapHorizOutlinedIcon className={styles.policy_icon} />
          <span>Return policy (edit with Customer reassurance module)</span>
        </div>
      </div>
    </Fragment>
  );
}

export default Totals