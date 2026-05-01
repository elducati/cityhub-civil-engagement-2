import React from 'react';
import Link from 'next/link';

interface ProposalCardProps {
  proposal: any;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300">
      <Link href={`/proposals/${proposal.id}`} className="text-xl font-bold text-indigo-600 mb-2 line-clamp-1">
        {proposal.title}
      </Link>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{proposal.description}</p>
      <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${
        proposal.status === 'OPEN' ? 'bg-yellow-100 text-yellow-800' :
        proposal.status === 'POSTED' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {proposal.status}
      </span>
      <Link href={`/proposals/${proposal.id}`} className="mt-4 inline-block text-indigo-500 hover:text-indigo-700 font-medium">
        View Details & Vote →
      </Link>
    </div>
  );
};