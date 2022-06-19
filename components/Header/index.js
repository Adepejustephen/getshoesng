import { useContext, useState } from "react";
import Cookies from "js-cookie";
import NextLink from "next/link";
import Carousel from "../Carousel";
import styles from "../../styles/components/Header.module.css";
import menus from "./menus";
import { BsCart2 } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
// import { BiMenu } from "react-icons/bi";
import { TiLockClosed } from "react-icons/ti";
import { HiOutlineUser } from "react-icons/hi";
import { MdExitToApp } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { Card } from "@mui/material";
import { Store } from "../../utils/store";

import { useRouter } from "next/router";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -2,
    top: -1,
    color: "#fff",
    fontSize: "12px",
    lineHeight: "12px",
    // border: `2px solid ${theme.palette.background.paper}`,
    padding: "2px",
    backgroundColor: "#d92e28",
    cursor: "pointer",
    height: "16px",
    minWidth: "16px",
    borderRadius: "50%",
  },
}));

const Header = () => {

  const { state ,dispatch} = useContext(Store);
  const { cart, userInfo } = state;
  const router = useRouter()

  const [openMenu, setOpenMenu] = useState(false)

  const logOutHandler = () => {
    dispatch({ type: 'LOGOUT_USER' })
    Cookies.remove("userInfo");
    Cookies.remove('cartItems');
    router.push('/')
    
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav_container}>
        <div className={styles.group}>
          <div className={styles.title}>
            <NextLink href={"/"} passHref>
              <a>
                <h2>
                  MENSHOESNG <span>.</span>
                </h2>
              </a>
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

        <div
          className={styles.handburger}
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? <FaTimes /> : <AiOutlineMenu />}
        </div>

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
                      {userInfo ? (
                        <NextLink href={"/my-account"} passHref>
                          <a>
                            <BiUserCircle className={styles.user_menu_icon} />
                            <span>{userInfo.name}</span>
                          </a>
                        </NextLink>
                      ) : null}
                    </li>
                    <li className={styles.user_menu_list_item}>
                      {userInfo ? (
                        <span onClick={logOutHandler}>
                          <BiUserCircle className={styles.user_menu_icon} />
                          <span>Sign out</span>
                        </span>
                      ) : (
                        <NextLink href={"/auth/login"} passHref>
                          <a>
                            <TiLockClosed className={styles.user_menu_icon} />
                            <span>Sign in</span>
                          </a>
                        </NextLink>
                      )}
                    </li>
                    <li className={styles.user_menu_list_item}>
                      <NextLink href={"/my-account"} passHref>
                        <a>
                          <HiOutlineUser className={styles.user_menu_icon} />
                          <span>My account</span>
                        </a>
                      </NextLink>
                    </li>
                    {/* <li className={styles.user_menu_list_item}>
                      <NextLink href={"/cart"} passHref>
                        <a>
                          <BsCart2 className={styles.user_menu_icon} />
                          <span>Cart items</span>
                        </a>
                      </NextLink>
                    </li> */}
                    <li className={styles.user_menu_list_item}>
                      <NextLink href={"/cart"} passHref>
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
              <NextLink href={"/cart"} passHref>
                <StyledBadge
                  badgeContent={
                    cart.cartItems.length < 1 ? 0 : cart.cartItems.length
                  }
                >
                  <BsCart2 className={styles.icon} />
                </StyledBadge>
              </NextLink>
            </div>

            {/* <SearchOffOutlined/> */}
          </div>
        </div>
      </nav>
      {router.pathname === "/" && <Carousel /> }
    </header>
  );
};

export default Header;
