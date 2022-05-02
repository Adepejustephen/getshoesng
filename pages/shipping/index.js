import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { Store } from '../../utils/store';

const Shipping = () => {
    const router = useRouter();
     const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

     useEffect(() => {
       if (!userInfo) {
         router.push("/auth/login?redirect=/shipping");
       }
      //  setValue("fullName", shippingAddress.fullName);
      //  setValue("address", shippingAddress.address);
      //  setValue("city", shippingAddress.city);
      //  setValue("postalCode", shippingAddress.postalCode);
      //  setValue("country", shippingAddress.country);
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);
    
    

  return (
    <div>Shipping</div>
  )
}

export default Shipping