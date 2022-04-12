import { useContext } from "react";
import Image from "next/image";
import axios from "axios";
import Product from "../../../models/Product";
import db from "../../../utils/db";
import { Grid } from "@mui/material";
import { Store } from "../../../utils/store";

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
    <div>
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
            <h2>{product.name}</h2>
            <p>{product.desc}</p>

            <button
              onClick={() => addToCartHandler(product)}
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
