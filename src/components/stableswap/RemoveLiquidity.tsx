import BigNumber from 'bignumber.js';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { wallet } from '~services/near';
import { FaRegQuestionCircle, FaSearch } from 'react-icons/fa';
import { FormattedMessage, useIntl } from 'react-intl';
import Alert from '~components/alert/Alert';
import { ConnectToNearBtn, SolidButton } from '~components/button/Button';
import { Card } from '~components/card/Card';
import InputAmount from '~components/forms/InputAmount';
import {
  PoolSlippageSelector,
  StableSlipSelecter,
} from '~components/forms/SlippageSelector';
import { TokenMetadata } from '~services/ft-contract';
import {
  Pool,
  predictRemoveLiquidity,
  removeLiquidityFromStablePool,
  removeLiquidityByTokensFromStablePool,
  removeLiquidityFromPool,
} from '~services/pool';
import { GetAmountToBalances } from '~services/stable-swap';
import { TokenBalancesView } from '~services/token';
import { usePredictRemoveShares, useRemoveLiquidity } from '~state/pool';
import { useFarmStake } from '~state/farm';
import {
  percent,
  percentLess,
  percentOf,
  subtraction,
  toInternationalCurrencySystem,
  toNonDivisibleNumber,
  toPrecision,
  toReadableNumber,
  toRoundedReadableNumber,
  percentIncrese,
  scientificNotationToString,
} from '~utils/numbers';
import { toRealSymbol } from '~utils/token';
import { STABLE_LP_TOKEN_DECIMALS } from './AddLiquidity';
import { InfoLine } from './LiquidityComponents';
import StableTokenList, {
  FlexibleStableTokenList,
  StableTokensSymbol,
} from './StableTokenList';
import { ShareInFarm } from '~components/layout/ShareInFarm';
import { Link } from 'react-router-dom';

const SWAP_SLIPPAGE_KEY = 'REF_FI_STABLE_SWAP_REMOVE_LIQUIDITY_SLIPPAGE_VALUE';

export function shareToUserTotal({
  shares,
  userTotalShare,
}: {
  shares: string;
  userTotalShare: BigNumber;
}) {
  return (
    <div className="text-xs">
      <span className="text-white">
        {toRoundedReadableNumber({
          decimals: STABLE_LP_TOKEN_DECIMALS,
          number: shares,
          precision: 3,
        })}
      </span>

      <span className="text-primaryText">{` / ${toRoundedReadableNumber({
        decimals: STABLE_LP_TOKEN_DECIMALS,
        number: scientificNotationToString(userTotalShare.toExponential()),
        precision: 3,
      })}`}</span>
    </div>
  );
}

