import React from 'react';
import { ProposalCard } from './proposal-card';

interface ProposalListProps {
  proposals: any[];
  loading: boolean;
}

export const ProposalListView: React.FC<ProposalListProps> = ({ proposals, loading }) => {
  if (loading) {
    return <div className="text-center py-10">Loading proposals...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Proposals</h2>
      {proposals.map((proposal) => (
        <ProposalCard key={proposal.id} proposal={proposal} />
      ))}
    </div>
  );
};
  );
}