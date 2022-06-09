import React from 'react'
import NextLink from 'next/link'
import styles from '../../styles/components/Product.module.css'
import { Card, CardContent } from '@mui/material'
import Image from 'next/image'
import { BsCart2 } from "react-icons/bs";
import {
  CircularProgress,
} from "@mui/material";
// import { BiPlus } from "react-icons/bi";

const ProductWrapper = ({ handleClick, product, loading}) => {
  return (
    <div key={product._id} className={styles.product_wrapper}>
      <Card elevation={0} variant="outlined">
        <div className={styles.image_container}>
          <Image
            src={product.image[0]}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </div>
        <CardContent>
          <div className={styles.product_info}>
            <NextLink href={`/products/product/${product.slug}`} passHref>
              <a>
                <p className={styles.product_name}>{product.name}</p>
              </a>
            </NextLink>
            <div className={styles.cart_icon_container}>
              {loading ? (
                <CircularProgress />
              ) : (
                <BsCart2
                  className={styles.cart_icon}
                  onClick={() => handleClick(product)}
                />
              )}
            </div>

            <h3 className={styles.product_price}>${product.price}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductWrapper