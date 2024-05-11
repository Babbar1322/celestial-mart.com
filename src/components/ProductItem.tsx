import { FC, JSX, memo, useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';

import cn from 'classnames';
import Typography from './Typography';
import Button from './Button';
import RemixIcon from './RemixIcon';
import RouterLink from './RouterLink';
import QuantityController from './QuantityController';
import { IProductUnit } from '@/typings/data';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ProductItemProps {
    id: string;
    discount?: number | null;
    image?: string;
    inStock?: boolean;
    name?: string;
    price: number;
    productUnit: IProductUnit[];
    realPrice?: number | string;
}

const ProductItem: FC<ProductItemProps> = memo((product): JSX.Element => {
    const { discount, id, image, realPrice, name, productUnit } = product;

    const isMedium = useMediaQuery('(max-width: 768px)');

    const { addItem, inCart, updateItemQuantity, removeItem, getItem } = useCart();

    const [selectedUnit, setSelectedUnit] = useState<number>(productUnit[0].id);

    const productId = selectedUnit.toString();
    const selectedUnitIdx = productUnit.length > 1 ? productUnit.findIndex((item) => item.id === selectedUnit) : 0;

    const tax = productUnit[selectedUnitIdx].gst ? (productUnit[selectedUnitIdx].gst / 100) *  productUnit[selectedUnitIdx].price : 0;

    const productPrice = productUnit[selectedUnitIdx].price + tax;

    const cartProduct = getItem(productId);

    const [quantity, setQuantity] = useState<number>(cartProduct?.quantity ?? 1);

    const isProductInCart = inCart(productId);

    const addInCart = (qty?: number) => {
        if (qty ?? quantity > productUnit[selectedUnitIdx].quantity) {
            return;
        }
        if (isProductInCart) {
            updateItemQuantity(productId, qty ?? quantity);
        } else {
            addItem(
                {
                    ...product,
                    price: +productPrice.toFixed(2),
                    id: productId,
                    name: `${product.name} (${productUnit[selectedUnitIdx].unit}${productUnit[selectedUnitIdx].unit_type})`,
                    productId: id,
                },
                qty ?? quantity
            );
        }
    };

    const removeFromCart = () => {
        if (isProductInCart) {
            setQuantity(1);
            removeItem(productId);
        }
    };

    const handleQuantity = (qty: number) => {
        if (qty > productUnit[selectedUnitIdx].quantity) {
            return;
        }
        if (isProductInCart) addInCart(qty);
        setQuantity(qty);
    };

    useEffect(() => {
        setQuantity(cartProduct?.quantity ?? 1);
    }, [selectedUnit, selectedUnitIdx]);
    return (
        <div className="card rounded-4 position-relative overflow-hidden z-0">
            <div className="card-body">
                {discount && (
                    <div className="position-absolute top-0 start-0 text-white bg-dark py-1 px-2 rounded-bottom-right">
                        {discount}
                    </div>
                )}
                <RouterLink to={`/products/${id}`} margin="3" className="text-center">
                    <img
                        src={image}
                        alt=""
                        className="image-square w-100 w-sm-75 d-block mx-auto"
                        style={{ minWidth: 100, objectFit: 'contain', objectPosition: 'center', height: 250 }}
                    />
                </RouterLink>
                {!(productUnit.length > 1) || !!selectedUnit ? (
                    <Typography
                        style={{ fontSize: isMedium ? 12 : 16 }}
                        className={cn(
                            productUnit[selectedUnitIdx]?.quantity > 0
                                ? 'bg-success-subtle text-success'
                                : 'bg-danger-subtle text-danger',
                            'position-absolute top-0 start-0 px-2 rounded-bottom-end'
                        )}
                        marginBottom="2"
                    >
                        {productUnit[selectedUnitIdx]?.quantity > 0 ? 'In Stock!' : 'Out of Stock!'}
                    </Typography>
                ) : null}
                <RouterLink to={`/products/${id}`} color="dark" className='w-100'>
                    <Typography style={{fontSize: isMedium ? 12 : 16}} truncate>
                        {name}
                    </Typography>
                </RouterLink>
                <Typography
                    fontSize={isMedium ? 6 : 3}
                    fontWeight={isMedium ? 'medium' : 'semibold'}
                    marginVertical={isMedium ? '1' : '2'}
                >
                    {selectedUnit ? <>${productPrice}</> : 'Select Variant'}{' '}
                    {realPrice && (
                        <small>
                            <Typography
                                as="span"
                                fontWeight="normal"
                                className="text-decoration-line-through text-body-secondary fs-6"
                            >
                                ${realPrice}
                            </Typography>
                        </small>
                    )}
                </Typography>
                {!isMedium && (
                    <>
                        {/* {productUnit.length > 1 && ( */}
                            <div className="form-floating mb-3">
                                <select
                                    className="form-select"
                                    id={`product-variant-${product.id}`}
                                    onChange={(ev) => setSelectedUnit(+ev.target.value)}
                                    value={selectedUnit}
                                >
                                    {productUnit.map((unit) => (
                                        <option value={unit.id} key={unit.id}>
                                            {unit.unit} {unit.unit_type} {unit.quantity === 0 && '(Unavailable)'}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor={`product-variant-${product.id}`}>Select Product</label>
                            </div>
                        {/* )} */}
                        {!(productUnit.length > 1) || !!selectedUnit
                            ? productUnit[selectedUnitIdx]?.quantity > 0 && (
                                <>
                                    <div className="mb-2 w-md-75 w-xl-50">
                                        <QuantityController
                                            quantity={quantity}
                                            onQuantityChange={handleQuantity}
                                            max={productUnit[selectedUnitIdx].quantity}
                                        />
                                    </div>
                                    <Button
                                        textColor="white"
                                        className="w-100"
                                        // disabled={!!productUnit[selectedUnitIdx]?.quantity}
                                        onClick={() => (isProductInCart ? removeFromCart() : addInCart())}
                                    >
                                        <div className="d-flex align-items-center gap-2">
                                            <Typography truncate>
                                                {isProductInCart ? 'Remove From cart' : 'Add To Cart'}
                                            </Typography>
                                            <RemixIcon name="arrow-right-s-line" />
                                        </div>
                                    </Button>
                                </>
                              )
                            : null}
                    </>
                )}
                {/* {!!selectedUnit && (
                    <>
                        <div className="mb-2 w-md-75 w-xl-50">
                            <QuantityController quantity={quantity} onQuantityChange={handleQuantity} />
                        </div>
                        <Button
                            textColor="white"
                            className="w-100"
                            onClick={() => (isProductInCart ? removeFromCart() : addInCart())}
                        >
                            {isProductInCart ? 'Remove From cart' : 'Add To Cart'}{' '}
                            <RemixIcon name="arrow-right-s-line" />
                        </Button>
                    </>
                )} */}
            </div>
        </div>
    );
});

ProductItem.displayName = 'Product Item';

export default ProductItem;
