import { Grid, Card, CardContent } from "@mui/material";
import data from "../../utils/data";
import NextLink from "next/link";
import Image from "next/image";
import {BsCart2} from 'react-icons/bs'
import styles from "../../styles/pages/Products.module.css";

const Products = () => {

  // const menuItems = [...new Set(data.map((Val) => Val.category))];

  // const filterItem = (curcat) => {
  //   const newItem = Data.filter((newVal) => {
  //     return newVal.category === curcat;
  //     // comparing category for displaying data
  //   });
  //   setItem(newItem);
  // };


  return (
    <div className={styles.container}>
      <Grid container>
        <Grid item xs={12} md={3}>
          <p>hello</p>
        </Grid>
        <Grid item xs={12} md={9}>
          <div className={styles.products_container}>
            {data.products.map((item, id) => {
              return (
                <div className={styles.product_wrapper} key={id}>
                  <Card elevation={0} variant="outlined">
                    <div className={styles.image_container}>
                      <Image
                        src={item.image[0]}
                        alt={item.name}
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center"
                      />
                      <div className={styles.cart_icon_container}>
                        <BsCart2 className={styles.cart_icon} />
                      </div>
                    </div>
                    <CardContent>
                      <div>
                        <NextLink href={"/"} passHref>
                          <a>
                            <p className={styles.product_name}>{item.name}</p>
                          </a>
                        </NextLink>
                        <h3 className={styles.product_price}>{item.price}</h3>
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

export default Products;
