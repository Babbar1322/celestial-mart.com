interface CommonData {
    id: number;
    created_at: Date;
    updated_at: Date;
}

export interface PaginateData<response> {
    current_page: 1;
    data: response[];
    first_page_url: URL;
    from: number | null;
    last_page: number;
    last_page_url: URL;
    links: {
            url: URL | null;
            label: string;
            active: boolean;
        }[];
    next_page_url: URL | null;
    path: URL;
    per_page: number;
    prev_page_url: URL | null;
    to: number | null;
    total: number;
}

export interface CommonAxiosResponse {
    status: boolean;
    message?: string;
    error?: string | null | object;
    errors?: string | null | object;
}

export interface AuthUser {
    id?: number;
    name?: string;
    email?: string;
    is_admin?: boolean | null;
    email_verified_at?: null | Date;
    password?: string;
    remember_token?: null | string;
    created_at?: Date;
    updated_at?: Date;
}

export interface ICategory extends CommonData {
    image: string;
    image_link: string;
    name: string;
    sub_categories?: ISubCategory[];
    slug: string;
}

export interface ISubCategory extends CommonData {
    name: string;
    slug: string;
    category_id: number;
    description: string;
    image: string;
}

export interface IProductUnit extends CommonData {
    product_id: number;
    unit: number;
    unit_type: string;
    price: number;
    gst: number;
    quantity: number;
}

export interface IProductImage extends CommonData {
    product_id: number;
    image: string;
    image_link: string;
}

export interface IProduct extends CommonData {
    product_units: IProductUnit[];
    description: string | null;
    discount: number | null;
    name: string;
    category_id: number | null;
    subcategory_id: number | null;
    sku: string | null;
    status: string | null;
    image: IProductImage;
}

export interface IAddress extends CommonData {
    user_id: number;
    name: string;
    phone: string;
    address_line1: string;
    address_line2?: string | null;
    city: string;
    state: string;
    zip: string;
    type: "Delivery" | "Shipping";
}

export interface IOrder extends CommonData {
    user_id: number;
    address_id: number;
    order_id: number | null;
    total_price: number;
    total_quantity: number;
    payment_type: string;
    order_products?: IOrderProducts[] | null;
    remarks: string | null;
    address?: IAddress | null;
    status: "Pending" | "Confirmed" | "Out For Delivery" | "Delivered" | "Cancelled" | "Rejected";
}

export interface IOrderProducts extends CommonData {
    order_id: number;
    product_id: number;
    product_unit_id: number;
    name: string;
    price: string;
    quantity: string;
    total: string;
    product?: IProduct | null;
}

export interface IBlog extends CommonData {
    title: string;
    description: string;
    author?: string;
    content: string;
    image: string;
    image_link: string;
}