import { useContext } from "react";
import NextLink from "next/link";
import Carousel from "../Carousel";
import styles from "../../styles/components/Header.module.css";
import menus from "./menus";
import { BsCart2 } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { TiLockClosed } from "react-icons/ti";
import { HiOutlineUser } from "react-icons/hi";
import { MdExitToApp } from "react-icons/md";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { Card } from "@mui/material";
import { Store } from "../../utils/store";
import CartList from '../CartList'

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -2,
    top: -1,
    color: "#fff",
    fontSize: "12px",
    lineHeight: "12px",
    // border: `2px solid ${theme.palette.background.paper}`,
    padding: "2px",
    backgroundColor: "coral",
    cursor: "pointer",
    height: "16px",
    minWidth: "16px",
    borderRadius: "50%",
  },
}));

const Header = () => {

  const { state} = useContext(Store);
  const { cart } = state;

  return (
    <header className={styles.header}>
      <nav className={styles.nav_container}>
        <div className={styles.group}>
          <div className={styles.title}>
            <NextLink href={"/"} passHref>
              <h2>
                GETSHOESNG <span>.</span>
              </h2>
            </NextLink>
          </div>
          <ul className={styles.links}>
            {menus.map((item, id) => {
              return (
                <li key={id} className={styles.links_item}>
                  <NextLink href={item.link} passHref>
                    <a>{item.name}</a>
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </div>
        {/* <div className={styles.group}>
          
        </div> */}
        <div className={styles.group}>
          <div className={styles.icons}>
            <div className={styles.icon_container}>
              <IoSearchOutline className={styles.icon} />
            </div>
            <div className={styles.icon_container}>
              <AiOutlineUser className={styles.icon} />
              <div className={styles.user_menu}>
                <Card variant="outlined">
                  <ul className={styles.user_menu_list}>
                    <li className={styles.user_menu_list_item}>
                      <NextLink href={"/auth/sigin-in"} passHref>
                        <a>
                          <TiLockClosed className={styles.user_menu_icon} />
                          <span>Sign in</span>
                        </a>
                      </NextLink>
                    </li>
                    <li className={styles.user_menu_list_item}>
                      <NextLink href={"/account"} passHref>
                        <a>
                          <HiOutlineUser className={styles.user_menu_icon} />
                          <span>My account</span>
                        </a>
                      </NextLink>
                    </li>
                    <li className={styles.user_menu_list_item}>
                      <NextLink href={"/cart"} passHref>
                        <a>
                          <BsCart2 className={styles.user_menu_icon} />
                          <span>Cart items</span>
                        </a>
                      </NextLink>
                    </li>
                    <li className={styles.user_menu_list_item}>
                      <NextLink href={"/checkout"} passHref>
                        <a>
                          <MdExitToApp className={styles.user_menu_icon} />
                          <span>Check out</span>
                        </a>
                      </NextLink>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
            <div className={styles.icon_container}>
              <StyledBadge
                badgeContent={
                  cart.cartItems.length < 1 ? "0" : cart.cartItems.length
                }
              >
                <BsCart2 className={styles.icon} />
                <div className={styles.cart_display}>
                  <CartList />
                </div>
              </StyledBadge>
            </div>

            {/* <SearchOffOutlined/> */}
          </div>
        </div>
      </nav>

      <Carousel />
    </header>
  );
};

export default Header;
