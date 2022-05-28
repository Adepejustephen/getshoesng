// import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Image from "next/image";
import styles from '../../styles/components/Carousel.module.css'
import data from "./data";

const Carousel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.slider_container}>
        <div className={styles.icons_container}>
          <div className={styles.arrow_container}>
            <AiOutlineLeft />
          </div>
          <div className={styles.arrow_container}>
            <AiOutlineRight />
          </div>
        </div>
        {data.map((item, id) => {
          return (
            <div key={id} className={styles.slide}>
              <div className={styles.group}>
                <div className={styles.info_wrapper}>
                  <span>{item.name}</span>
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
