import { useRouter } from "next/router";
import Image from 'next/image'
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/pages/ShippingMethod.module.css";
import { Store } from "../../utils/store";
import Cookies from "js-cookie";
// import { Controller, useForm } from "react-hook-form";
import { CheckOutWizard } from "../../components";
import {
Grid

} from "@mui/material";




import { Totals } from "../../components";
import { useSnackbar } from "notistack";



const ShippingMethod = () => {
  const [shippingMethod, setShippingMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { 
    cart: { shippingAddress, cartItems },
  } = state;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();


  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shippingaddress");
    } else {
      setShippingMethod(Cookies.get("shippingMethod" || ""));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = (e) => {
    closeSnackbar();

    e.preventDefault();

    if (!shippingMethod) {
      enqueueSnackbar("Shipping method is required", { variant: "error" });
    } else {
      dispatch({
        type: "SAVE_SHIPPING_METHOD",
        payload:  shippingMethod
      });

        Cookies.set("shippingMethod", shippingMethod);
        router.push("/placeorder");
    }

    
  };



  return (
    <section className={styles.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <CheckOutWizard activeStep={2} />
          <div className={styles.form_container}>
            <form action="" className={styles.form} onSubmit={submitHandler}>
              <div className={styles.form_item}>
                <div className={styles.form_item_item}>
                  <label html-hfor="dhl">
                    <input
                      type="radio"
                      aria-label="DHL"
                      name="payment"
                      value={shippingMethod ? shippingMethod : "DHL"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                    <Image
                      src="/images/svgs/dhl.svg"
                      alt="dhl_logo"
                      width={40}
                      height={40}
                    />
                    <span>DHL</span>
                  </label>
                </div>
                <div className={styles.form_item_item}>
                  <label html-hfor="ups">
                    <input
                      type="radio"
                      aria-label="UPS"
                      name="payment"
                      value={shippingMethod ? shippingMethod : "UPS"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                    <Image
                      src="/images/svgs/ups.svg"
                      alt="ups_logo"
                      width={40}
                      height={40}
                    />
                    <span>UPS</span>
                  </label>
                </div>
              </div>
              <div className={styles.form_item}>
                <button type="submit">Continue</button>
              </div>
              <div className={styles.form_item}>
                <button onClick={() => router.push("/shippingaddress")}>
                  Back
                </button>
              </div>
            </form>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Totals cartItems={cartItems} />
          {/* <div className={styles.totals}>
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
              <NextLink href={"/shipping"} passHref>
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
          </div> */}
        </Grid>
      </Grid>
    </section>
  );
};

export default ShippingMethod;
