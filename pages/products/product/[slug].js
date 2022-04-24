import { useContext } from "react";
import NextLink from 'next/link'
import Image from "next/image";
import axios from "axios";
import Product from "../../../models/Product";
import db from "../../../utils/db";
import { Grid } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
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
      <NextLink href={"/products"} passHref>
        <a className={styles.return_link}>
          <BiArrowBack />
          <span>return to products</span>
        </a>
      </NextLink>
      <Grid container>
        <Grid item xs={12} md={6}>
          <div className={styles.image_container}>
            <Image
              src={product.image[0]}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.product_info}>
            <div>
              <h2 className={styles.product_title}>{product.name}</h2>
              <p className={styles.product_desc}>{product.desc}</p>
            </div>
            <div className={styles.box_container}>
              <ul className={styles.box_list}>
                <li className={styles.box_list_item}>
                  <span className={styles.box_item_title}>Price</span>
                  <span className={styles.box_item_sub_text}>
                    ${product.price}
                  </span>
                </li>
                <li className={styles.box_list_item}>
                  <span className={styles.box_item_title}>Available Color</span>
                  <span className={styles.box_item_sub_text}>
                    {product.color}
                  </span>
                </li>
                <li className={styles.box_list_item}>
                  <span className={styles.box_item_title}>Reviews</span>
                  <span className={styles.box_item_sub_text}>
                    {product.numReviews} reviews
                  </span>
                </li>
                <li className={styles.box_list_item}>
                  <span className={styles.box_item_title}>Quantity</span>
                  <select value={product.countInStcock}>
                    {[...Array(product.countInStcock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
              <button
                onClick={() => addToCartHandler(product)}
                className={styles.add_cart_btn}
              >
                ADD TO CART
              </button>
            </div>
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
