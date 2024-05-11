import { FC, memo } from 'react';
import cn from 'classnames';

interface OrderStatusProps {
    status: "Pending" | "Processing" | "Confirmed" | "Dispatched" | "Out For Delivery" | "Delivered" | "Cancelled" | "Rejected";
}

const OrderStatus: FC<OrderStatusProps> = memo(({status}) => {
  return (
    <div className={cn('badge', {
        'text-bg-success': ['Delivered', 'Out For Delivery'].includes(status),
        'text-bg-warning': status === 'Pending',
        'text-bg-info': ['Processing', 'Confirmed', 'Dispatched'].includes(status),
        'text-bg-danger': ['Cancelled', 'Rejected'].includes(status),
    })}>{status}</div>
  )
})

export default OrderStatus;