import { useContext } from "react";
import Image from "next/image";
import axios from "axios";
import Product from "../../../models/Product";
import db from "../../../utils/db";
import { Grid } from "@mui/material";
import { Store } from "../../../utils/store";
import styles from '../../../styles/pages/Product.module.css'

const ProductScreen = (props) => {

  const { product } = props;

  const {dispatch} = useContext(Store)

  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock <= 0) {
      window.alert("Sorry. Product is out of stock");
    }

    dispatch({
      type: "ADD_TO_CART_ITEMS",
      payload: { ...product, quantity: 1 },
    });
  };

  return (
    <div className={styles.container}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Image
            width="400"
            height="400"
            src={product.image[0]}
            alt={product.name}
            layout="responsive"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <div>
              <h2>{product.name}</h2>
              <p>{product.desc}</p>
            </div>
            <div className={styles.box_container}>
              <ul>
                <li className={styles.box_list_item}>
                  <span>Price</span>
                  <span>${product.price}</span>
                </li>
                <li className={styles.box_list_item}>
                  <span>Available Color</span>
                  <span>{product.color}</span>
                </li>
                <li className={styles.box_list_item}>
                  <span>Reviews</span>
                  <span>{product.numReviews} reviews</span>
                </li>
                <li className={styles.box_list_item}>
                  <span>Quantity</span>
                  <select name="count in stock">
                    {[...Array(product.countInStcock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
            </div>

            <button
              onClick={() => addToCartHandler(product)}
              className={styles.add_cart_btn}
            >
              ADD TO CART
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();

  const product = await Product.findOne({ slug }).lean();

  await db.disconnect();

  return {
    props: {
      product: db.converDocToObj(product),
    },
  };
}

export default ProductScreen;
