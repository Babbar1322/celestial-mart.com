import { FC, useEffect } from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';

import Container from '@/components/Container';
import Typography from '@/components/Typography';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { HttpClient } from '@/config/http-client.ts';
import { IProduct, PaginateData } from '@/typings/data.ts';
import Skeleton from 'react-loading-skeleton';
import ProductItem from '@/components/ProductItem.tsx';

const SearchPage: FC = () => {
    const {query} = useParams();

    const {isFetching, data, refetch} = useQuery({
        queryKey: ['search'],
        queryFn: async () => {
            const res: {products: PaginateData<IProduct>} = await HttpClient.get(`/search?search=${encodeURIComponent(query + '')}`);
            return res.products.data;
        },
    });

    useEffect(() => {
        refetch();
    }, [query]);
    return (
        <Container>
            {isFetching && <TopBarProgress />}
            <div className="page-title mb-5">
                <Typography fontSize={1} center fontWeight="bold" color="white">
                    Search Results
                </Typography>
                <Typography center fontWeight="medium" color="white">
                    You searched for: {query}
                </Typography>

                {/*{!isEmpty && <Typography fontSize={5} center fontWeight="bold" color="white">
                    Total Items: {totalItems}
                </Typography>}*/}
            </div>

            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4'>
                {isFetching
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <div className="col" key={index}>
                            <Skeleton className="image-square rounded-4" />
                        </div>
                    ))
                    : data?.map((product) => (
                        <div className="col" key={product.id}>
                            <ProductItem
                                key={product.id}
                                id={product.id.toString()}
                                price={product.product_units[0].price}
                                name={product.name}
                                productUnit={product.product_units}
                                image={product.image?.image_link}
                            />
                        </div>
                    ))}
            </div>
            {!isFetching && (data?.length ?? 0) <= 0 ? (
                <Typography center fontSize={2}>No Products Found</Typography>
            ) : null}
        </Container>
    );
};

export default SearchPage;
