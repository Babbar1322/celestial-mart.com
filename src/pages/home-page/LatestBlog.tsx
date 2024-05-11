import { FC, JSX, memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import TopBarProgress from 'react-topbar-progress-indicator';
import Container from '@/components/Container';
import Typography from '@/components/Typography';
import { HttpClient } from '@/config/http-client';
import { IBlog } from '@/typings/data';

interface LatestBlogProps {}

const LatestBlog: FC<LatestBlogProps> = memo((): JSX.Element => {
    const {data, isFetching} = useQuery({
        queryKey: ['latest-blogs'],
        queryFn: async () => {
            const res: {status: boolean; blogs: IBlog[]} = await HttpClient.get('/latest_blog');
            return res.blogs;
        }
    });
    return (
        <Container marginTop="9">
            {isFetching && <TopBarProgress />}
            <div className="d-flex justify-content-between align-items-center">
                <Typography as="h2" fontWeight="bold" marginBottom='4'>
                    Latest Blog
                </Typography>
            </div>

            <div className="row row-cols-1 row-cols-md-2 g-3 align-items-center">
                {isFetching ? Array.from({length: 6}).map((_, index) => (
                    <div key={index} className="col">
                        <Skeleton height={200} />
                    </div>
                )) : data?.map((item) => (
                    <div className="col" key={item.id}>
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <img src={item?.image_link} alt="" className="w-100" />
                                    </div>
                                    <div className="col-7">
                                        <code>{new Date(item.created_at).toLocaleDateString('en-IN')}</code>
                                        <Typography marginVertical='2'>@{item.author}</Typography>
                                        <Typography fontSize={5} fontWeight='medium' marginBottom='3'>{item.title}</Typography>
                                        <Typography>{item.description}....</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
});

LatestBlog.displayName = "LatestBlog";

export default LatestBlog;
