import React from 'react';
import cn from 'classnames';

import { IContainerProps } from '@/typings/components';

const Container = React.memo<IContainerProps>(
    ({
        children,
        className,
        fluid,
        padding,
        paddingBottom,
        paddingHorizontal,
        paddingVertical,
        paddingTop,
        paddingLeft,
        paddingRight,
        margin,
        marginBottom,
        marginHorizontal,
        marginVertical,
        marginTop,
        marginLeft,
        marginRight,
        sm,
        md,
        lg,
        xl,
        xxl,
        ...props
    }) => {
        return (
            <div
                className={cn(
                    {
                        container: !fluid && !(sm || md || lg || xl || xxl),
                        [`container-sm`]: !fluid && sm,
                        [`container-md`]: !fluid && md,
                        [`container-lg`]: !fluid && lg,
                        [`container-xl`]: !fluid && xl,
                        [`container-xxl`]: !fluid && xxl,
                        ['container-fluid']: fluid && !(sm || md || lg || xl || xxl),
                        [`p-${padding}`]: padding,
                        [`pb-${paddingBottom}`]: paddingBottom,
                        [`px-${paddingHorizontal}`]: paddingHorizontal,
                        [`py-${paddingVertical}`]: paddingVertical,
                        [`pt-${paddingTop}`]: paddingTop,
                        [`ps-${paddingLeft}`]: paddingLeft,
                        [`pe-${paddingRight}`]: paddingRight,
                        [`m-${margin}`]: margin,
                        [`mb-${marginBottom}`]: marginBottom,
                        [`mx-${marginHorizontal}`]: marginHorizontal,
                        [`my-${marginVertical}`]: marginVertical,
                        [`mt-${marginTop}`]: marginTop,
                        [`ms-${marginLeft}`]: marginLeft,
                        [`me-${marginRight}`]: marginRight,
                    },
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Container.displayName = "Container";

export default Container;
