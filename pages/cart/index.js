import { useContext, useState } from "react";
import dynamic from 'next/dynamic'
import NextLink from "next/link";
import Image from "next/image";
import styles from "../../styles/pages/Cart.module.css";
import { Store } from "../../utils/store";
import { Grid } from "@mui/material";
import { BiMinus, BiPlus } from "react-icons/bi";
import { MdOutlineChevronLeft, MdDelete } from "react-icons/md";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";

const Cart = () => {
     const { state } = useContext(Store);
     const {
       cart: { cartItems },
     } = state;
     const [count, setCount] = useState(1);
     const [shippingPrice, setShippingPrice] = useState(5);
  return (
    <div className={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <div className={styles.list_container}>
            <div className={styles.cart_title}>
              <h4>SHOPPING CART</h4>
            </div>
            {cartItems.length >= 1 ? (
              <div>
                <ul className={styles.list}>
                  {cartItems.map((item) => {
                    return (
                      <li key={item._id} className={styles.list_item}>
                        <div className={styles.image_container}>
                          <Image
                            src={item.image[0]}
                            alt={item.name}
                            layout="fill"
                            objectFit="contain"
                            objectPosition="center"
                            priority
                          />
                        </div>

                        <div className={styles.item_info}>
                          <div className={styles.item_text}>
                            <span className={styles.item_name}>
                              {item.name}
                            </span>
                            <span className={styles.item_price}>
                              ${item.price}
                            </span>
                            <MdDelete className={styles.delete_icon} />
                          </div>
                          <div className={styles.counter}>
                            <BiMinus className={styles.counter_icon} />
                            {/* <input type='text' value={count} /> */}
                            <span>{count}</span>
                            <BiPlus className={styles.counter_icon} />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className={styles.notice}>
                <span>There are no more items in your cart</span>
              </div>
            )}
          </div>
          <NextLink href={"/products"} passHref>
            <a className={styles.link_back}>
              {" "}
              <MdOutlineChevronLeft /> Continue shopping
            </a>
          </NextLink>
        </Grid>
        <Grid item xs={12} sm={4}>
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
            <div className={styles.btns}>
              <NextLink href={"/checkout"} passHref>
                <a className={styles.a_btn}>PROCEED TO CHECKOUT</a>
              </NextLink>
            </div>
          </div>
          <div className={styles.policy_container}>
            <div className={styles.policy_item}>
              <GppGoodOutlinedIcon className={styles.policy_icon} />
              <span>
                Security policy (edit with Customer reassurance module)
              </span>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Cart), {ssr: false});
