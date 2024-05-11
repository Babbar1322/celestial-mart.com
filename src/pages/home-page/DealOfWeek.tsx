import Container from '@/components/Container';
import Typography from '@/components/Typography';
// import { HttpClient } from '@/config/http-client';
import { FC, JSX, memo } from 'react';
// import Skeleton from 'react-loading-skeleton';
// import { useQuery } from 'react-query';
// import { IProduct } from '@/typings/data';

interface BestSellerProps {}

const BestSeller: FC<BestSellerProps> = memo((): JSX.Element => {
    // const { isFetching } = useQuery<IProduct[], Error>({
    //     queryKey: ['deal-of-week'],
    //     queryFn: async () => {
    //         const res: { product: IProduct } = await HttpClient.get('/deal-of-week');
    //         return res.product;
    //     },
    // });
    return (
        <Container fluid paddingHorizontal="4">
            <div className="deals-of-week px-4 py-5 px-md-6 py-md-6 px-xl-8 py-xl-8">
                <div className="row">
                    <div className="col-md-8 order-2 order-md-1">
                        <div className="card rounded-4">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-5 text-center p-4">
                                        {/* {isFetching ? (
                                            <Skeleton className="w-75 image-square" />
                                        ) : ( */}
                                            <img
                                                src="https://www.singals.ca/cdn/shop/products/oie_28143430YfNOYisZ_400x400.jpg?v=1614519292"
                                                alt=""
                                                className="w-75"
                                            />
                                        {/* )} */}
                                    </div>
                                    <div className="col-md-7">
                                        <Typography as="h4">Mitchell Chilli Garlic Sauce (950 gm)</Typography>
                                        <Typography as="h2">
                                            $4.99{' '}
                                            <small>
                                                <del>
                                                    <Typography as="span" color="dark">
                                                        $8.99
                                                    </Typography>
                                                </del>
                                            </small>
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 order-1 order-md-2 p-5 pt-0">
                        <Typography as="h2" fontWeight="bold" className="text-center text-md-start">
                            Deals of The Week
                        </Typography>
                        Checkout these trending deals and grab interested offer to save money.
                    </div>
                </div>
            </div>
        </Container>
    );
});

BestSeller.displayName = 'Deal Of Week';

export default BestSeller;
