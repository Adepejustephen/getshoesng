import { useContext, useState } from "react";
import NextLink from 'next/link'
import Image from "next/image";
import styles from "../../styles/components/Cart.module.css";
import { Store } from "../../utils/store";
import { Grid } from "@mui/material";
import { BiMinus, BiPlus } from "react-icons/bi";
import {FaTimes} from 'react-icons/fa'

const CartList = () => {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const [count, setCount] = useState(1);
  const [shippingPrice, setShippingPrice] = useState(5);

  return (
    <div>
      {cartItems.length >= 1 ? (
        <div className={styles.container}>
          <ul className={styles.list}>
            {cartItems.map((item) => {
              return (
                <li key={item._id} className={styles.list_item}>
                  <Grid container>
                    <Grid item xs={3}>
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
                    </Grid>
                    <Grid item xs={9}>
                      <div className={styles.item_info}>
                        <div className={styles.item_text}>
                          <span className={styles.item_name}>{item.name}</span>
                          <span className={styles.item_price}>
                            ${item.price}
                          </span>
                        </div>
                        <div className={styles.counter}>
                          <BiMinus className={styles.counter_icon} />
                          {/* <input type='text' value={count} /> */}
                          <span>{count}</span>
                          <BiPlus className={styles.counter_icon} />
                        </div>
                      </div>

                      <div>
                        <FaTimes className={styles.delete_icon} />
                      </div>
                    </Grid>
                  </Grid>
                </li>
              );
            })}
          </ul>

          <div className={styles.totals}>
            <div className={styles.sub_total}>
              <div className={styles.sub_total_group}>
                <span className={styles.sub_total_text}>Subtotal</span>
                <span className={styles.sub_total_price}>
                  ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </span>
              </div>
              <div className={styles.sub_total_group}>
                <span className={styles.sub_total_text}>Shipping</span>
                <span className={styles.sub_total_price}>${shippingPrice}</span>
              </div>
            </div>
            <div className={styles.sub_total}>
              <div className={styles.sub_total_group}>
                <span className={styles.sub_total_text}>Total</span>
                <span className={styles.sub_total_price}>
                  $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0) +
                    shippingPrice}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.btns}>
            <NextLink href={"/cart"} passHref>
              <a className={styles.a_btn}>VIEW CART</a>
            </NextLink>
            <NextLink href={"/checkout"} passHref>
              <a className={styles.a_btn}>CHECKOUT</a>
            </NextLink>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CartList;
