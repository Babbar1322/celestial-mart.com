import { FC } from 'react';

import Container from '@/components/Container';
import Typography from '@/components/Typography';

const AboutUsPage: FC = () => {
    return (
        <Container>
            <div className="page-title mb-5">
                <Typography fontSize={1} center fontWeight="bold" color="white">
                    About Us
                </Typography>
            </div>

            <div className="row">
                <div className="col-md-6 my-auto">
                    <img src="/ecommerce/assets/images/about-us.jpeg" className="w-75" />
                </div>
                <div className="col-md-6 my-auto">
                    <h1 className="pb-5">
                        <b>Welcome to Celestial Mart Online and Retail Store</b>
                    </h1>
                    <p className="fs-6">
                        Celestial Mart is an online and Retail Grocery store Indian / South Indian / Punjabi and Gujrati
                        grocery Store . We serve all areas in Canada. We believe getting your favorite brands should be
                        easy and we make this possible through our carefully chosen suppliers, integrated technology
                        platform and dedicated shipping partnerships. So all you need to worry about is how to enjoy
                        your favorite foods!
                    </p>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-12 text-center">
                    <h1 className="fs-1 py-4">
                        <strong>How Its Works</strong>
                    </h1>
                </div>
                <div className="col-md-4 my-2">
                    <div className="card">
                        <div className="card-body text-center rounded" style={{ minHeight: '250px', height: '250px' }}>
                            <img src="/ecommerce/assets/images/browse.png" alt="" className="w-25 pb-3" />
                            <h4 className="fs-3 text-center ">Browse and Select</h4>
                            <p>Explore products, add to cart selecting quantity, variants and review your order</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 my-2">
                    <div className="card">
                        <div className="card-body text-center rounded" style={{ minHeight: '250px', height: '250px' }}>
                            <img src="/ecommerce/assets/images/payment.avif" alt="" className="w-25 pb-3" />
                            <h4 className="fs-3 text-center ">Checkout and Payment</h4>
                            <p>Provide address information, select a payment method and review your order summary</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 my-2">
                    <div className="card">
                        <div className="card-body text-center rounded" style={{ minHeight: '250px', height: '250px' }}>
                            <img src="/ecommerce/assets/images/order.png" alt="" className="w-25 pb-3" />
                            <h4 className="fs-3 text-center ">Order Delivery</h4>
                            <p>
                                Receive confirmation notification and tracker order status by checking estimated
                                delivery
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AboutUsPage;
