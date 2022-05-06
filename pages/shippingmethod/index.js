import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/pages/Shipping.module.css";
import { Store } from "../../utils/store";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { CheckOutWizard } from "../../components";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FaDhl } from "react-icons/fa";

import { Totals } from "../../components";
import { useSnackbar } from "notistack";

const ShippingMethod = () => {
  const [shippingMethod, setShippingMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, cartItems },
  } = state;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();
  // const { redirect } = router.query;

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
        payload: { shippingMethod },
      });

        Cookies.set("shippingAddress", shippingMethod);
        router.push("/");
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
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="Payment Method"
                    name="paymentMethod"
                    value={ShippingMethod}
                    onChange={(e) => setShippingMethod(e.target.value)}
                  >
                    <FormControlLabel
                      label="PayPal"
                      value="PayPal"
                      control={<Radio />}
                    ></FormControlLabel>
                    <FormControlLabel
                      label="Stripe"
                      value="Stripe"
                      control={<Radio />}
                    ></FormControlLabel>
                    <FormControlLabel
                      label="Cash"
                      value="Cash"
                      control={<Radio />}
                    ></FormControlLabel>
                  </RadioGroup>
                </FormControl>
                {/* <input type="radio" aria-label="dhl" value={shippingMethod} onChange={ (e) => setShippingMethod(e.target.value)}/>
                <label htmlFor="Full Name"><FaDhl/><span>DHL</span></label> */}
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
