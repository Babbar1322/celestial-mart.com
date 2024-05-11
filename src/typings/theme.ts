/** 
 * Colors from Bootstrap 5
 * @see https://getbootstrap.com/docs/5.3/utilities/colors/
 */
export type TColors = 'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'black';

/**
 * Padding and Margin Size from Bootstrap 5
 * @see https://getbootstrap.com/docs/5.3/utilities/spacing/
 */
export type TSpacing = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

/**
 * Font Sizes according to headings
 * @see https://getbootstrap.com/docs/5.3/utilities/text/#font-size
 */
export type TFontSize = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Font Weight for text
 * @see https://getbootstrap.com/docs/5.3/utilities/text/#font-weight-and-italics
 */
export type TFontWeight = 'lighter' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'bolder';

/**
 * Multipurpose sizing for Different types of elements
 * Eg. Button Small, Input Large
 */
export type TSize = 'sm' | 'lg';

/**
 * Border Radius from Bootstrap
 * @see https://getbootstrap.com/docs/5.3/utilities/borders/#radius
 */
export type TRounded = '0' | '1' | '2' | '3' | '4' | '5' | 'pill' | 'circle';

/** Extendable Interface for margin and padding props for any component */
export interface ISpacing {
    /** Padding from all sides */
    padding?: TSpacing;
    /** Padding from left and right sides */
    paddingHorizontal?: TSpacing;
    /** Padding from top and bottom sides */
    paddingVertical?: TSpacing;
    /** Padding from left side only */
    paddingLeft?: TSpacing;
    /** Padding from right side only */
    paddingRight?: TSpacing;
    /** Padding from top side only */
    paddingTop?: TSpacing;
    /** Padding from bottom side only */
    paddingBottom?: TSpacing;
    /** Margin from all sides */
    margin?: TSpacing;
    /** Margin from left and right sides */
    marginHorizontal?: TSpacing;
    /** Margin from left side only */
    marginVertical?: TSpacing;
    /** Margin from left side only */
    marginLeft?: TSpacing;
    /** Margin from right side only */
    marginRight?: TSpacing;
    /** Margin from top side only */
    marginTop?: TSpacing;
    /** Margin from bottom side only */
    marginBottom?: TSpacing;
}