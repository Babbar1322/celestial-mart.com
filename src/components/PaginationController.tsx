import { FC, memo } from 'react';
import cn from 'classnames';

interface PaginationControllerProps {
    currentPage: number;
    lastPage: number;
    from?: number;
    onPageChange: (page: number) => void;
    to?: number;
    total?: number;
}

const PaginationController: FC<PaginationControllerProps> = memo(
    ({ currentPage, lastPage, onPageChange, from, to, total }) => {
        return (
            <div className="text-center">
                {!!from && !!to && !!total && (
                    <div className="mb-3">
                        Showing from {from} to {to} of Total {total}
                    </div>
                )}
                {lastPage > 1 && (
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li
                                className={cn('page-item z-0', {
                                    disabled: currentPage <= 1,
                                })}
                            >
                                <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                                    Previous
                                </button>
                            </li>
                            {Array.from({ length: lastPage }).map((_, index) => (
                                <li
                                    className={cn('page-item z-0', {
                                        active: currentPage === index + 1,
                                    })}
                                    key={index}
                                >
                                    <button className="page-link" onClick={() => onPageChange(index + 1)}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li
                                className={cn('page-item z-0', {
                                    disabled: currentPage >= lastPage,
                                })}
                            >
                                <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        );
    }
);

export default PaginationController;
