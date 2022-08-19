import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import NextLink from 'next/link';
import axios from "axios";
import { useContext, useEffect, useReducer } from 'react'
import { Store } from '../../utils/store';
import styles from '../../styles/pages/OrderHistory.module.css';
import { getError } from "../../utils/error";
import {
  CircularProgress,

} from "@mui/material";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const OrderHistory = () => {

    const { state } = useContext(Store)
    const { userInfo } = state
    const router = useRouter()

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
      loading: true,
      orders: [],
      error: "",
    });

    useEffect(() => {
      if (!userInfo) {
        router.push("/login");
      }
      const fetchOrders = async () => {
        try {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(`/api/orders/history`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        }
      };
      fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <div className={styles.orderHistory__container}>
      <main className={styles.main__content}>
        <div className={styles.title}>
          <h4>Order history</h4>
          <p>
            Here are the orders you&apos;ve placed since your account was
            created.
          </p>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className={styles.order__mobile}>{error}</div>
            <div className={styles.order__desktop}>
              <table className={styles.table}>
                <thead className={styles.table__header}>
                  <tr className={styles.table__headerRow}>
                    <th className={styles.table__headData}>Order Id</th>
                    <th className={styles.table__headData}>Date</th>
                    <th className={styles.table__headData}>Total</th>
                    <th className={styles.table__headData}>Paid</th>
                    <th className={styles.table__headData}>Delivered</th>
                    <th className={styles.table__headData}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    return (
                      <tr className={styles.table__bodyRow} key={order._id}>
                        <td className={styles.table__bodyData}>
                          {order._id.substring(18, 24)}
                        </td>
                        <td className={styles.table__bodyData}>
                          {order.createdAt}
                        </td>
                        <td className={styles.table__bodyData}>
                          $ {order.totalPrice}
                        </td>
                        <td className={styles.table__bodyData}>
                          {order.isPaid
                            ? `Paid at ${order.paidAt}`
                            : "Not paid"}
                        </td>
                        <td className={styles.table__bodyData}>
                          {order.isDelivered
                            ? `Devlivered at ${order.deliveredAt}`
                            : "Not delivered"}
                        </td>
                        <td className={styles.table__bodyData}>
                          <NextLink passHref href={`/order/${order._id}`}>
                            <button className={styles.btn} type="button">
                              details
                            </button>
                          </NextLink>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
        <div className={styles.bottom}>
          <NextLink passHref href={"/my-account"}>
            <a>Back to your account</a>
          </NextLink>
          <NextLink passHref href={"/"}>
            <a>Home</a>
          </NextLink>
        </div>
      </main>
    </div>
  );
}

export default dynamic(()=> Promise.resolve(OrderHistory) , {ssr: false})