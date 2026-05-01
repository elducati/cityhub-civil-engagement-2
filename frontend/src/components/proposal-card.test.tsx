import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProposalCard } from './proposal-card';

describe('ProposalCard', () => {
  const mockProposal = {
    id: '123',
    title: 'Build Community Park',
    description: 'A beautiful community park for families',
    status: 'OPEN',
  };

  it('renders proposal title', () => {
    render(<ProposalCard proposal={mockProposal} />);
    expect(screen.getByText('Build Community Park')).toBeInTheDocument();
  });

  it('renders proposal description', () => {
    render(<ProposalCard proposal={mockProposal} />);
    expect(screen.getByText(/A beautiful community park/)).toBeInTheDocument();
  });

  it('renders proposal status badge', () => {
    render(<ProposalCard proposal={mockProposal} />);
    expect(screen.getByText('OPEN')).toBeInTheDocument();
  });

  it('renders view details link', () => {
    render(<ProposalCard proposal={mockProposal} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('shows correct status colors for OPEN status', () => {
    render(<ProposalCard proposal={mockProposal} />);
    const badge = screen.getByText('OPEN');
    expect(badge.className).toContain('bg-yellow-100');
  });

  it('shows correct status colors for POSTED status', () => {
    const postedProposal = { ...mockProposal, status: 'POSTED' };
    render(<ProposalCard proposal={postedProposal} />);
    const badge = screen.getByText('POSTED');
    expect(badge.className).toContain('bg-blue-100');
  });
});
