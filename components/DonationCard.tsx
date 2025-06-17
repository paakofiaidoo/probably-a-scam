
import React from 'react';
import { BUY_ME_A_COFFEE_URL } from '../constants.tsx';

const BuyMeACoffeeCard: React.FC = () => {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600 mb-2">
        Find this helpful? Consider supporting future development.
      </p>
      <a
        href={BUY_ME_A_COFFEE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-accent text-gray-900 font-semibold rounded-md shadow-sm hover:bg-yellow-400 transition-colors text-sm transform hover:scale-105"
        aria-label="Buy Me a Coffee to support the developer"
      >
        ☕ Buy Me a Coffee
      </a>
    </div>
  );
};

export default BuyMeACoffeeCard;