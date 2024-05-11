import React from "react";
import { ISpacing, TColors, TFontSize, TFontWeight, TRounded, TSize } from "./theme";
import { NavLinkProps } from "react-router-dom";

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ISpacing {
    /** Button content as Children */
    children?: React.ReactNode;
    /** 
     * Button background color from Bootstrap 5
     * @see https://getbootstrap.com/docs/5.3/components/buttons/#variants
     */
    color?: Exclude<TColors, "black" | "white">;
    /** Button font color */
    textColor?: TColors;
    /** Button size eg. Small or Large */
    buttonSize?: TSize;
    /** Additional css classes for styling */
    className?: string;
    /** Border radius */
    rounded?: TRounded;
    /** Button Variant */
    variant?: "outline" | "contained";
    /** Show Loader when true */
    loading?: boolean;
}

export interface IRemixIconProps extends React.BaseHTMLAttributes<HTMLSpanElement>, ISpacing {
    /**
     * Icon name of Remixicon without 'ri-' prefix
     * @see https://remixicon.com/
     */
    name: string;
    /** Icon color */
    color?: TColors;
    /** Additional CSS classes for styling */
    className?: string;
    /** Icon size based on headings size */
    size?: TFontSize;
}

export interface IRouterLinkProps extends NavLinkProps, ISpacing {
    /** Is Link active or not */
    active?: boolean;
    /**
     * If Link is active passed class will be used or `active` class will be used
     * @default active
     */
    activeClass?: string;
    /** Link color */
    color?: TColors;
    /** Additional CSS classes for styling */
    className?: string;
    /** Font size */
    size?: TFontSize;
    /** 
     * Detemines when show as button or as link
     * If `true` return Bootstrap 5 button else link
     */
    button?: boolean;
    /** Button Variant */
    buttonVariant?: "outline" | "contained";
}

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement>, ISpacing {
    /** Additional CSS classes for styling */
    className?: string;
    /** Input size eg. Small or Large */
    inputSize?: TSize;
    /** Border radius */
    rounded?: TRounded;
}

export interface IFloatingLabelInput extends IInputProps {
    /** Value for Floating Label */
    label: string;
}

export interface IContainerProps extends React.BaseHTMLAttributes<HTMLDivElement>, ISpacing {
    children?: React.ReactNode;
    /** Additional CSS classes for styling */
    classNames?: string;
    /** 
     * Container style
     * If true returns `container-fluid` otherwise `container`
     */
    fluid?: boolean;
    /** Applies `container-sm` class directly */
    sm?: boolean;
    /** Applies `container-md` class directly */
    md?: boolean;
    /** Applies `container-lg` class directly */
    lg?: boolean;
    /** Applies `container-xl` class directly */
    xl?: boolean;
    /** Applies `container-xxl` class directly */
    xxl?: boolean
}

export interface ITypographyProps extends React.BaseHTMLAttributes<HTMLDivElement>, ISpacing {
    children?: React.ReactNode;
    /** Additional CSS classes for styling */
    classNames?: string;
    /** Render as the passed element */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    /** Text color */
    color?: TColors;
    /** Font weight */
    fontWeight?: TFontWeight;
    /** Set text-align to left */
    left?: boolean;
    /** Set text-align to center */
    center?: boolean;
    /** Set text-align to right */
    right?: boolean;
    /** Make Text Italics */
    italic?: boolean;
    /** Font Size */
    fontSize?: TFontSize;
    /** Text Truncate will make text fit in single line */
    truncate?: boolean;
}