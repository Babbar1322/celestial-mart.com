import React from "react";
import cn from "classnames";

import { ITypographyProps } from "@/typings/components";

const Typography = React.memo<ITypographyProps>(
  (
    {
      as,
      children,
      color,
      className,
      fontSize,
      fontWeight,
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
      truncate,
      left,
      center,
      right,
      ...props
    }
  ) => {
    const Component = as || 'div';
    return (
      <Component
        className={cn(
          {
            [`text-${color}`]: color,
            [`fs-${fontSize}`]: fontSize && !as,
            [`fw-${fontWeight}`]: fontWeight,
            'text-start': left && (!center || !right),
            'text-center': center && (!left || !right),
            'text-end': right && (!left || !center),
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
            ['text-truncate w-100']: truncate,
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";

export default Typography;
