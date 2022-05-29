import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import axios from "axios";
import { useContext, useEffect, useReducer } from 'react'
import { Store } from '../../utils/store'

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
    <div>OrderHistory</div>
  )
}

export default dynamic(()=> Promise.resolve(OrderHistory) , {ssr: false})