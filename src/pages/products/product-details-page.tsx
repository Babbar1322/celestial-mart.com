import { FC, useCallback, useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import TopBarProgress from "react-topbar-progress-indicator";

import { IProduct } from '@/typings/data';
import { HttpClient } from '@/config/http-client';

import Container from '@/components/Container';
import Typography from '@/components/Typography';
import QuantityController from '@/components/QuantityController';
import Button from '@/components/Button';
import RelatedProducts from './RelatedProducts';

const ProductDetailsPage: FC = () => {
    const { addItem, getItem, inCart, removeItem, updateItemQuantity } = useCart();
    const { id } = useParams();

    const [selectedVariant, setSetselectedVariant] = useState<number>(0);

    const { isLoading, data } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res: { product: IProduct; status: boolean } = await HttpClient.get(`/products/${id}`);
            return res.product;
        },
    });

    const productId = data?.product_units[selectedVariant].id.toString() ?? '0';

    const cartProduct = getItem(productId);

    const [quantity, setQuantity] = useState(cartProduct?.quantity ?? 1);

    const isProductInCart = inCart(productId);

    const tax = data?.product_units[selectedVariant].gst ? (data?.product_units[selectedVariant].gst / 100) *  data?.product_units[selectedVariant].price : 0;
    // console.log(tax);
    const productPrice = data?.product_units[selectedVariant].price ?? 0 + tax;

    const addInCart = useCallback((qty?: number) => {
        if ((qty ?? quantity) > (data?.product_units[selectedVariant].quantity ?? 0)) {
            return;
        }
        if (isProductInCart) {
            updateItemQuantity(productId, qty ?? quantity);
        } else {
            addItem(
                {
                    ...data,
                    image: data?.image?.image_link,
                    price: +(productPrice).toFixed(2),
                    id: productId,
                    name: `${data?.name} (${data?.product_units[selectedVariant].unit}${data?.product_units[selectedVariant].unit_type})`,
                    productId: id,
                },
                qty ?? quantity
            );
        }
    }, [addItem, data, productId, quantity, selectedVariant, updateItemQuantity, id, isProductInCart]);

    // const addInCart = useCallback((qty?: number) => {
    //     if (isProductInCart) {
    //         updateItemQuantity(productId, qty ?? quantity);
    //     } else {
    //         addItem(
    //             { ...data, id: productId, price: +(data?.product_units[selectedVariant].price ?? 0) },
    //             qty ?? quantity
    //         );
    //     }
    // }, [addItem, data, inCart, productId, quantity, selectedVariant, updateItemQuantity]);

    const removeFromCart = () => {
        if (isProductInCart) {
            setQuantity(1);
            removeItem(productId);
        }
    };

    const handleQuantity = useCallback((qty: number) => {
        if (isProductInCart) addInCart(qty);
        setQuantity(qty);
    }, [addInCart, isProductInCart]);

    useEffect(() => {
        setQuantity(cartProduct?.quantity ?? 1);
    }, [selectedVariant, isLoading, isProductInCart]);
    
    return (
        <Container>
            {isLoading && <TopBarProgress />}
            <div className="row g-9 m-0">
                <div className="col-md-5 text-center">
                    {isLoading ? (
                        <Skeleton className="w-100 p-5 rounded-5 image-square" />
                    ) : (
                        <img
                            src={data?.image?.image_link}
                            alt="Product"
                            className="w-100 p-5 bg-body-tertiary rounded-5 image-square"
                        />
                    )}
                </div>
                <div className="col">
                    {isLoading ? (
                        <Skeleton count={2} className="fs-1 mb-3" width={100} />
                    ) : (
                        <>
                            <Typography fontSize={2} fontWeight="bold" marginBottom="3">
                                {data?.name}
                            </Typography>
                            <Typography fontSize={1} color="primary" fontWeight="bold" marginBottom="3">
                                ${productPrice}
                            </Typography>
                        </>
                    )}

                    {isLoading ? (
                        <Skeleton className="w-100 w-sm-50 w-md-25 mb-3" height={70} />
                    ) : data?.product_units && data?.product_units?.length > 1 && (
                        <div className="form-floating w-100 w-sm-50 w-md-25 mb-3">
                            <select
                                id="variant"
                                className="form-select"
                                onChange={(e) => setSetselectedVariant(+e.target.value)}
                            >
                                {data?.product_units.map((variant, index) => (
                                    <option key={variant.id} value={index}>
                                        {variant.unit} {variant.unit_type} {variant.quantity === 0 && '(Unavailable)'}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="variant">Size</label>
                        </div>
                    )}

                    {(data?.product_units[selectedVariant].quantity ?? 0) > 0 && <>
                        <div className="w-100 w-sm-50 w-lg-25 mb-4">
                            <label className="form-label">
                                Quantity
                            </label>
                            <QuantityController quantity={quantity} onQuantityChange={handleQuantity} max={data?.product_units[selectedVariant].quantity} />
                        </div>
                        <Button
                            textColor="white"
                            className="w-100 w-sm-50 w-lg-25"
                            onClick={() => (isProductInCart ? removeFromCart() : addInCart())}
                        >
                            {isProductInCart ? 'Remove From cart' : 'Add To Cart'}
                        </Button>
                    </>}
                </div>
            </div>
            <div className='mt-3'>
                <Typography fontSize={3}>Description</Typography>
                {isLoading ?
                <Skeleton className='mt-3' count={10} /> :
                <div  dangerouslySetInnerHTML={{__html: data?.description ?? ''}} className='mt-3'></div>}
            </div>

            <RelatedProducts categoryId={data?.category_id ?? 0} />
        </Container>
    );
};

export default ProductDetailsPage;
