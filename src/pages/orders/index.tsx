import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import TopBarProgress from "react-topbar-progress-indicator";

import Container from '@/components/Container';
import Typography from '@/components/Typography';
// import RouterLink from '@/components/RouterLink';
import { HttpClient } from '@/config/http-client';
import { IOrder, PaginateData } from '@/typings/data';
import OrderStatus from '@/components/OrderStatus';
import PaginationController from '@/components/PaginationController';
import RouterLink from '@/components/RouterLink';

const OrdersPage: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ['get-orders'],
        queryFn: async () => {
            const res: { status: boolean; orders: PaginateData<IOrder> } = await HttpClient.post(`/get-orders?page=${currentPage}`);
            // console.log(res.orders.data?.length > 0);
            return res.orders;
        },
    });

    return (
        <Container>
            {isLoading && <TopBarProgress />}
            <div className="page-title mb-5">
                <Typography fontSize={1} center fontWeight="bold" color="white">
                    Orders
                </Typography>
                <Typography center fontWeight="medium" color="white" marginBottom={!((data?.data?.length ?? 0) > 0) ? undefined : '5'}>
                    Your previous orders
                </Typography>

                {(data?.data?.length ?? 0) > 0 && (
                    <Typography fontSize={5} center fontWeight="bold" color="white">
                        Total Items: {data?.data?.length}
                    </Typography>
                )}
            </div>

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Order ID</th>
                            <th>Total Items</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data?.data?.length ?? 0) > 0 && !isLoading ? (
                            data?.data?.map((item) => (
                                <tr key={item.id}>
                                    <td>{new Date(item.created_at).toLocaleString('en-IN')}</td>
                                    <td>
                                        <RouterLink to={`/orders/${item.order_id}`}>{item.order_id}</RouterLink>
                                        {/* {item.order_id} */}
                                    </td>
                                    <td>{item.total_quantity}</td>
                                    <td>${item.total_price}</td>
                                    <td>
                                        <OrderStatus status={item.status} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} align='center'>
                                    {isLoading ? (
                                        <div className="spinner-border mx-auto" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        <Typography fontSize={4} center>
                                            No Orders
                                        </Typography>
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <PaginationController currentPage={currentPage} lastPage={data?.last_page ?? 1} onPageChange={(page) => setCurrentPage(page)} from={data?.from ?? 0} to={data?.to ?? 0} total={data?.total} />
            </div>
        </Container>
    );
};

export default OrdersPage;
