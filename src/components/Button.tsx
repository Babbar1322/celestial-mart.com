import React from "react";
import cn from "classnames";

import { IButtonProps } from "@/typings/components";

const Button = React.memo<IButtonProps>(
  (
    {
      children,
      color = "primary",
      className,
      textColor,
      buttonSize,
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
      rounded,
      variant,
      loading,
      ...props
    }
  ) => {
    const buttonColor = variant === 'outline' ? `btn-outline-${color}` : `btn-${color}`;
    return (
      <button
        className={cn(
          "btn",
          {
            [buttonColor]: color,
            [`text-${textColor}`]: textColor,
            [`btn-${buttonSize}`]: buttonSize,
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
            [`rounded-${rounded}`]: rounded,
          },
          className
        )}
        {...props}
        disabled={loading || props.disabled}
      >
        {loading && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
