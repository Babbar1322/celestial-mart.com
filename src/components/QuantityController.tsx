import { FC } from 'react';
import Button from './Button';
import RemixIcon from './RemixIcon';

interface QuantityControllerProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    max?: number;
}

const QuantityController: FC<QuantityControllerProps> = ({quantity, onQuantityChange, max}) => {
    const onChangeQuantity = (event: React.FormEvent<HTMLInputElement>) => {
        const maxQty = max ?? 50;
        const currentValue = Number(event.currentTarget.value);
        if (currentValue > maxQty) {
            onQuantityChange(50);
        } else if (currentValue < 1) {
            onQuantityChange(1);
        } else {
            onQuantityChange(currentValue);
        }
        // if (!(currentValue > 50) && !(currentValue < 1)) {
        //     onQuantityChange(currentValue);
        // }
    };
    return (
        <div className="input-group z-1">
            <Button
                color="dark"
                variant="outline"
                disabled={quantity <= 1}
                onClick={() => onQuantityChange(--quantity)}
                className='p-1 p-sm-2'
            >
                <RemixIcon name="subtract-line" />
            </Button>
            <input
                type="number"
                className="form-control text-center"
                placeholder=""
                onChange={onChangeQuantity}
                value={quantity.toString()}
                min={1}
                max={max ?? 50}
            />
            <Button
                color="dark"
                variant="outline"
                disabled={quantity >= (max ?? 50)}
                onClick={() => onQuantityChange(++quantity)}
                className='p-1 p-sm-2'
            >
                <RemixIcon name="add-line" />
            </Button>
        </div>
    );
};

QuantityController.displayName = 'Quantity Controller';

export default QuantityController;
