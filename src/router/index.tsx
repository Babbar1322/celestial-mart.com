// import { selectIsLoggedIn } from "@/redux/slices/authSlice";
import { FC } from "react";
// import { useSelector } from "react-redux";
// import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

/** Pages */
import HomeLayout from "@/layouts/home";
import NotFound from "@/pages/error/not-found";
import HomePage from "@/pages/home-page";
import LoginPage from "@/pages/auth/login-page";
import SignupPage from "@/pages/auth/signup-page";
import ForgotPasswordPage from "@/pages/auth/forgot-password-page";
import CartPage from "@/pages/cart-page";
import ProductDetailsPage from "@/pages/products/product-details-page";
import ShopPage from "@/pages/shop";
import SearchPage from '@/pages/search-page.tsx';
import CheckoutPage from "@/pages/checkout";
import ProfilePage from "@/pages/profile";

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/redux/slices/authSlice";
import OrdersPage from "@/pages/orders";
import OrderDetails from "@/pages/orders/order-details";
import ContactUsPage from "@/pages/contact-us-page";
import AboutUsPage from "@/pages/about-us-page";

const Router: FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const requireLogin = (route: RouteObject) => ({
    ...route,
    element: (
      <>{isLoggedIn ? route.element : <Navigate to="/login" replace />}</>
    ),
  });

  const redirectIfLogin = (route: RouteObject) => ({
    ...route,
    element: (
      <>{isLoggedIn ? <Navigate to="/" replace /> : route.element}</>
    )
  })
  const element = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        redirectIfLogin({
          path: 'login',
          element: <LoginPage />
        }),
        redirectIfLogin({
          path: 'signup',
          element: <SignupPage />
        }),
        redirectIfLogin({
          path: 'forgot-password',
          element: <ForgotPasswordPage />
        }),
        {
          path: 'cart',
          element: <CartPage />
        },
        {
          path: 'products/:id',
          element: <ProductDetailsPage />
        },
        {
          path: 'shop/:category?/:sub?',
          element: <ShopPage />
        },
        {
          path: 'search/:query',
          element: <SearchPage />
        },
        {
          path: 'contact-us',
          element: <ContactUsPage />
        },
        {
          path: 'about-us',
          element: <AboutUsPage />
        },
        requireLogin({
          path: 'checkout',
          element: <CheckoutPage />
        }),
        requireLogin({
          path: 'profile',
          element: <ProfilePage />
        }),
        requireLogin({
          path: 'orders',
          element: <OrdersPage />
        }),
        requireLogin({
          path: 'orders/:orderId',
          element: <OrderDetails />
        }),
      ]
    },
    {
      path: '*',
      element: <NotFound />
    },
  ]);

  return element;
};

export default Router;
