import { memo, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import { useCart } from 'react-use-cart';
import TopBarProgress from 'react-topbar-progress-indicator';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { OnApproveData, CreateOrderData, CreateOrderActions, OnApproveActions } from '@paypal/paypal-js';
import { toast } from 'react-toastify';

import Button from '@/components/Button';
import Container from '@/components/Container';
import Typography from '@/components/Typography';
import { HttpClient } from '@/config/http-client';
import { IAddress } from '@/typings/data';
import AddressModal from './AddressModal';

const CheckoutPage = memo(() => {
    const { items, isEmpty, totalItems, cartTotal, emptyCart } = useCart();

    const [selectedAddress, setSelectedAddress] = useState<number>(0);
    const [placingOrder, setPlacingOrder] = useState<boolean>(false);

    const navigate = useNavigate();

    const { data, isFetching } = useQuery({
        queryKey: ['getAddress'],
        queryFn: async () => {
            const res: { status: boolean; address: IAddress[] } = await HttpClient.post('/get_address');
            return res.address;
        },
    });

    const placeOrder = async (_: CreateOrderData, actions: CreateOrderActions) => {
        if (!selectedAddress) {
            toast.error("Please select an Address to Place order");
            return '';
        }
        setPlacingOrder(true);
        return actions.order.create({
            purchase_units: items.map((product) => ({
                ...product,
                amount: { value: product.price.toString() },
                reference_id: product.id + '_' + Math.random(),
            })),
        });
    };

    const placeCodOrder = async () => {
        try {
            if (!selectedAddress) {
                toast.error("Please select an Address to Place order");
                return;
            }
            setPlacingOrder(true);
            const res: { status: boolean; message: string; order_id: number } = await HttpClient.post('/order', {
                address_id: selectedAddress,
                products: items.map((item) => {
                    return {
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        id: item.id,
                        product_id: item.productId,
                    };
                }),
            });

            if (res.status) {
                // Show success message and redirect after placing COD order
                toast.success(res.message);
                emptyCart();
                navigate('/');
            }

        } catch (error) {
            console.error('Error capturing PayPal order:', error);
        } finally {
            setPlacingOrder(false);
        }
    };

    const onApprove = async (_: OnApproveData, actions: OnApproveActions) => {
        try {
            // Capture the PayPal order
            const order = await actions.order?.capture();

            if (order?.status !== 'APPROVED' && order?.status !== 'COMPLETED') {
                toast.error('Payment not success');
                return;
            }

            const res: { status: boolean; message: string; order_id: number } = await HttpClient.post('/order', {
                address_id: selectedAddress,
                products: items.map((item) => {
                    return {
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        id: item.id,
                        product_id: item.productId,
                    };
                }),
                order_id: order.id,
            });

            if (res.status) {
                // Show success message and redirect after placing COD order
                toast.success(res.message);
                emptyCart();
                navigate('/');
            }

        } catch (error) {
            console.error('Error capturing PayPal order:', error);
        } finally {
            setPlacingOrder(false);
        }
    };

    useEffect(() => {
        if (isEmpty) {
            navigate('/shop');
        }
    }, [isEmpty, navigate]);

    return (
        <Container>
            {isFetching && <TopBarProgress />}
            <div className="page-title mb-5">
                <Typography fontSize={1} center fontWeight="bold" color="white">
                    Checkout
                </Typography>
                <Typography center fontWeight="medium" color="white">
                    Choose your payment method and place order
                </Typography>
            </div>

            <div className="row">
                <div className="col-md-7 border-end">
                    <div>
                        <Typography fontSize={4} fontWeight="semibold" marginBottom="3">
                            Address
                        </Typography>
                        {isFetching ? (
                            <Skeleton height={50} borderRadius={10} className="mb-3" />
                        ) : (
                            <div className="form-floating mb-3">
                                <select
                                    className="form-select"
                                    onChange={(ev) => setSelectedAddress(+ev.target.value)}
                                    value={selectedAddress}
                                >
                                    <option value="">Select Address</option>
                                    {data?.map((address) => (
                                        <option key={address.id} value={address.id}>
                                            {address.name} - {address.address_line1}, {address.city}
                                        </option>
                                    ))}
                                </select>
                                <label>Select Address</label>
                            </div>
                        )}
                        {!isFetching && (
                            <Button className="w-100" data-bs-toggle="modal" data-bs-target="#addAddressModal">
                                Add New Address
                            </Button>
                        )}
                    </div>
                </div>
                <div className="col-md-5">
                    <Typography fontSize={4} fontWeight="semibold" marginBottom="3">
                        Items ({totalItems})
                    </Typography>
                    <div className="overflow-auto" style={{ maxHeight: 500 }}>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isEmpty &&
                                    items.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <img src={item.image} alt={item.name} className="w-50 image-square" />
                                            </td>
                                            <td>{item.name}</td>
                                            <td align="right">{item.quantity}</td>
                                            <td>${item.price}</td>
                                            <td>${(item?.quantity ?? 0) * item.price}</td>
                                        </tr>
                                    ))}
                                {/* {!isEmpty && (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Grand Total</td>
                                        <td>${cartTotal}</td>
                                    </tr>
                                )} */}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-3">
                        <Typography fontWeight="medium" right>
                            Grand Total:{' '}
                            <Typography as="span" fontWeight="semibold">
                                ${cartTotal}
                            </Typography>
                        </Typography>
                    </div>
                </div>
            </div>
            <div className="w-md-50 mx-auto">
                <Typography fontSize={4} fontWeight="semibold" marginBottom="3">
                    Payment Method
                </Typography>

                <div>
                    <PayPalButtons
                        style={{
                            color: 'black',
                            label: 'pay',
                            layout: 'horizontal',
                            shape: 'rect',
                            tagline: false,
                            disableMaxWidth: true,
                        }}
                        forceReRender={[selectedAddress]}
                        createOrder={placeOrder}
                        onApprove={onApprove}
                    />
                    <Button
                        variant="outline"
                        marginTop="3"
                        paddingVertical="2"
                        className="w-100"
                        disabled={!selectedAddress}
                        onClick={placeCodOrder}
                        loading={placingOrder}
                    >
                        Confirm &amp; Place Order
                    </Button>
                </div>
            </div>

            {/* <Button
                variant="outline"
                marginTop="3"
                className="w-100 d-md-none"
                paddingVertical='3'
                disabled={!selectedAddress}
                loading={placingOrder}
            >
                Confirm &amp; Place Order
            </Button> */}
            <AddressModal />
        </Container>
    );
});

export default CheckoutPage;
