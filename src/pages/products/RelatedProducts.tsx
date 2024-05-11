import {FC, memo} from 'react';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import TopBarProgress from "react-topbar-progress-indicator";
import Container from '@/components/Container';
import ProductItem from '@/components/ProductItem';
import Typography from '@/components/Typography';
import { HttpClient } from '@/config/http-client';
import { IProduct } from '@/typings/data';

interface RelatedProductsProps {
    categoryId: number;
}

const RelatedProducts: FC<RelatedProductsProps> = memo(({categoryId}) => {
    const {data, isFetching} = useQuery({
        queryKey: ['related-products'],
        queryFn: async () => {
            const res: {status: boolean; products: IProduct[]} = await HttpClient.get(`/related_products/${categoryId}`);
            return res.products;
        }
    });
  return (
    <Container marginTop="9">
        {isFetching && <TopBarProgress />}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <Typography as="h2" fontWeight="bold" margin='0'>
                    Related Products
                </Typography>
            </div>

            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                {isFetching
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <Skeleton className="rounded-5 aspect-1/1" baseColor="#7d7d7d" height={200} key={index} />
                      ))
                    : data?.map((item) => {
                        const unitsLength = item?.product_units?.length;
                        const price =
                            unitsLength > 1
                                ? `${item?.product_units[0]?.price} - ${item?.product_units[unitsLength - 1]?.price}`
                                : item?.product_units[0]?.price;
                        const discountPrice = () => {
                            if (item?.discount) {
                                return (+item?.discount / 100) * item?.product_units[0].price;
                            }
                            return item?.product_units[0]?.price;
                        };
                        return (
                            <div className="col" key={item.id}>
                                <ProductItem
                                    discount={item?.discount}
                                    id={item.id.toString()}
                                    image={import.meta.env.VITE_BASE_URL + "/" + item.image?.image}
                                    inStock={item.product_units.some((unit) => unit.quantity > 0)}
                                    price={discountPrice()}
                                    productUnit={item.product_units}
                                    realPrice={item?.discount ? price : undefined}
                                    name={item.name}
                                />
                            </div>
                        );
                    })}
                </div>
                {((data?.length ?? 0) <= 0 && !isFetching) && (
                    <Typography fontSize={3} center>No Products Found!</Typography>
                )}
        </Container>
  )
});

RelatedProducts.displayName = "RelatedProducts";

export default RelatedProducts;