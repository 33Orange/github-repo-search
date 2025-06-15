import userEvent from '@testing-library/user-event';

import { render, screen } from '@/helpers/tests/renderWithMantine';
import { mockRepository } from '@/mocks/github/repositoryItem';
import { Repository } from '@/types/github';

import { RepositoriesList } from '.';

const user = userEvent.setup();

const repositories= [mockRepository] as Repository[];

describe('RepositoriesList', () => {
    it('renders a list of repositories', () => {
        render(
            <RepositoriesList
                repositories={repositories}
                currentPage={1}
                totalCount={10}
                onPageChange={jest.fn()}
            />
        );

        expect(screen.getByText(mockRepository.full_name)).toBeInTheDocument();
        expect(screen.getByText(String(mockRepository.stargazers_count))).toBeInTheDocument();
    });

    it('renders PaginationBar when totalCount > 10', () => {
        render(
            <RepositoriesList
                repositories={repositories}
                currentPage={1}
                totalCount={500}
                onPageChange={jest.fn()}
            />
        );

        expect(screen.queryByLabelText('pagination bar')).toBeInTheDocument();
    });

    it('does not render PaginationBar when only one page', () => {
        render(
            <RepositoriesList
                repositories={repositories}
                currentPage={1}
                totalCount={10}
                onPageChange={jest.fn()}
            />
        );

        expect(screen.queryByLabelText('pagination bar')).not.toBeInTheDocument();
    });

    it('calls onPageChange when user changes page', async () => {
        const onPageChange = jest.fn();

        render(
            <RepositoriesList
                repositories={repositories}
                currentPage={1}
                totalCount={50}
                onPageChange={onPageChange}
            />
        );

        const nextButton = screen.getByRole('button', { name: /2/i });
        await user.click(nextButton);

        expect(onPageChange).toHaveBeenCalledWith(2);
    });
});
