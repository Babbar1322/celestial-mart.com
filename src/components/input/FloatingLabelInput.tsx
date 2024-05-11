import React, { InputHTMLAttributes, useState } from "react";
import cn from "classnames";

import { IFloatingLabelInput } from "@/typings/components";
import RemixIcon from "../RemixIcon";

const FloatingLabelInput = React.memo<IFloatingLabelInput>(
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
    label,
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
      <div className="position-relative w-100 form-floating">
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
          type={inputType}
        />
        <label>{label}</label>
        {props.type === "password" && (
          <RemixIcon
            name={inputType === "password" ? "eye-line" : "eye-off-line"}
            className="position-absolute top-50 translate-middle"
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

FloatingLabelInput.displayName = "Floating Label Input";

export default FloatingLabelInput;
