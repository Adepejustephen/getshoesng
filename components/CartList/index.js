import { useContext } from 'react'
import Image from 'next/image'
import styles from '../../styles/components/Cart.module.css'
import { Store } from '../../utils/store'
import {Grid} from '@mui/material'



const CartList = () => {

    const { state } = useContext(Store)
    const {cart:{cartItems}} = state
    
  return (
      <div className={styles.container} >
          {cartItems.length === 0 ? <div>cart is empty</div> : <div>
              <ul>
                  {cartItems.map(item => {
                      return (
                        <li key={item._id}>
                          <Grid container>
                            <Grid item xs={3}>
                              <div className={styles.image_container}>
                                <Image
                                  src={item.image[0]}
                                  alt={item.name}
                                  layout="fill"
                                  objectFit="contain"
                                  objectPosition="center"
                                  priority
                                />
                              </div>
                            </Grid>
                            <Grid item xs={9}>
                              <div className={styles.item_text}>
                                <span className={styles.item_name}>
                                  {item.name}
                                </span>
                                <span className={styles.item_price}>
                                  ${item.price}
                                </span>
                              </div>
                              <div className={styles.counter}>
                                
                              </div>
                            </Grid>
                          </Grid>
                        </li>
                      );
                  })}
                  
              </ul>
          </div>}
    </div>
  )
}

export default CartList