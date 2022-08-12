import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import Image from "next/image";
import styles from "../../styles/pages/PlaceOrder.module.css";
import { Store } from "../../utils/store";
import {
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import axios from "axios";
import { CheckOutWizard } from "../../components";
import {GiPencil} from 'react-icons/gi'
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { getError } from "../../utils/error";

const PlaceOrder = () => {
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems, shippingAddress, shippingMethod } 
  } = state;

  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);



  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const [shippingPrice, setShippingPrice] = useState(5);
  const totalPrice = round2(itemsPrice + shippingPrice);

  useEffect(() => {
    if (!shippingMethod) {
      router.push("/shippingmethod");
    }

    if (cartItems.length === 0) {
      router.push("/cart");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const placeOrderHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems,
          shippingAddress,
          shippingMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'CLEAR_CART' })
      Cookies.remove('cartItems')
      setLoading(false);
      router.push(`/order/${data._id}`)
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  return (
    <div className={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <CheckOutWizard activeStep={3} />
          <div className={styles.list_container}>
            <div className={styles.cart_title}>
              <h3>PLEASE CHECK YOUR ORDER BEFORE PAYMENT</h3>
            </div>
            <div>
              <div className={styles.address}>
                <h4>
                  ADDRESSES{" "}
                  <GiPencil
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/shippingaddress")}
                  />
                </h4>
                <div className={styles.address_container}>
                  <div className={styles.address_box}>
                    <div>
                      <h6>YOUR DELIVERY ADDRESS</h6>
                      <p>{shippingAddress.fullName}</p>
                      <p>{shippingAddress.address}</p>
                      <p>{shippingAddress.city}</p>
                      <p>{shippingAddress.state}</p>
                      <p>{shippingAddress.country}</p>
                      <p>{shippingAddress.postalcode}</p>
                      <p>{shippingAddress.phone}</p>
                    </div>
                  </div>
                  <div className={styles.address_box}>
                    <div>
                      <h6>YOUR INVOICE ADDRESS</h6>
                      <p>{shippingAddress.fullName}</p>
                      <p>{shippingAddress.address}</p>
                      <p>{shippingAddress.city}</p>
                      <p>{shippingAddress.state}</p>
                      <p>{shippingAddress.country}</p>
                      <p>{shippingAddress.postalcode}</p>
                      <p>{shippingAddress.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.payment_method}>
                <h4>
                  SHIPPING METHOD{" "}
                  <GiPencil
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/shippingmethod")}
                  />
                </h4>
                {shippingMethod === "DHL" ? (
                  <div>
                    <Image
                      src="/images/svgs/dhl.svg"
                      alt="ups_logo"
                      width={40}
                      height={40}
                    />
                    <h5>{shippingMethod}</h5>
                  </div>
                ) : (
                  <div>
                    <Image
                      src="/images/svgs/ups.svg"
                      alt="ups_logo"
                      width={40}
                      height={40}
                    />
                    <h5>{shippingMethod}</h5>
                  </div>
                )}
              </div>
              {/* </div> */}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ORDER ITEMS</TableCell>
                      <TableCell align="right">UNIT PRICE</TableCell>
                      <TableCell align="right">QUANTITY</TableCell>
                      <TableCell align="right">TOTAL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* <div> */}
                    {cartItems.map((item) => {
                      return (
                        <TableRow key={item._id}>
                          <TableCell>
                            <div className={styles.group}>
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
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            <span>${item.price}</span>
                          </TableCell>
                          <TableCell align="right">
                            <div className={styles.add_price}>
                              <span>{item.quantity}</span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            <div className={styles.add_price}>
                              <span>${item.price * item.quantity}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {/* </div> */}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={styles.totals}>
            <h4 style={{ marginBottom: 20 }}>Order summary</h4>
            <div className={styles.sub_total}>
              <div className={styles.sub_total_group}>
                <span className={styles.sub_total_text}>
                  {cartItems.reduce((a, c) => a + c.quantity, 0)} items
                </span>
                <span className={styles.sub_total_price}>${itemsPrice}</span>
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
                <span className={styles.sub_total_price}>$ {totalPrice}</span>
              </div>
            </div>
            <div className={styles.btns}>
              <button
                type="submit"
                className={styles.a_btn}
                onClick={placeOrderHandler}
              >
                Place order
              </button>
            </div>
            {loading && <CircularProgress />}
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
};;

// export default Cart

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
