import Container from '@/components/Container';
import { FC, JSX, memo } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = memo((): JSX.Element => {
    return (
        <Container fluid paddingHorizontal="0">
            <div className="bg-dark mt-5 p-5 w-100">
                <div className="row g-5 m-2 border-bottom border-white align-items-center justify-content-center pb-5">
                    <div className="col-9 col-sm-6 col-md-4 col-lg-3">
                        <img src="/ecommerce/assets/images/logo-white.png" className="w-100" />
                    </div>

                    <div className="col-lg-3"></div>

                    <div className="col">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <div className="fs-4 fw-bold text-white w-50">Subscribe Newsletter</div>
                            </div>

                            <div className="col">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="E-mail address..."
                                        aria-label="E-mail address..."
                                        aria-describedby="button-addon2"
                                    />
                                    <button className="btn btn-primary" type="button" id="button-addon2">
                                        Subscribe <i className="ri-arrow-right-s-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-5  py-4 my-2 text-white">
                    <div className="col">
                        We believe getting your favorite brands should be easy and we make this possible through our
                        carefully chosen suppliers, integrated technology platform and dedicated shipping partnerships.
                    </div>

                    <div className="col">
                        <div className="">
                            <strong>Quick Links</strong>
                            <br />
                            Home
                            <br />
                            Shop
                            <br />
                            About Us
                            <br />
                            Recipes
                            <br />
                            Blog
                        </div>
                    </div>

                    <div className="col">
                        <div className="">
                            <strong> Need Help</strong>
                            <br />
                            FAQs
                            <br />
                            Contact
                            <br />
                            Terms of Service
                            <br />
                            Refund Policy
                            <br />
                            Privacy Policy
                            <br />
                        </div>
                    </div>

                    <div className="col">
                        <div>
                            {' '}
                            <strong>Payment Options</strong>
                        </div>
                        <div className="row">
                            <div className="col"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
});

export default Footer;
