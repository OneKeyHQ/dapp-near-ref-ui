import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';

export const useFarmStake = ({
  poolId,
  stakeList,
}: {
  poolId: number;
  stakeList: Record<string, string>;
}) => {
  const [farmStake, setFarmStake] = useState<string | number>('0');

  useEffect(() => {
    const seedIdList: string[] = Object.keys(stakeList);
    let tempFarmStake: string | number = '0';
    seedIdList.forEach((seed) => {
      const id = Number(seed.split('@')[1]);
      if (id == poolId) {
        tempFarmStake = BigNumber.sum(farmStake, stakeList[seed]).valueOf();
      }
    });
    setFarmStake(tempFarmStake);
  }, [stakeList]);

  return farmStake;
};
