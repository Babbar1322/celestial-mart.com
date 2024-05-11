import { FC, JSX, memo, useState } from 'react';
import { useCart } from 'react-use-cart';


import Typography from './Typography';
import Button from './Button';
import RemixIcon from './RemixIcon';
import QuantityController from './QuantityController';

interface CartItemProps {
    id: string;
    discount?: string;
    image?: string;
    inStock?: boolean;
    name?: string;
    price: number;
    realPrice?: number;
}

const CartItem: FC<CartItemProps> = memo((product): JSX.Element => {
    const { id, image, price, name } = product;

    const { addItem, inCart, updateItemQuantity, removeItem, getItem } = useCart();
    const item = getItem(id);
    const [quantity, setQuantity] = useState<number>(item.quantity);

    const addInCart = (qty?: number) => {
        if (inCart(id)) {
            updateItemQuantity(id, qty ?? quantity);
        } else {
            addItem(product, qty ?? quantity);
        }
    };

    const removeFromCart = () => {
        if (inCart(id)) {
            setQuantity(1);
            removeItem(id);
        }
    };

    const handleQuantity = (qty: number) => {
        if(inCart(id)) addInCart(qty);
        setQuantity(qty);
    }
    return (
        <div className="card rounded-4 position-relative overflow-hidden mb-3">
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-3 col-md-2">
                        <img src={image} alt="" className="w-75 image-square" />
                    </div>
                    <div className="col">
                        <div className="row align-items-center">
                            <div className="col-md-7 col-lg-8">
                                <Typography fontSize={4} fontWeight="medium">
                                    {name}
                                </Typography>
                                <Typography fontSize={5} fontWeight="medium">
                                    ${price}
                                </Typography>
                            </div>
                            
                            <div className="col">
                                <div className='mb-2 w-md-75 w-xl-50'>
                                    <QuantityController quantity={quantity} onQuantityChange={handleQuantity} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 col-md-2 text-center">
                        <Typography fontSize={5} fontWeight='medium'>${price * quantity}</Typography>
                        <Button color='danger' onClick={removeFromCart} variant='outline'><RemixIcon name='delete-bin-line' /> Remove</Button>
                    </div>
                </div>
            </div>
        </div>
    );
});

CartItem.displayName = "Cart Item";

export default CartItem;
