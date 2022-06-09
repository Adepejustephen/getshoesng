import { useContext, useState } from "react";
import Head from "next/head";
import {useRouter} from 'next/router'
// import Image from "next/image";
import NextLink from "next/link";
import styles from "../styles/Home.module.css";
import Product from "../models/Product";
import db from "../utils/db";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { Store } from "../utils/store";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductWrapper from "../components/Product";
import { SubScription, AddCartModal } from "../components";

export default function Home(props) {
  const { products } = props;
  const { state, dispatch } = useContext(Store);
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const trendingProducts = products.filter(
    (newProducts) => newProducts.status === "Trending"
  );

  const filterNewProducts = products.filter(
    (newProducts) => newProducts.status === "New Products"
  );

  // const [newProducts, setNewProducts] = useState("");

  const addToCartHandler = async (product) => {
    setLoading(true)
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
setLoading(false)
    setOpenModal(true);
   
  };

  const onProceed = () => {
    router.push('/cart')
    setOpenModal(!openModal);
  }
  return (
    <>
      <Head>
        <title>MENSHOESNG</title>
        <meta
          name="description"
          content="The number one mean place for men shoes in Nigeria"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        {openModal ? (
          <AddCartModal
            onClose={() => {
              setOpenModal(!openModal);
            }}
            onProceed={onProceed}

          />
        ) : null}

        <div className={styles.main}>
          <section>
            <div className={styles.title}>
              <h4>Trending This Week</h4>
            </div>
            <Swiper
              breakpoints={{
                640: { slidesPerView: 3 },
                320: { slidesPerView: 1 },
              }}
              spaceBetween={30}
              loop={true}
            >
              {trendingProducts.map((product) => (
                <SwiperSlide key={product._id}>
                  <ProductWrapper
                    product={product}
                    handleClick={addToCartHandler}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
          <NextLink href={"/products"} passHref>
            <a className={styles.link_all_products}>
              <BiPlus className={styles.link_all_products_icon} />
              <span>See all products</span>
            </a>
          </NextLink>

          <section className={styles.new_products}>
            <div className={styles.title}>
              <h4>New Products</h4>
            </div>
            <div className={styles.products_container}>
              {filterNewProducts.map((product) => (
                <ProductWrapper
                  product={product}
                  handleClick={addToCartHandler}
                  key={product._id}
                  loading={loading}
                  className={styles.product_wrapper}
                />
              ))}
            </div>
          </section>
          <SubScription />
        </div>
      </div>
    </>
  );
}

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
