import { FC } from 'react';
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import TopBarProgress from 'react-topbar-progress-indicator';
import { HttpClient } from '@/config/http-client';
import { ICategory } from '@/typings/data';
import RouterLink from '@/components/RouterLink';
import Typography from '@/components/Typography';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const colorsArray = [
    'bg-primary-subtle',
    'bg-warning-subtle',
    'bg-danger-subtle',
    'bg-info-subtle',
    'bg-success-subtle',
    'bg-dark-subtle',
];

const TopCategories: FC = () => {
    const isMobile = useMediaQuery('(max-width: 576px)');
    const { isLoading, data } = useQuery({
        queryKey: ['top-categories'],
        queryFn: async () => {
            const res: { categories: ICategory[] } = await HttpClient.get('/top_categories');
            return res.categories;
        },
    });
    return (
        <div>
            {isLoading && <TopBarProgress />}
            <div className="row row-cols-3 row-cols-xs-3 row-cols-lg-6 justify-content-around g-3 overflow-auto">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <div className="col" key={index}>
                              <Skeleton className="rounded-3 rounded-md-4 rounded-lg-5 aspect-1/1" baseColor="#7d7d7d" />
                          </div>
                      ))
                    : data?.map((item, index) => (
                          <div className="col" key={item.id}>
                              <div className={'card border-0 rounded-3 rounded-md-4 rounded-lg-5 h-100 ' + colorsArray[index]}>
                              <RouterLink to={`/shop/${item.slug}`} className='stretched-link'></RouterLink>
                                  <div className="card-body">
                                      <img src={item?.image_link} alt="" className="image-square" />
                                      <Typography fontWeight={isMobile ? 'medium' : 'semibold'} marginTop='2' center style={{fontSize: isMobile ? 12 : 16}}>{item.name}</Typography>
                                      {/* <div className="fw-semibold mt-2 text-center"></div> */}
                                  </div>
                              </div>
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default TopCategories;
