import React from 'react'
import styles from './Modal.module.css'
import { BsFillPatchCheckFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";

const AddCartModal = ({onClose, onProceed}) => {

    // router = useRouter()

    // const handleProceed = () => {
    //     router.push("/cart");
    //     setOpen(!openModal)
    // }
  return (
    <div className={styles.addcart}>
      <div className={styles.text}>
        <BsFillPatchCheckFill
          style={{
            color: "green",
            fontSize: "160px",
          }}
        />
        <p>Product successfully added to your shopping cart</p>
      </div>
      <div className={styles.btns}>
        <button onClick={onClose}>CONTINUE SHOPPING</button>
        <button onClick={onProceed}>
          {" "}
          <AiOutlineCheck
            style={{
             marginRight: '10px',
            }}
          />
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
}

export default AddCartModal