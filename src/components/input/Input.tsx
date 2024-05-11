import React, { InputHTMLAttributes, useState } from "react";
import cn from "classnames";

import { IInputProps } from "@/typings/components";
import RemixIcon from "../RemixIcon";

const Input = React.memo<IInputProps>(
  ({
    className,
    inputSize,
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
    ...props
  }) => {
    const [inputType, setInputType] = useState<
      InputHTMLAttributes<HTMLInputElement>["type"]
    >(props.type);

    const toggleInputType = () => {
      if (inputType === "password") {
        setInputType("text");
      } else {
        setInputType("password");
      }
    };
    return (
      <div className="position-relative w-100">
        {props.type === "search" && (
          <RemixIcon
            name="search-2-line"
            className="position-absolute top-50 start-0 translate-middle-y"
            marginHorizontal={inputSize === 'sm' ? '1' : '2'}
            padding="1"
            size={inputSize === "lg" ? 4 : inputSize === "sm" ? undefined : 5}
          />
        )}
        <input
          className={cn(
            "form-control",
            {
              [`form-control-${inputSize}`]: inputSize,
              [`p-${padding}`]: padding,
              [`pb-${paddingBottom}`]: paddingBottom,
              [`px-${paddingHorizontal}`]: paddingHorizontal,
              [`py-${paddingVertical}`]: paddingVertical,
              [`pt-${paddingTop}`]: paddingTop,
              [`ps-${paddingLeft}`]: paddingLeft && props.type !== 'search',
              [`ps-${inputSize === 'lg' ? '7' : inputSize === 'sm' ? '5' : '6'}`]: props.type === 'search',
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
          type={inputType}
        />
        {props.type === "password" && (
          <RemixIcon
            name={inputType === "password" ? "eye-line" : "eye-off-line"}
            className="position-absolute top-50 translate-middle cursor-pointer"
            style={{right: className?.includes('is-invalid') ? '2%' : 0}}
            padding="1"
            size={inputSize === "lg" ? 4 : inputSize === "sm" ? undefined : 5}
            onClick={toggleInputType}
          />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
