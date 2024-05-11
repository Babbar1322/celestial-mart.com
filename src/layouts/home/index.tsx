import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import CategoryNav from './CategoryNav';
import Footer from './Footer';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const HomeLayout: FC = () => {
    const isMobile = useMediaQuery('(min-width: 768px)');
    return (
        <div>
            <div className="d-none d-md-block bg-dark text-white py-2 px-5" role="region" aria-label="Announcement">
                <div className="row align-items-center justify-content-between">
                    <div className="col-md">
                        Need help? Call Us:{' '}
                        <a href="tel: 780-521-3000" title="tel: 780-521-3000">
                            780-521-3000
                        </a>
                    </div>
                    <div className="col-md fs-5 text-end">
                        <span>Free delivery Grande Prarire</span>
                    </div>
                </div>
            </div>
            {/* <div className="sticky-top mb-3"> */}
            <Navbar />
            <hr className="m-0" />
            <CategoryNav />
            {/* </div> */}
                <Outlet />
            {isMobile && <Footer />}
        </div>
    );
};

export default HomeLayout;
