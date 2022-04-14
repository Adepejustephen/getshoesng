import { useContext } from "react";
import { Grid, Card, CardContent } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import {BsCart2} from 'react-icons/bs'
import styles from "../../styles/pages/Products.module.css";
import db from '../../utils/db'
import Product from '../../models/Product'
import axios from "axios";
import {Store} from '../../utils/store'


const Products = (props) => {

  const { products } = props
  const { dispatch } = useContext(Store)

  // const menuItems = [...new Set(data.map((Val) => Val.category))];

  // const filterItem = (curcat) => {
  //   const newItem = Data.filter((newVal) => {
  //     return newVal.category === curcat;
  //     // comparing category for displaying data
  //   });
  //   setItem(newItem);
  // };

  const addToCartHandler = async (product) => {
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
        <Grid item xs={12} md={3}>
          <p>hello</p>
        </Grid>
        <Grid item xs={12} md={9}>
          <div className={styles.products_container}>
            {products.map((product) => {
              return (
                <div className={styles.product_wrapper} key={product._id}>
                  <Card elevation={0} variant="outlined">
                    <div className={styles.image_container}>
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center"
                        priority
                        loading="eager"
                      />
                      <div className={styles.cart_icon_container}>
                        <BsCart2
                          className={styles.cart_icon}
                          onClick={() => addToCartHandler(product)}
                        />
                      </div>
                    </div>
                    <CardContent>
                      <div>
                        <NextLink
                          href={`/products/product/${product.slug}`}
                          passHref
                        >
                          <a>
                            <p className={styles.product_name}>
                              {product.name}
                            </p>
                          </a>
                        </NextLink>
                        <h3 className={styles.product_price}>
                          ${product.price}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export async function getServerSideProps() {
  await db.connect()

  
  const products = await Product.find({}).lean()


  await db.disconnect()

  return {
    props: {
      products: products.map(db.converDocToObj),
    },
  }
 }

export default Products;
