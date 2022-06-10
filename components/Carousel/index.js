// import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
// import { Grid } from "@mui/material";
import {useRouter} from 'next/router'
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Image from "next/image";
import styles from '../../styles/components/Carousel.module.css'
import data from "./data";

const Carousel = () => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.icons_container}>
        <div className={styles.arrow_container}>
          <AiOutlineLeft />
        </div>
        <div className={styles.arrow_container}>
          <AiOutlineRight />
        </div>
      </div>
      <div className={styles.slider_container}>
        {data.map((item, id) => {
          return (
            <div key={id} className={styles.slide}>
              <div className={styles.group}>
                <div className={styles.info_wrapper}>
                  <div className={styles.info}>
                    <span>Get</span>
                    <h2>{item.name}</h2>
                    <span className={styles.price}>
                      <span>as low as</span> $10
                    </span>
                    <button onClick={() => router.push('/products')} className={styles.btn}>Shop now</button>
                  </div>
                </div>
              </div>
              <div className={styles.group}>
                <div className={styles.image_wrapper}>
                  {/* <img src={item.image} alt='carousel-images' /> */}
                  <Image
                    // sizes="50vw"
                    // width={400}
                    // height={400}
                    src={item.image}
                    alt="carousel-images"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className={styles.image}
                    lazyLoading
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
