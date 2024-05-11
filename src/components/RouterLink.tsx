import React from "react";
import cn from "classnames";
import { NavLink } from "react-router-dom";

import { IRouterLinkProps } from "@/typings/components";

const RouterLink = React.memo<IRouterLinkProps>(
  (
    {
      active,
      activeClass,
      button,
      color = 'primary',
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
      buttonVariant,
      ...props
    }
  ) => {
    const linkColor = (): string => {
      if (button) {
        if (buttonVariant === 'outline') {
          return `btn btn-outline-${color}`;
        }
        return `btn btn-${color}`;
      }

      return `link-${color}`;
    }
    return (
      <NavLink
        className={cn(
          'text-decoration-none d-inline-block',
          linkColor(),
          {
            [`${activeClass ?? 'active'}`]: active,
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
      </NavLink>
    );
  }
);

RouterLink.displayName = "RouterLink";

export default RouterLink;
