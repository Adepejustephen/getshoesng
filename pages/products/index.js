import { useContext, useState } from "react";
import { Grid } from "@mui/material";
import styles from "../../styles/pages/Products.module.css";
import db from "../../utils/db";
import Product from "../../models/Product";
import axios from "axios";
import { Store } from "../../utils/store";
import ProductWrapper from "../../components/Product";

const Products = (props) => {
  const { products } = props;
  const { state, dispatch } = useContext(Store);

  const allCategories = ["All", ...new Set(products.map((item) => item.category))];
  const [newProducts, setNewProducts] = useState(products);
  const [buttons, setButtons] = useState(allCategories);


   const filter = (button) => {
     if (button === "All") {
       setNewProducts(products);
       return;
     }

     const filteredData = products.filter((item) => item.category === button);
     setNewProducts(filteredData);
     
   };

  // const filterItem = (curcat) => {
  //   const newItem = Data.filter((newVal) => {
  //     return newVal.category === curcat;
  //     // comparing category for displaying data
  //   });
  //   setItem(newItem);
  // };

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
    }

    dispatch({
      type: "ADD_TO_CART_ITEMS",
      payload: { ...product, quantity },
    });
  };

  return (
    <div className={styles.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <div className={styles.buttons}>
            {buttons.map((cat, i) => {
              return (
                <button
                  type="button"
                  onClick={() => filter(cat)}
                  className={styles.btn}
                  key={i}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <div className={styles.products_container}>
            {newProducts.map((product) => (
              <ProductWrapper
                product={product}
                handleClick={addToCartHandler}
                key={product._id}
              />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export async function getServerSideProps() {
  await db.connect();

  const products = await Product.find({}).lean();

  await db.disconnect();

  return {
    props: {
      products: products.map(db.converDocToObj),
    },
  };
}

export default Products;
