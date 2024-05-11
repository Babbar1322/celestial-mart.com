import { FC } from 'react';
import Slider from 'react-slick';

// import Button from '@/components/Button';
import Container from '@/components/Container';
// import RemixIcon from '@/components/RemixIcon';
import Typography from '@/components/Typography';
import { LeftArrow, RightArrow } from '@/components/slider-arrows';

import TopCategories from './TopCategories';
import FeaturedProducts from './FeaturedProducts';
import BestSeller from './BestSellers';
import LatestBlog from './LatestBlog';

const HomePage: FC = () => {
    return (
        <Container fluid>
            <Container fluid paddingHorizontal="4">
                <Slider nextArrow={<RightArrow />} prevArrow={<LeftArrow />} infinite={false}>
                    <div className="w-100 fs-1 text-center" style={{ minHeight: 200 }}>
                        <img
                            src="/assets/images/slider/banner-1.png"
                            alt=""
                            className="w-100 rounded-3 rounded-md-4 rounded-lg-5"
                        />
                    </div>
                    <div className="w-100 fs-1 text-center" style={{ minHeight: 200 }}>
                        <img
                            src="/assets/images/slider/banner-2.png"
                            alt=""
                            className="w-100 rounded-3 rounded-md-4 rounded-lg-5"
                        />
                    </div>
                </Slider>
            </Container>
            <Container marginVertical="5" className="text-center">
                <Typography className="text-center" fontWeight="bold" fontSize={2} marginBottom="4">
                    Top Categories
                </Typography>
                <TopCategories />

                {/* <Button marginTop={4} textColor="white" buttonSize="lg">
                    View All Categories <RemixIcon name="arrow-right-s-line" />
                </Button> */}
            </Container>
            
            <FeaturedProducts />
            
            <Container fluid paddingHorizontal="4" marginVertical="9">
            <Slider
                slidesToShow={4}
                swipeToSlide={true}
                infinite={false}
                nextArrow={<RightArrow />}
                prevArrow={<LeftArrow />}
                responsive={[
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                ]}
            >
                    <div className="rounded-4 overflow-hidden position-relative" style={{minWidth: 350}}>
                        <div className="position-absolute top-7 end-7">
                            <Typography fontSize={1} fontWeight='bold' color='warning' right>15% OFF</Typography>
                            <Typography fontSize={1} fontWeight='bold' color='white' right>Drinks</Typography>
                        </div>
                        <img src="/assets/images/banner/alchohol.jpg" alt="" className="w-100 rounded-4" />
                    </div>
                    <div className="rounded-4 overflow-hidden position-relative" style={{minWidth: 350}}>
                        <div className="position-absolute bottom-7 start-7">
                            <Typography fontSize={1} fontWeight='bold' color='warning'>10% OFF</Typography>
                            <Typography fontSize={1} fontWeight='bold' color='white'>Smoke &amp; Vapes</Typography>
                        </div>
                        <img src="/assets/images/banner/cigarette.jpg" alt="" className="w-100 rounded-4" />
                    </div>
                    <div className="rounded-4 overflow-hidden position-relative" style={{minWidth: 350}}>
                        <div className="position-absolute bottom-7 end-7">
                            <Typography fontSize={1} fontWeight='bold' color='warning' right>15% OFF</Typography>
                            <Typography fontSize={1} fontWeight='bold' color='white' right>Grocery</Typography>
                        </div>
                        <img src="/assets/images/banner/grocery.jpg" alt="" className="w-100 rounded-4" />
                    </div>
                </Slider>
            </Container>

            
            
            <BestSeller />

            <LatestBlog />
        </Container>
    );
};

export default HomePage;
