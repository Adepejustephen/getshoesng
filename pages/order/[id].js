import { useContext, useEffect, useReducer, useState } from "react";
import dynamic from "next/dynamic";
// import Cookies from "js-cookie";
import Image from "next/image";
import styles from "../../styles/pages/Order.module.css";
import { Store } from "../../utils/store";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
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
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { getError } from "../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false, errorDeliver: action.payload };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
        errorDeliver: "",
      };
    default:
      state;
  }
}

const Order = ({ params }) => {
  const orderId = params.id
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const { state } = useContext(Store);
    const {
        userInfo
    } = state;

    const router = useRouter();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

const [
  { loading, error, order, successPay, loadingDeliver, successDeliver },
  dispatch,
] = useReducer(reducer, {
  loading: true,
  order: {},
  error: "",
});
const {
  shippingAddress,
  shippingMethod,
  orderItems,
  itemsPrice,
  // taxPrice,
  shippingPrice,
  totalPrice,
  isPaid,
  paidAt,
  isDelivered,
  deliveredAt,
} = order;

useEffect(() => {
  if (!userInfo) {
    return router.push("/auth/login");
  }
  const fetchOrder = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await axios.get(`/api/orders/${orderId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: getError(err) });
    }
  };
  if (
    !order._id ||
    successPay ||
    successDeliver ||
    (order._id && order._id !== orderId)
  ) {
    fetchOrder();
    if (successPay) {
      dispatch({ type: "PAY_RESET" });
    }
    if (successDeliver) {
      dispatch({ type: "DELIVER_RESET" });
    }
  } else {
    const loadPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/keys/paypal", {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": clientId,
          currency: "USD",
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    };
    loadPaypalScript();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [order, successPay, successDeliver]);
  

function createOrder(data, actions) {
  return actions.order
    .create({
      purchase_units: [
        {
          amount: { value: totalPrice },
        },
      ],
    })
    .then((orderID) => {
      return orderID;
    });
}
function onApprove(data, actions) {
  return actions.order.capture().then(async function (details) {
    try {
      dispatch({ type: "PAY_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/pay`,
        details,
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "PAY_SUCCESS", payload: data });
      enqueueSnackbar("Order is paid", { variant: "success" });
    } catch (err) {
      dispatch({ type: "PAY_FAIL", payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  });
}

function onError(err) {
  enqueueSnackbar(getError(err), { variant: "error" });
}

async function deliverOrderHandler() {
  try {
    dispatch({ type: "DELIVER_REQUEST" });
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      {
        headers: { authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: "DELIVER_SUCCESS", payload: data });
    enqueueSnackbar("Order is delivered", { variant: "success" });
  } catch (err) {
    dispatch({ type: "DELIVER_FAIL", payload: getError(err) });
    enqueueSnackbar(getError(err), { variant: "error" });
  }
}

  return (
    <div className={styles.container}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <span style={{ color: "[#f04040" }}>{error}</span>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <div className={styles.list_container}>
              <div className={styles.cart_title}>
                <h3>order {orderId} </h3>
              </div>
              <div>
                <div className={styles.address}>
                  <h4>ADDRESSES </h4>
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
                      <span>
                        Status:{" "}
                        {isDelivered
                          ? `delivered at ${deliveredAt}`
                          : "not delivered"}
                      </span>
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
                        <span>
                          Status: {isPaid ? `Paid at ${paidAt}` : "not paid"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.payment_method}>
                  <h4>SHIPPING METHOD</h4>
                  {shippingMethod === "dhl" ? (
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
                      {orderItems.map((item) => {
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
                    {orderItems.reduce((a, c) => a + c.quantity, 0)} items
                  </span>
                  <span className={styles.sub_total_price}>${itemsPrice}</span>
                </div>
                <div className={styles.sub_total_group}>
                  <span className={styles.sub_total_text}>Shipping</span>
                  <span className={styles.sub_total_price}>
                    ${orderItems.length < 1 ? "0" : shippingPrice}
                  </span>
                </div>
              </div>
              <div className={styles.sub_total}>
                <div className={styles.sub_total_group}>
                  <span className={styles.sub_total_text}>Total</span>
                  <span className={styles.sub_total_price}>$ {totalPrice}</span>
                </div>
              </div>
              <div className={styles.sub_total_group}>
                {isPending && (
                  <div>
                    {isPending ? (
                      <CircularProgress />
                    ) : (
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    )}
                  </div>
                )}
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
                <span>
                  Return policy (edit with Customer reassurance module)
                </span>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
