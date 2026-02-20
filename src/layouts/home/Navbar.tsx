import React, { useState } from 'react';
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { selectIsLoggedIn } from '@/redux/slices/authSlice';
import { useScroll } from '@/hooks/useScroll';
import Container from '@/components/Container';
import RemixIcon from '@/components/RemixIcon';
import RouterLink from '@/components/RouterLink';
import { Input } from '@/components/input';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Navbar = React.memo(() => {
    const { totalItems } = useCart();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const offset = useScroll(200);
    const isMobile = useMediaQuery('(max-width: 991px)');
    return (
        <div className="navbar navbar-expand-lg bg-white">
            <Container>
                <RouterLink to="/" className="nav-brand w-50 w-md-25 order-1">
                    <img src="/ecommerce/assets/images/logo-dark.png" className="w-100" />
                </RouterLink>
                {offset > 0 && (<div style={{height: 150}}></div>)}
                <div className={cn("navbar row align-items-center justify-content-between w-100 w-lg-50 mx-lg-5 order-3 order-lg-2 m-0 z-2 animate__animated animate__faster", {'position-fixed top-0 start-0 end-0 w-100 bg-white px-3 animate__slideInDown shadow': offset > 0 && isMobile})}>
                    <button
                        className="navbar-toggler col-2"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        {/* <RemixIcon name="menu-2-line" /> */}
                        {/* <div className="d-flex align-items-center gap-2"> */}
                            <img src="/ecommerce/assets/svg/icons/menu.svg" alt="" width={25} />
                            {/* <Typography style={{fontSize: 12}} truncate>Menu</Typography> */}
                        {/* </div> */}
                    </button>
                    <div className='col pe-0'>
                        <Input
                            className="w-100"
                            // inputSize="lg"
                            type="search"
                            placeholder="I'm looking for...."
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(ev) => setSearchQuery(ev.target.value)}
                            onKeyDown={(ev) => {
                                if (ev.key === 'Enter' && searchQuery) {
                                    navigate(`/search/${searchQuery}`);
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="d-flex order-2 order-lg-3 justify-content-end gap-3">
                    <RouterLink to={isLoggedIn ? '/profile' : '/login'} className="nav-link">
                        <RemixIcon name="user-line" color="primary" size={4} />
                        {/* <i className="ri-user-add-fill text-danger fs-4 m-2 icons"></i> */}
                    </RouterLink>
                    {/* <NavLink to="/login" className="nav-link">
                        <i className="ri-heart-3-line text-danger fs-4 m-2 icons"></i>
                    </NavLink> */}
                    <RouterLink to="/cart" className="nav-link position-relative">
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                            {totalItems}
                            <span className="visually-hidden">items in cart</span>
                        </span>
                        <RemixIcon name="shopping-bag-3-line" color="primary" size={4} />
                        {/* <i className="ri-shopping-bag-3-line text-danger m-2 fs-4 icons"></i> */}
                    </RouterLink>
                </div>
            </Container>
        </div>
    );
});

export default Navbar;
