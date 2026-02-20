import { FC, memo, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import TopBarProgress from "react-topbar-progress-indicator";

import Container from '@/components/Container';
import Categories from './categories';
import { HttpClient } from '@/config/http-client';
import { IProduct, PaginateData } from '@/typings/data';
import ProductItem from '@/components/ProductItem';
import PaginationController from '@/components/PaginationController.tsx';
import Typography from '@/components/Typography';

const ShopPage: FC = memo(() => {
    const { category, sub } = useParams();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationData, setPaginationData] = useState<PaginateData<IProduct>>();
    const { isFetching, data, refetch } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const query = () => {
                let str = `/category_products?page=${currentPage}`;
                if (category) {
                    str += `&category=${category}`;
                    if (sub) {
                        str += `&sub=${sub}`;
                    }
                }
                const filterArray = location.search.replace('?', '').split('=');
                if (filterArray.includes('filter')) {
                    str += `&filter=${filterArray[filterArray.indexOf('filter') + 1]}`;
                }
                return str;
            };
            const res: { products: PaginateData<IProduct> } = await HttpClient.get(query());
            setPaginationData(res.products);
            return res.products.data;
        },
    });

    useEffect(() => {
        refetch();
    }, [location.pathname, currentPage, location.search]);

    return (
        <Container fluid className="px-xl-9 px-md-5 px-sm-2">
            {isFetching && <TopBarProgress />}
            <div className="bg-white sticky-top py-2 py-lg-0 z-1">
                <button
                    className="btn d-lg-none"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#category"
                    aria-controls="category"
                    aria-label="Toggle navigation"
                >
                    {/* <RemixIcon name="menu-3-line" /> Categories */}
                    <div className='d-flex align-items-center gap-2'><img src="/ecommerce/assets/svg/icons/category.svg" alt="" width={20} /> Categories</div>
                </button>
            </div>
            <div className="row g-8 m-0">
                <Categories />
                <div className="col-lg mt-0 mt-lg-4">
                    <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 g-3 m-0">
                        {isFetching
                            ? Array.from({ length: 6 }).map((_, index) => (
                                  <div className="col" key={index}>
                                      <Skeleton className="image-square rounded-4" />
                                  </div>
                              ))
                            : data?.map((product) => (
                                  <div className="col"
                                  key={product.id}>
                                      <ProductItem
                                          id={product.id.toString()}
                                          price={product.product_units[0].price}
                                          name={product.name}
                                          productUnit={product.product_units}
                                          image={product.image?.image_link}
                                      />
                                  </div>
                              ))}
                    </div>
                    {((data?.length ?? 0) === 0 && !isFetching) && (
                        <Typography fontSize={3} center>
                            No Products Found!
                        </Typography>
                    )}

                    <div className="mt-4">
                        <PaginationController
                            currentPage={currentPage}
                            lastPage={paginationData?.last_page ?? 0}
                            from={paginationData?.from ?? 0}
                            onPageChange={(page) => setCurrentPage(page)}
                            to={paginationData?.to ?? 0}
                            total={paginationData?.total}
                        />
                    </div>
                </div>
            </div>
            {/* <div className="row">
                <div className="col-auto col-md-4 col-xl-3 px-sm-2 px-0">
                    <Categories />
                </div>
                <div className="col">
                    Products
                </div>
            </div> */}
        </Container>
    );
});

export default ShopPage;
