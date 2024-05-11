import { memo } from 'react';
import { useQuery } from 'react-query';
import TopBarProgress from "react-topbar-progress-indicator";
import OrderStatus from '@/components/OrderStatus';
import RouterLink from '@/components/RouterLink';
import Typography from '@/components/Typography';
import { HttpClient } from '@/config/http-client';
import { IOrder, PaginateData } from '@/typings/data';

const Orders = memo(() => {
    const { isLoading, data } = useQuery({
        queryKey: ['get-orders'],
        queryFn: async () => {
            const res: {status: boolean; orders: PaginateData<IOrder>} = await HttpClient.post('/get-orders');
            return res.orders.data;
        },
    });
    return (
        <div>
            {isLoading && <TopBarProgress />}
            <Typography fontSize={4} fontWeight="semibold" marginBottom="2">
                Orders
            </Typography>
            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Order No.</th>
                        <th>Status</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {(data?.length ?? 0) > 0 && !isLoading ? (
                        data?.map((item) => (
                            <tr key={item.id}>
                                <td>{new Date(item.created_at).toLocaleString('en-IN')}</td>
                                <td>{item.order_id}</td>
                                <td><OrderStatus status={item.status} /></td>
                                <td>${item.total_price}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} align='center'>
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
                    {(data?.length ?? 0) > 0 && (
                        <tr>
                            <td colSpan={4} align='center'>
                                <RouterLink to='/orders'>View All &rarr;</RouterLink>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
});

export default Orders;
