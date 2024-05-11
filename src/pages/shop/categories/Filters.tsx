import Typography from '@/components/Typography';
import { HttpClient } from '@/config/http-client';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

interface IUnits {
    unit: number | string;
}

const Filters = () => {
    const navigate = useNavigate();
    const { data } = useQuery({
        queryKey: ['unique-units'],
        queryFn: async () => {
            const res: {
                status: boolean;
                units: IUnits[];
                filter: IUnits['unit'];
            } = await HttpClient.get('/unique_units');
            return res.units;
        },
    });

    const filterArray = location.search.replace('?', '').split('=');
    return (
        <div>
            <Typography as="h5" center className="d-none d-lg-block">
                Filters
            </Typography>
            <div className="form-floating mb-3">
                <select
                    className="form-select"
                    id="filter"
                    onChange={(ev) => navigate(`?filter=${ev.target.value}`)}
                    value={filterArray[filterArray.indexOf('filter') + 1]}
                >
                    <option value=''>All</option>
                    {data?.sort((a, b) => +a.unit - +b.unit).map(({ unit }) => (
                        <option value={unit} key={unit}>
                            {unit} ml
                        </option>
                    ))}
                </select>
                <label htmlFor="filter">Filter</label>
            </div>
            <hr />
        </div>
    );
};

export default Filters;
