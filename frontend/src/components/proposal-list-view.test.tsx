import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProposalListView } from './proposal-list-view';

describe('ProposalListView', () => {
  const mockProposals = [
    {
      id: '1',
      title: 'Park',
      description: 'Community park',
      status: 'OPEN',
    },
    {
      id: '2',
      title: 'Library',
      description: 'Public library',
      status: 'OPEN',
    },
  ];

  it('renders loading state', () => {
    render(<ProposalListView proposals={[]} loading={true} />);
    expect(screen.getByText('Loading proposals...')).toBeInTheDocument();
  });

  it('renders list title', () => {
    render(<ProposalListView proposals={mockProposals} loading={false} />);
    expect(screen.getByText('All Proposals')).toBeInTheDocument();
  });

  it('renders all proposals', () => {
    render(<ProposalListView proposals={mockProposals} loading={false} />);
    expect(screen.getByText('Park')).toBeInTheDocument();
    expect(screen.getByText('Library')).toBeInTheDocument();
  });

  it('renders empty state when no proposals', () => {
    render(<ProposalListView proposals={[]} loading={false} />);
    expect(screen.getByText('All Proposals')).toBeInTheDocument();
  });
});
