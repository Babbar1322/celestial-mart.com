import React from "react";
import cn from "classnames";

import { IRemixIconProps } from "@/typings/components";

const RemixIcon = React.memo<IRemixIconProps>(
  (
    {
      name,
      color,
      className,
      size,
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
      ...props
    }
  ) => {
    return (
      <span
        className={cn(
          `ri-${name}`,
          'd-inline-block',
          {
            [`text-${color}`]: color,
            [`fs-${size}`]: size,
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
      </span>
    );
  }
);

RemixIcon.displayName = "RemixIcon";

export default RemixIcon;