export function RemoveLiquidityComponent(props: {
  shares: string;
  balances: TokenBalancesView;
  tokens: TokenMetadata[];
  pool: Pool;
  stakeList: Record<string, string>;
}) {
  const { shares, tokens, pool, stakeList } = props;
  const [firstTokenAmount, setFirstTokenAmount] = useState<string>('');
  const [secondTokenAmount, setSecondTokenAmount] = useState<string>('');
  const [thirdTokenAmount, setThirdTokenAmount] = useState<string>('');
  const [isPercentage, setIsPercentage] = useState<boolean>(true);
  const [amountByShare, setAmountByShare] = useState<string>('');
  const [slippageTolerance, setSlippageTolerance] = useState<number>(0.5);
  const [canSubmitByShare, setCanSubmitByShare] = useState<boolean>(false);
  const [canSubmitByToken, setCanSubmitByToken] = useState<boolean>(false);

  const intl = useIntl();
  const [sharePercentage, setSharePercentage] = useState<string>('0');
  const progressBarIndex = [0, 25, 50, 75, 100];
  const [receiveAmounts, setReceiveAmounts] = useState<string[]>(['', '', '']);

  const balances = GetAmountToBalances({
    tokens,
    pool,
    amounts: [firstTokenAmount, secondTokenAmount, thirdTokenAmount],
    userShare: shares,
  });

  const farmStake = useFarmStake({
    poolId: pool.id,
    stakeList,
  });

  const setAmountsFlexible = [
    setFirstTokenAmount,
    setSecondTokenAmount,
    setThirdTokenAmount,
  ];

  const predicedRemoveShares = usePredictRemoveShares({
    pool_id: pool.id,
    amounts: [firstTokenAmount, secondTokenAmount, thirdTokenAmount],
    tokens,
  });

  function validate({
    firstAmount,
    secondAmount,
    thirdAmount,
    token,
    setError,
    amount,
    max,
  }: {
    firstAmount: string;
    secondAmount: string;
    thirdAmount: string;
    token: TokenMetadata;
    index: number;
    amount: string;
    max: string;
    setError: (error: Error) => void;
  }) {
    setError(null);
    setCanSubmitByToken(false);

    if (
      new BigNumber(amount).isGreaterThan(new BigNumber(max)) &&
      Number(amount) > 0
    ) {
      throw new Error(
        `${intl.formatMessage({
          id: 'out_of_avaliable_shares',
        })} ${toRealSymbol(token.symbol)}`
      );
    }

    if (
      Number(firstAmount) > 0 ||
      Number(secondAmount) > 0 ||
      Number(thirdAmount) > 0
    ) {
      setCanSubmitByToken(true);
    }
  }

  function submit() {
    if (isPercentage) {
      const removeShares = toNonDivisibleNumber(
        STABLE_LP_TOKEN_DECIMALS,
        amountByShare
      );

      const min_amounts = receiveAmounts.map((amount, i) =>
        toNonDivisibleNumber(
          tokens[i].decimals,
          percentLess(
            slippageTolerance,

            toReadableNumber(tokens[i].decimals, amount)
          )
        )
      );

      return removeLiquidityFromStablePool({
        id: pool.id,
        min_amounts: min_amounts as [string, string, string],
        shares: removeShares,
      });
    } else {
      const amounts = [
        firstTokenAmount,
        secondTokenAmount,
        thirdTokenAmount,
      ].map((amount, i) => {
        return toNonDivisibleNumber(tokens[i].decimals, amount);
      }) as [string, string, string];

      const max_burn_shares = toPrecision(
        percentIncrese(slippageTolerance, predicedRemoveShares),
        0
      );

      return removeLiquidityByTokensFromStablePool({
        id: pool.id,
        amounts,
        max_burn_shares,
      });
    }
  }
  const userTotalShare = BigNumber.sum(shares, farmStake);

  const calcSharesRemoved = () => {
    const nonPrecisionValue = percentLess(
      slippageTolerance,
      toReadableNumber(STABLE_LP_TOKEN_DECIMALS, predicedRemoveShares)
    );
    return Number(nonPrecisionValue) > 0 && Number(nonPrecisionValue) < 0.001
      ? '< 0.001'
      : toPrecision(nonPrecisionValue, 3);
  };

  useEffect(() => {
    const rememberedSlippageTolerance =
      localStorage.getItem(SWAP_SLIPPAGE_KEY) || slippageTolerance;

    setSlippageTolerance(Number(rememberedSlippageTolerance));
  }, []);

  useEffect(() => {
    const readableShares = toReadableNumber(STABLE_LP_TOKEN_DECIMALS, shares);

    const shareParam = toNonDivisibleNumber(
      STABLE_LP_TOKEN_DECIMALS,
      amountByShare
    );

    setCanSubmitByShare(false);
    predictRemoveLiquidity(pool.id, shareParam).then((res) => {
      if (
        Number(amountByShare) === 0 ||
        Number(amountByShare) > Number(readableShares)
      ) {
        setCanSubmitByShare(false);
        setReceiveAmounts(['0', '0', '0']);
      } else {
        setCanSubmitByShare(true);
        setReceiveAmounts(res);
      }
    });
  }, [sharePercentage, tokens, amountByShare]);

  const canSubmit =
    (isPercentage && canSubmitByShare) || (!isPercentage && canSubmitByToken);

  return (
    <Card
      padding="py-6 px-0"
      bgcolor="bg-cardBg"
      className="text-white outline-none w-full "
    >
      <div className="text-xl pb-4 px-8">
        <FormattedMessage
          id="remove_liquidity"
          defaultMessage="Remove Liquidity"
        />
      </div>

      <div className=" text-white flex items-center justify-between text-xs px-8 pb-6">
        <span className="text-primaryText">
          <FormattedMessage id="my_shares" defaultMessage="Shares" />
          <FaRegQuestionCircle
            data-type="dark"
            data-place="right"
            data-multiline={true}
            data-tip={intl.formatMessage({ id: 'shares_tip' })}
            className="inline-block ml-2 text-xs"
          />
          <ReactTooltip
            className="text-xs shadow-4xl"
            backgroundColor="#1D2932"
            effect="solid"
            class="tool-tip"
            textColor="#7E8A93"
          />
        </span>
        <div className="flex items-center">
          <span>
            {shareToUserTotal({
              shares,
              userTotalShare,
            })}{' '}
          </span>
          <Link
            className="ml-2"
            to={{
              pathname: '/farms',
            }}
            target="_blank"
          >
            <ShareInFarm
              userTotalShare={userTotalShare}
              farmStake={farmStake}
              forStable
            />
          </Link>
        </div>
      </div>

      <div className="flex bg-inputDarkBg rounded text-white mx-8 p-1.5 mb-8">
        <div
          className={`flex justify-center items-center w-2/4 rounded cursor-pointer ${
            isPercentage ? 'bg-framBorder' : ''
          }  h-9`}
          onClick={() => setIsPercentage(true)}
        >
          <FormattedMessage id="by_share" defaultMessage="By Share" />
          <FaRegQuestionCircle
            data-type="dark"
            data-place="right"
            data-multiline={true}
            data-tip={intl.formatMessage({ id: 'remove_tip' })}
            className="inline-block ml-2 text-xs"
          />
          <ReactTooltip
            className="text-xs shadow-4xl"
            backgroundColor="#1D2932"
            effect="solid"
            class="tool-tip"
            textColor="#7E8A93"
          />
        </div>

        <div
          className={`flex justify-center items-center w-2/4 rounded cursor-pointer ${
            !isPercentage ? 'bg-framBorder' : ''
          }  h-9`}
          onClick={() => setIsPercentage(false)}
        >
          <FormattedMessage id="by_token" defaultMessage="By Token" />
          <FaRegQuestionCircle
            data-type="dark"
            data-place="right"
            data-multiline={true}
            data-tip={intl.formatMessage({ id: 'flexible_tip' })}
            className="inline-block ml-2 text-xs"
          />
          <ReactTooltip
            className="text-xs shadow-4xl"
            backgroundColor="#1D2932"
            effect="solid"
            class="tool-tip"
            textColor="#7E8A93"
          />
        </div>
      </div>
      {/* Remove by share */}
      {isPercentage && (
        <section className="mx-8">
          <div className="flex">
            <div className="flex items-center justify-between mr-4">
              <p className="text-primaryText text-xs whitespace-nowrap">
                <FormattedMessage
                  id="shares_removed"
                  defaultMessage="Shares removed"
                />
              </p>
            </div>

            <InputAmount
              value={amountByShare}
              onChangeAmount={(amount) => {
                setAmountByShare(amount);

                const percentage =
                  Number(shares) > 0
                    ? percent(
                        amount || '0',
                        toReadableNumber(STABLE_LP_TOKEN_DECIMALS, shares)
                      ).toString()
                    : '0';

                setSharePercentage(scientificNotationToString(percentage));
              }}
              className="w-full border border-transparent rounded"
              max={toReadableNumber(STABLE_LP_TOKEN_DECIMALS, shares)}
            />
          </div>
          <div className="my-6 mb-8">
            <div className="flex items-center justify-between text-gray-400 pl-0.5">
              {progressBarIndex.map((index, i) => {
                return (
                  <div className="flex flex-col items-center text-xs" key={i}>
                    <span>{index}%</span>
                    <span>∣</span>
                  </div>
                );
              })}
            </div>
            <div className="py-1 pr-1">
              <input
                onChange={(e) => {
                  const p = e.target.value;
                  setSharePercentage(e.target.value);
                  const sharePercentOf = percentOf(
                    Number(p),
                    toReadableNumber(STABLE_LP_TOKEN_DECIMALS, shares)
                  ).toString();
                  setAmountByShare(sharePercentOf);
                }}
                value={sharePercentage}
                type="range"
                className="w-full cursor-pointer"
                min="0"
                max="100"
                step="any"
              />
            </div>
          </div>
        </section>
      )}
      {/* remove by token */}
      {!isPercentage && (
        <section className="px-8">
          <FlexibleStableTokenList
            amountsFlexible={[
              firstTokenAmount,
              secondTokenAmount,
              thirdTokenAmount,
            ]}
            setAmountsFlexible={setAmountsFlexible}
            tokens={tokens}
            validate={validate}
            balances={balances}
          />
        </section>
      )}

      <div className="mt-4 px-8 w-full border-primaryText border-opacity-30 border-t">
        <div className="text-xs pt-2">
          <StableSlipSelecter
            slippageTolerance={slippageTolerance}
            onChange={(slippage) => {
              setSlippageTolerance(slippage);
              localStorage.setItem(SWAP_SLIPPAGE_KEY, slippage?.toString());
            }}
          />
          {isPercentage && (
            <div className="text-xs text-primaryText pb-8 pt-2">
              <FormattedMessage
                id="minimum_received"
                defaultMessage="Minimum received"
              />
            </div>
          )}

          {isPercentage && (
            <StableTokensSymbol
              tokens={tokens}
              receiveAmounts={receiveAmounts}
              slippageTolerance={slippageTolerance}
            />
          )}
        </div>
        <div
          className={`flex items-center justify-between text-xs text-primaryText pb-6 ${
            isPercentage ? 'hidden' : ''
          }`}
        >
          <div>
            <FormattedMessage
              id="shares_removed"
              defaultMessage="Shares removed"
            />
          </div>
          <div className="text-white">{calcSharesRemoved()}</div>
        </div>

        {wallet.isSignedIn() ? (
          <SolidButton
            disabled={!canSubmit}
            className={`focus:outline-none px-4 w-full text-lg`}
            onClick={async () => {
              canSubmit && submit();
            }}
          >
            <FormattedMessage
              id="remove_liquidity"
              defaultMessage="Remove Liquidity"
            />
          </SolidButton>
        ) : (
          <ConnectToNearBtn />
        )}
      </div>
    </Card>
  );
}
