import { render, screen } from '@testing-library/react';

import { mockRepository } from '@/mocks/github/repositoryItem';
import { Repository } from '@/types/github';

import { RepositoryItem } from '.';

describe('RepositoryItem', () => {
    it('renders repository info correctly', () => {
        render(<RepositoryItem repository={mockRepository as Repository} />);

        // Full repo name
        expect(screen.getByText(mockRepository.full_name)).toBeInTheDocument();
        // Stars
        expect(screen.getByText(mockRepository.stargazers_count)).toBeInTheDocument();
        // Description
        expect(screen.getByText(mockRepository.description)).toBeInTheDocument();

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', `/repository/${mockRepository.owner.login}/${mockRepository.name}`);
        expect(link).toHaveAttribute('target', '_blank');
    });
});
