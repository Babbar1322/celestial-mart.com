import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import TopBarProgress from "react-topbar-progress-indicator";
import Container from '@/components/Container';
import Typography from '@/components/Typography';
import { HttpClient } from '@/config/http-client';
import { IOrder } from '@/typings/data';

const OrderDetails = memo(() => {
    const { orderId } = useParams();

    const { isFetching, data } = useQuery({
        queryKey: ['order-details'],
        queryFn: async () => {
            const res: { status: boolean; order: IOrder } = await HttpClient.post(`/order-details/${orderId}`);
            // console.log(res.order.order_products);
            return res.order;
        },
    });
    return (
        <Container>
          {isFetching && <TopBarProgress />}
          <div>
            <Typography as='h4' center marginBottom="5">Order Details</Typography>
          </div>
          <div className="row justify-content-between mb-5">
            <div className="col-md-4 col-sm-6">
              <Typography fontSize={5}>Address Details</Typography>
              <hr />
              <Typography>Name - {data?.address?.name}</Typography>
              <Typography>Phone - {data?.address?.phone}</Typography>
              <Typography>Address - {data?.address?.address_line1}, {data?.address?.city}, {data?.address?.state} ({data?.address?.zip})</Typography>
            </div>
            <div className="col-md-4 col-sm-6">
            <Typography fontSize={5}>Order Details</Typography>
            <hr />
              <Typography>Ref. No. - {data?.order_id}</Typography>
              <Typography>Payment Type - {data?.payment_type}</Typography>
              <Typography>Order Status - {data?.status}</Typography>
            </div>
          </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                  {isFetching && (
                    <tr>
                      <td colSpan={4}>
                        <Skeleton height={30} />
                      </td>
                    </tr>
                  )}
                    {!isFetching ? data?.order_products?.map((item) => (
                        <tr key={item.id}>
                            <td>
                                {/* <RouterLink to={`/orders/${item.order_id}`}>{item.order_id}</RouterLink> */}
                                <img src={item.product?.image?.image_link} alt={item.name} style={{maxWidth: 50, marginRight: '5%'}} />
                                {item.name}
                            </td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                            <td>${item.total}</td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
            <div className="row justify-content-end">
              <div className="col-md-6">
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Total Quantity</th>
                      <td>{data?.total_quantity}</td>
                    </tr>
                    <tr>
                      <th>Total Price</th>
                      <td>{data?.total_price}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </Container>
    );
});

export default OrderDetails;
