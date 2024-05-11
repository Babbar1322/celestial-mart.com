import { FC, memo } from 'react';
import { useQuery } from 'react-query';
import CategoryItem from './CategoryItem';
import Skeleton from 'react-loading-skeleton';

import { HttpClient } from '@/config/http-client';
import { ICategory } from '@/typings/data';
import Typography from '@/components/Typography';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Filters from './Filters';
import { useParams } from 'react-router-dom';

const Categories: FC = memo(() => {
    const params = useParams()
    const { isLoading, data } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res: { status: boolean; categories: ICategory[] } = await HttpClient.get('/categories');
            return res.categories;
        },
    });

    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <div className="col-lg-3 col-xl-2 border-end z-3 mt-0 mt-lg-4" id="side-bar">
            <div className="sticky-top" style={{ top: isMobile ? 0 : 60 }}>
                {params?.category === 'alcohol' && <Filters />}
                <Typography as="h5" center className="d-none d-lg-block">
                    Categories
                </Typography>
                <nav className="navbar navbar-expand-lg flex-column align-items-start">
                    <div className="container">
                        <div
                            className="offcanvas offcanvas-end"
                            tabIndex={-1}
                            id="category"
                            aria-labelledby="categoryLabel"
                        >
                            <div className="offcanvas-header">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    id="category-close"
                                ></button>
                            </div>
                            <div className="offcanvas-body px-3">
                                <ul className="nav nav-pills flex-column mb-auto sidebar">
                                    {isLoading ? (
                                        <Skeleton count={8} className="mb-3 link-dark d-block mb-3" />
                                    ) : (
                                        data?.map((item) => <CategoryItem key={item.id} {...item} />)
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
});

export default Categories;
