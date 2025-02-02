import React, { useState } from 'react';
import { TiArrowSortedUp } from 'react-icons/ti';
import { TokenMetadata } from '../../services/ft-contract';
import { TokenBalancesView } from '~services/token';
import { toReadableNumber } from '~utils/numbers';
import Token from '~components/tokens/Token';
import { FormattedMessage } from 'react-intl';

interface TokenListProps {
  tokens: TokenMetadata[];
  sortBy: string;
  currentSort: string;
  onSortChange?: (sortBy: string) => void;
  onClick?: (token: TokenMetadata) => void;
  balances?: TokenBalancesView;
}

export default function Table({
  tokens,
  sortBy,
  currentSort,
  onSortChange,
  onClick,
  balances,
}: TokenListProps) {
  return (
    tokens.length > 0 && (
      <table className="text-left w-full text-sm text-gray-400 mt-10 table-auto">
        <thead
          className="sticky -top-6 z-30"
          style={{ background: 'rgb(29, 41, 50)' }}
        >
          <tr className="font-normal border-b border-gray-500 border-opacity-30">
            <th
              className={`font-normal w-2/5 pb-2 pl-6  ${
                sortBy === 'asset' ? 'text-greenLight' : ''
              }`}
            >
              <span
                className="cursor-pointer"
                onClick={() => onSortChange('asset')}
              >
                <FormattedMessage id="asset_label" defaultMessage="Asset" />
              </span>
              <TiArrowSortedUp
                className={`inline-block cursor-pointer ${
                  sortBy === 'asset' && currentSort === 'down'
                    ? 'transform rotate-180'
                    : ''
                }`}
              />
            </th>
            <th
              className={`font-normal pb-2 w-1/5  ${
                sortBy === 'near' ? 'text-greenLight' : ''
              }`}
            >
              <span
                className="cursor-pointer"
                onClick={() => onSortChange('near')}
              >
                {' '}
                NEAR
                <TiArrowSortedUp
                  className={`inline-block cursor-pointer ${
                    sortBy === 'near' && currentSort === 'down'
                      ? 'transform rotate-180'
                      : ''
                  }`}
                />
              </span>
            </th>
            <th
              className={`font-normal pb-2 w-1/5 ${
                sortBy === 'ref' ? 'text-greenLight' : ''
              }`}
            >
              <span
                className="cursor-pointer"
                onClick={() => onSortChange('ref')}
              >
                REF
                <TiArrowSortedUp
                  className={`inline-block cursor-pointer ${
                    sortBy === 'ref' && currentSort === 'down'
                      ? 'transform rotate-180'
                      : ''
                  }`}
                />
              </span>
            </th>
            <th
              className={`font-normal pb-2 pr-3 w-1/5 ${
                sortBy === 'total' ? 'text-greenLight' : ''
              }`}
            >
              <span
                className="cursor-pointer"
                onClick={() => onSortChange('total')}
              >
                <FormattedMessage id="total_label" defaultMessage="Total" />
                <TiArrowSortedUp
                  className={`inline-block cursor-pointer ${
                    sortBy === 'total' && currentSort === 'down'
                      ? 'transform rotate-180'
                      : ''
                  }`}
                />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tokens.filter(Boolean).map((token) => (
            <Token
              key={token.id}
              token={token}
              onClick={onClick}
              // render={render}
              sortBy={sortBy}
              totalAmount={
                balances
                  ? toReadableNumber(token.decimals, balances[token.id])
                  : ''
              }
            />
          ))}
        </tbody>
      </table>
    )
  );
}
