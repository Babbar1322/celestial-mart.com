import { FC } from 'react';
import { useCart } from 'react-use-cart';

import Container from '@/components/Container';
import Typography from '@/components/Typography';
import CartItem from '@/components/CartItem';
import RouterLink from '@/components/RouterLink';

const CartPage: FC = () => {
    const { items, isEmpty, totalItems, cartTotal } = useCart();

    const cartItems = items.map((item) => (
        <CartItem id={item.id} image={item.image} key={item.id.toString()} price={item.price} name={item.name} />
    ));

    return (
        <Container>
            <div className="page-title mb-5">
                <Typography fontSize={1} center fontWeight="bold" color="white">
                    Cart
                </Typography>
                <Typography center fontWeight="medium" color="white" marginBottom={isEmpty ? undefined : '5'}>
                    Your selected Items to purchase
                </Typography>

                {!isEmpty && <Typography fontSize={5} center fontWeight="bold" color="white">
                    Total Items: {totalItems}
                </Typography>}
            </div>

            {isEmpty ? (
                <Typography fontWeight='medium' fontSize={4} center>Your Cart is Empty</Typography>
            ) : cartItems}
            
                <div className='d-flex justify-content-end gap-3'>
                    <RouterLink to='/shop' button className='w-100 w-md-25' marginRight="3">Continue Shopping</RouterLink>
                    {!isEmpty && (<RouterLink to='/checkout' button className='w-100 w-md-25' buttonVariant='outline'>Checkout ${cartTotal.toFixed(2)}</RouterLink>)}
                </div>
        </Container>
    );
};

export default CartPage;
