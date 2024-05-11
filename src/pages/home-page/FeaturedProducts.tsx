import { FC, JSX, memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import TopBarProgress from 'react-topbar-progress-indicator';
import Container from '@/components/Container';
import RemixIcon from '@/components/RemixIcon';
import RouterLink from '@/components/RouterLink';
import ProductItem from '@/components/ProductItem';
import Typography from '@/components/Typography';
import { HttpClient } from '@/config/http-client';
// import Slider from 'react-slick';
import { IProduct } from '@/typings/data';

interface FeaturedProductsProps {}

const FeaturedProducts: FC<FeaturedProductsProps> = memo((): JSX.Element => {
    const { isLoading, data } = useQuery<IProduct[], Error>({
        queryKey: ['featured-products'],
        queryFn: async () => {
            const res: { products: IProduct[] } = await HttpClient.get('/featured_products');
            return res.products;
        },
    });
    return (
        <Container marginTop="9">
            {isLoading && <TopBarProgress />}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <Typography as="h2" fontWeight="bold" margin="0">
                    Featured Products
                </Typography>
                <RouterLink to={'/shop'} size={5}>
                    View All <RemixIcon name="arrow-right-s-line" />
                </RouterLink>
            </div>

            {/* <Slider
                slidesToShow={4}
                swipeToSlide={true}
                infinite={false}
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
            > */}
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                {isLoading
                    ? Array.from({ length: 8 }).map((_, index) => (
                          <div className="col" key={index}>
                              <Skeleton className="rounded-5 aspect-1/1" height={200} />
                          </div>
                      ))
                    : data?.map((item) => {
                          const unitsLength = item?.product_units?.length;
                          const price =
                              unitsLength > 1
                                  ? `${item?.product_units[0]?.price} - ${item?.product_units[unitsLength - 1]?.price}`
                                  : item?.product_units[0]?.price;
                          const discountPrice = () => {
                              if (item?.discount) {
                                  return (+item?.discount / 100) * item?.product_units[0]?.price;
                              }
                              return item?.product_units[0]?.price;
                          };
                          return (
                              <div className="col" key={item.id}>
                                  <ProductItem
                                      discount={item?.discount}
                                      id={item.id.toString()}
                                      image={import.meta.env.VITE_BASE_URL + '/' + item.image?.image}
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
            {/* </Slider> */}
        </Container>
    );
});

FeaturedProducts.displayName = 'Featured Products';

export default FeaturedProducts;
