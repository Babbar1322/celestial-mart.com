import { FC, memo } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import RouterLink from '@/components/RouterLink';
import { ICategory } from '@/typings/data';

const CategoryItem: FC<ICategory> = memo(({ name, sub_categories, slug }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = sub_categories?.some((item) => location.pathname.includes(item.slug)) || location.pathname.includes(slug);

    if (sub_categories?.length ?? 0 > 0) {
        return (
            <li className="nav-item">
                <RouterLink
                    to={`/shop/${slug}`}
                    onClick={() => navigate(`/shop/${slug}`)}
                    className={cn('nav-link link-dark d-block mb-3', {
                        collapsed: !isActive,
                        'text-white': isActive,
                    })}
                    active={isActive}
                    data-bs-toggle="collapse"
                    data-bs-target={`#${slug}-collapse`}
                    aria-expanded={isActive}
                >
                    {name}
                </RouterLink>
                <div
                    className={cn('collapse', {
                        show: isActive,
                    })}
                    id={`${slug}-collapse`}
                >
                    <ul className="nav nav-pills flex-column btn-toggle-nav list-unstyled fw-normal ms-4 mb-3">
                        {sub_categories?.map((sub) => (
                            <li key={sub.id} className='nav-item d-block'>
                                <RouterLink to={`/shop/${slug}/${sub.slug}`} className={cn('mb-2 d-block nav-link', {'text-white': location.pathname.includes(sub.slug)})} active={location.pathname.includes(sub.slug)}>{sub.name}</RouterLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </li>
        );
    }
    return (
        <li className="nav-item">
            <RouterLink to={`/shop/${slug}`} active={isActive} className={cn("nav-link link-dark d-block mb-3", {
                'text-white': isActive,
            })}>{name}</RouterLink>
        </li>
    );
});

export default CategoryItem;
