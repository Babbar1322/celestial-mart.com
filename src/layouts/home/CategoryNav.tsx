import RouterLink from '@/components/RouterLink';
import React from 'react';

const CategoryNav = React.memo(() => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top mb-3 z-4 z-lg-4 py-0 py-lg-2">
            <div className="container overflow-auto">
                {/* <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation"
                >
                    <RemixIcon name='menu-2-line' /> Menu
                </button> */}
                <div
                    className="offcanvas offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                            Celestial Mart
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            id='close-sidebar'
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item px-3 fs-6">
                                <RouterLink color="dark" to="/" className="d-block my-2 fw-medium">
                                    Home
                                </RouterLink>
                            </li>
                            <li className="nav-item px-3 fs-6">
                                <RouterLink color="dark" to="/shop" className="d-block my-2 fw-medium">
                                    Shop
                                </RouterLink>
                            </li>
                            <li className="nav-item px-3 fs-6">
                                <RouterLink color="dark" to={"/shop/grocery"} className="d-block my-2 fw-medium">
                                    Grocery
                                </RouterLink>
                            </li>
                            <li className="nav-item px-3 fs-6">
                                <RouterLink color="dark" to={"/shop/alcohol"} className="d-block my-2 fw-medium">
                                    Alcohol
                                </RouterLink>
                            </li>
                            <li className="nav-item px-3 fs-6">
                                <RouterLink color="dark" to={"/shop/smoke-vapes"} className="d-block my-2 fw-medium">
                                    Smoke &amp; Vapes
                                </RouterLink>
                            </li>
                            {/* <li className="nav-item dropdown has-megamenu fs-6">
                                <a className="nav-link link-dark dropdown-toggle fw-medium px-3" href="#" data-bs-toggle="dropdown">
                                    Drinks
                                </a>
                                <div className="dropdown-menu megamenu">
                                    <div className="row g-3">
                                        <div className="col-lg-4 border-end px-6">
                                            <div className="col-megamenu">
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Produce
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Fresh Vegetables
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Fresh Fruits
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Organic Produce
                                                </RouterLink>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 border-end px-6">
                                            <div className="col-megamenu">
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Dairy &amp; Eggs
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Milk
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Eggs
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Packaged cheese
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Yogurt
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Butter{' '}
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Cream
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Other Creams & Cheeses
                                                </RouterLink>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 px-6">
                                            <div className="col-megamenu">
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Meat & Sea Foods
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Meat
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Poultry
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Sea Food
                                                </RouterLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li> */}
                            {/* <li className="nav-item dropdown has-megamenu fs-6">
                                <a
                                    className="nav-link link-dark dropdown-toggle fw-medium px-3"
                                    href="#"
                                    data-bs-toggle="dropdown"
                                >
                                    Smoke
                                </a>
                                <div className="dropdown-menu megamenu" role="menu">
                                    <div className="row g-3">
                                        <div className="col-lg-4 border-end px-6">
                                            <div className="col-megamenu">
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Spices & Masalas
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Ready Masalas
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    NonVeg Masalas
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Whole Spices
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Powder Spices
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Cooking Paste
                                                </RouterLink>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 border-end px-6">
                                            <div className="col-megamenu">
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Dals & Pulses
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Soya Products
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Dals
                                                </RouterLink>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 px-6">
                                            <div className="col-megamenu">
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Rice &amp; Flours
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Other Flours
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Pasta
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Other Rice Products
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    South Indian Rice
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Basmati Rice
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Maida
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Sooji &amp; Rava
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Besan
                                                </RouterLink>
                                                <RouterLink color="dark" to="#" className="d-block my-2">
                                                    Wheat Flour
                                                </RouterLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li> */}
                            <li className="nav-item px-3 fs-6">
                                <RouterLink color="dark" to="/contact-us" className="d-block my-2 fw-medium">
                                    Contact Us
                                </RouterLink>
                            </li>
                            <li className="nav-item px-3 fs-6">
                                <RouterLink color="dark" to="/about-us" className="d-block my-2 fw-medium">
                                    About Us
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
});

export default CategoryNav;
