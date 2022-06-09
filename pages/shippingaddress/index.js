
import { useRouter } from "next/router";
import { useContext, useEffect} from "react";
import styles from "../../styles/pages/Shipping.module.css";
import { Store } from "../../utils/store";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { CheckOutWizard } from "../../components";
import { Grid } from "@mui/material";

import { Totals } from "../../components";


const ShippingAddress = () => {
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, cartItems },
  } = state;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();
  // const { redirect } = router.query;

  useEffect(() => {
    if (!userInfo) {
      router.push("/auth/login?redirect=/shippingaddress");
    }
    setValue("fullName", shippingAddress.fullName);
    setValue("email", shippingAddress.email);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("state", shippingAddress.state);
    setValue("country", shippingAddress.country);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("phone", shippingAddress.phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = ({
    fullName,
    email,
    address,
    city,
    state,
    country,
    postalCode,
    phone,
  }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        email,
        address,
        city,
        state,
        country,
        postalCode,
        phone,
      },
    });

    Cookies.set("shippingAddress", JSON.stringify({
      fullName,
      email,
      address,
      city,
      state,
      country,
      postalCode,
      phone,
    }));

    router.push("/shippingmethod");
  };
  return (
    <section className={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <CheckOutWizard activeStep={1} />
          <div className={styles.form_container}>
            <form
              action=""
              className={styles.form}
              onSubmit={handleSubmit(submitHandler)}
            >
              <div className={styles.form_item}>
                <span>
                  The selected address will be used both as your personal
                  address (for invoice) and as your delivery address.
                </span>
              </div>
              <div className={styles.form_item}>
                <label htmlFor="Full Name">Full Name</label>
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Full name"
                      value={userInfo ? userInfo.name : ""}
                      control={control}
                      inputProps={{ type: "type" }}
                      error={Boolean(errors.name)}
                      {...field}
                    />
                  )}
                ></Controller>
                {errors.name ? (
                  errors.name.type === "required" ? (
                    <span style={{ color: "red", fontSize: 12 }}>
                      Full name is required
                    </span>
                  ) : (
                    <span style={{ color: "red", fontSize: 12 }}>
                      Full name is required
                    </span>
                  )
                ) : (
                  ""
                )}
              </div>
              <div className={styles.form_item}>
                <label htmlFor="email">Email</label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={userInfo ? userInfo.email : ""}
                      control={control}
                      inputProps={{ type: "email" }}
                      error={Boolean(errors.email)}
                      {...field}
                    />
                  )}
                ></Controller>
                {errors.email ? (
                  errors.email.type === "pattern" ? (
                    <span style={{ color: "red", fontSize: 12 }}>
                      Email is not valid
                    </span>
                  ) : (
                    <span style={{ color: "red", fontSize: 12 }}>
                      Email is required
                    </span>
                  )
                ) : (
                  ""
                )}
              </div>
              <div className={styles.form_item}>
                <label htmlFor="password">Address</label>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Address"
                      error={Boolean(errors.address)}
                      {...field}
                    />
                  )}
                ></Controller>
                {errors.address ? (
                  errors.address.type === "required" ? (
                    <span style={{ color: "red", fontSize: 12 }}>
                      Address is required
                    </span>
                  ) : (
                    <span style={{ color: "red", fontSize: 12 }}>
                      Address is required
                    </span>
                  )
                ) : (
                  ""
                )}
              </div>
              <div className={styles.form_item}>
                <label htmlFor="city"> City</label>
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="City"
                      error={Boolean(errors.city)}
                      {...field}
                    />
                  )}
                ></Controller>
                {errors.city ? (
                  errors.city.type === "required" ? (
                    <span style={{ color: "red", fontSize: 12 }}>
                      Country is required
                    </span>
                  ) : (
                    <span style={{ color: "red", fontSize: 12 }}>
                      Country is required
                    </span>
                  )
                ) : (
                  ""
                )}
              </div>
              <div className={styles.form_item}>
                <label htmlFor="state"> State</label>
                <Controller
                  name="state"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder=" State"
                      error={Boolean(errors.state)}
                      {...field}
                    />
                  )}
                ></Controller>
                {errors.state ? (
                  errors.state.type === "required" ? (
                    <span style={{ color: "red", fontSize: 12 }}>
                      State is required
                    </span>
                  ) : (
                    <span style={{ color: "red", fontSize: 12 }}>
                      State is required
                    </span>
                  )
                ) : (
                  ""
                )}
              </div>
              <div className={styles.form_item}>
                <label htmlFor="country"> Country</label>
                <Controller
                  name="country"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder=" Country"
                      error={Boolean(errors.country)}
                      {...field}
                    />
                  )}
                ></Controller>
                {errors.country ? (
                  errors.country.type === "required" ? (
                    <span style={{ color: "red", fontSize: 12 }}>
                      Country is required
                    </span>
                  ) : (
                    <span style={{ color: "red", fontSize: 12 }}>
                      Country is required
                    </span>
                  )
                ) : (
                  ""
                )}
              </div>
              <div className={styles.form_item}>
                <label htmlFor="postal code"> Postal Code</label>
                <Controller
                  name="postalCode"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <input
                      type="tel"
                      placeholder=" postal code"
                      error={Boolean(errors.postalCode)}
                      {...field}
                    />
                  )}
                ></Controller>
                {errors.postalCode ? (
                  errors.postalCode.type === "minLength" ? (
                    <span style={{ color: "red", fontSize: 12 }}>
                      min of six required
                    </span>
                  ) : (
                    <span style={{ color: "red", fontSize: 12 }}>
                      postal code is required
                    </span>
                  )
                ) : (
                  ""
                )}
              </div>
              <div className={styles.form_item}>
                <label htmlFor="phone"> Phone number</label>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 9,
                  }}
                  render={({ field }) => (
                    <input
                      type="tel"
                      placeholder=" phone"
                      error={Boolean(errors.phone)}
                      {...field}
                    />
                  )}
                ></Controller>
                {errors.phone ? (
                  errors.phone.type === "minLength" ? (
                    <span style={{ color: "red", fontSize: 12 }}>
                      phone number is invalid
                    </span>
                  ) : (
                    <span style={{ color: "red", fontSize: 12 }}>
                      phone number is required
                    </span>
                  )
                ) : (
                  ""
                )}
              </div>
              <div className={styles.form_item}>
                <button type="submit">Continue</button>
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

export default ShippingAddress;
