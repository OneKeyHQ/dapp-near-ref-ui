import React from 'react';

const zh_CN = {
  deposit: '存入',
  Deposit: '存入',
  withdraw: '提取',
  Withdraw: '提取',
  withdraw_token: '提取代币',
  swap: '兑换',
  Swap: '兑换',
  exchange_tokens: '交换代币',
  pool: '流动池',
  Pool: '流动池',
  pools: '流动池',
  Pools: '流动池',
  Quiz: 'Quiz',
  no_tokens_deposited: '无代币存入',
  view_pools: '查看流动池',
  view_pool: '查看流动池',
  add_token: '添加代币',
  Add_Token: '添加代币',
  create_new_pool: '创建流动池',
  Create_New_Pool: '创建流动池',
  your_liquidity: '你的流动性',
  Your_Liquidity: '你的流动性',
  farms: '农场',
  Farms: '农场',
  airdrop: '空投',
  Airdrop: '空投',
  docs: '文档',
  Docs: '文档',
  community: '社区',
  Community: '社区',
  more: '更多',
  More: '更多',
  account: '账号',
  Account: '账号',
  New_ui: 'New UI',
  Risk: 'Risks',
  Forum: '论坛',
  Discord: 'Discord',
  Telegram: 'Telegram',
  Twitter: 'Twitter',
  Medium: 'Medium',
  move_assets_to_from_ethereum: '以太坊资产桥',
  rainbow_bridge: '以太坊资产桥',
  deposit_to_swap: '存入代币进行兑换',
  connect_to_near: '连接钱包',
  slippage: '滑点',
  slippage_title: '交易设置',
  minimum_received: '可收到的最低数额',
  swap_rate: '兑换汇率',
  pool_fee: '手续费',
  balance: '余额',
  from: '从',
  to: '到',
  submit: '提交',
  wrapnear: 'Wrap NEAR',
  wrapnear_tip_one: 'wNEAR支持您在Ref中交易，',
  wrapnear_tip_two: '请保留至少1个NEAR，',
  wrapnear_tip_three: '以保障gas费充足。',
  wrap_error_msg: '余额不足',
  sign_out: '退出',
  view_account: '查看账户',
  deposit_to_swap_and_add_liquidity: '存入代币兑换或增加流动性',
  small_storage_fee_is_applied_of: '存入手续费为',
  liquidity: '流动性',
  tokens: '代币',
  fee: '手续费',
  fees: '手续费',
  view_detail: '查看详情',
  pool_details: '资金池详情',
  details: '详情',
  detail: '详情',
  liquidity_pools: '流动性资金池',
  minimum_tokens_out: '最少可获得代币数量',
  pair: '交易对',
  tvl: '总锁定价值',
  search_pools: '搜索资金池',
  add_liquidity: '添加流动性',
  remove_liquidity: '移除流动性',
  total_liquidity: '总流动性',
  coming_soon: '敬请期待',
  connect_to_near_tip: '连接您的钱包以提供流动性并查看您的存款',
  accumulated_volume: '累计成交量',
  underlying_liquidity: '基础流动性',
  total_shares: '份额总量',
  my_shares: '份额',
  token: '代币',
  enter_token_address: '输入代币地址',
  you_are_not_providing_liquidity_to_any_pools: '你未提供任何池子的流动性',
  remove: '移除',
  select: '选择代币',
  select_token: '选择代币',
  basis_points: '基点',
  total_fee: '总费用 % ',
  protocol_fee_is: '协议费为 ',
  start_in: '开始',
  start_at: '开始于',
  started_at: '开始于',
  start_date: '开始时间',
  end_at: '结束于',
  end_date: '结束时间',
  earn: '赚取',
  ended: '已结束',
  pending: '未开始',
  rewards_per_week: '每周奖励总额',
  apr: '年化率',
  total_staked: '质押总金额',
  unclaimed_rewards: '未领取奖励',
  claim: '认领',
  claim_all: '认领全部',
  stake: '质押',
  unstake: '取消质押',
  your_rewards: '你的奖励',
  your_shares: '份额',
  shares_owned: '当前份额',
  stake_your_liquidity_provider_LP_tokens: '质押你的LP代币',
  go_to_wallet: '跳转到钱包',
  recent_activity: '近期操作',
  view_all: '查看全部',
  cancel: '取消',
  claim_ref_token: '认领 Ref 代币',
  has_no_available_claim: '无空投额度',
  sorry: '抱歉',
  total_ref_token: 'Ref代币总额度',
  locking_ref_token: 'Ref代币锁定额度',
  unclaim_ref_token: 'Ref代币未领取额度',
  unlocked: '已解锁',
  locking: '锁定中',
  you_can_claim_from: '你可以从如下时间开始认领',
  you_have_claimed_all_your_rewards: '你已经领取了你所有的奖励',
  ends_in: '结束于',
  days: '天后',
  swap_successful_click_to_view: '交易成功，点击查看详情',
  claim_successful_click_to_view: '认领成功，点击查看详情',
  claim_failed_click_to_view: '认领失败，点击查看详情',
  slippageCopyForMobile:
    '滑点是您期望得到的和因先执行的其他交易而实际得到的之间的差异。',
  slippageCopy:
    '滑点是您期望得到的和因先执行的其他交易而实际得到的之间的差异。',
  depositCopy: '将您选择的代币存入，以便进行兑换或添加到流动性池中。',
  nearDepositCopy: '将 Ⓝ 打包存入进行交换或添加到流动性池中',
  nearWithdrawCopy: '将您的 Ⓝ 取出后并将代币移到您的钱包中。',
  withdrawCopy: '取出您选择的代币，并将其存入您的钱包。',
  registerToken: '申请注册一个代币名单以外的新代币。',
  whitelistTokenCopy: '添加NEP-141代币。',
  addLiquidityPoolCopy:
    '为所选的两个代币对创建一个新的流动性池。<br>兑换手续费用是流动池从每笔交易中获得的百分比。',
  swapCopy:
    '兑换交易是将第一个选定的代币交换成第二个选定的代币。<br> 将使用最高流动性和最低交易费用的池。',
  addTokenCopy: '添加NEP-141代币。',
  getLPTokenCopy: '单击此处跳转到相应的池。',
  airdropCopy: '请在截止日期前至少领取一次空投，否则您的余额将捐给财政部。',
  farmRewardsCopy: '这是基于价格的指示性值而非实际结果',
  totalValueLockedCopy: '总锁定价值',
  topPoolsCopy: '对每一个交易对, 只展示最高锁仓量的流动池',
  myWatchList: '我的收藏列表',
  you_do_not_have_enough: '你没有足够的',
  must_provide_at_least_one_token_for: '你提供的币的数量需大于0',
  is_not_exist: '不存在',
  must_input_a_value_greater_than_zero: '必须输入一个大于0的值',
  must_input_a_value_not_greater_than_your_balance:
    '输入的数值不能大于你的余额数量',
  no_pool_available_to_make_a_swap_from: '没有池子能够提供',
  for_the_amount: '数额为',
  no_pool_eng_for_chinese: '的交易',
  is_not_a_valid_swap_amount: '错误的兑换数额',
  not_nep_address:
    '您输入的地址不是NEP-141地址，请检查后再输入。如果是其他主网合约，去彩虹桥进行桥接处理',
  not_correct_address: '您输入的地址不正确，请检查后再输入',
  popular_tokens: '常用代币',
  asset_label: '资产',
  account_label: '账户',
  total_label: '总量',
  top_pools: 'Top pools',
  pool_id: '流动池 ID',
  more_pools: '更多流动池',
  my_watchlist: '我的收藏',
  h24_volume: '24小时交易量',
  volume: '交易量',
  hide_low_tvl_pools: '隐藏低锁仓量资金池',
  watchlist_title: '顶部的我的收藏',
  add_watchlist: '添加到收藏',
  remove_watchlist: '取消收藏',
  my_watchlist_copy: '收藏过的流动池将会出现在这里',
  search_token: '搜索代币',
  language: '语言',
  deposit_to_add_liquidity: '存入代币以添加流动性',
  slip_warn: '注意，请检查您可以收到的最低金额',
  slip_invalid: '请输入有效的值',
  press_enter_to_search: '按下回车以搜索',
  click_search_bar_to_search: '点击搜索图标以搜索',
  reward_tokens: '奖励币',
  detail_tip: '详情',
  no_data: '暂无数据',
  stable_swap: '稳定币兑换',
  including_fees: '(including fees)',
  standard_gas: 'Standard Gas fee:',
  rst_token: 'Your RST token',
  remove_percentage: 'Remove as percentage',
  remove_flexible: 'Remove Flexible',
  remove_tip: 'Remove as percentage will pay 0 fee',
  share_liquidity: 'Share of liquidity',
  remove_token_confirm: 'You will remove RST token',
  add_type_all: 'Add all coins in a balanced proportion',
  add_type_max: 'Use maximum amount of coins available',
  select_balance: '选择资产来源',
  selectBalanceCopy: '选择[Near钱包]直接使用你钱包里的资产进行交易',
  near_wallet: 'Near钱包',
  ref_account: 'Ref账户',
  swap_tip: '如果想从Ref账户中兑换可以在设置中选择Ref账户',
  attention: '请注意',
  live: '进行',
  ended_search: '结束',
  staked_only: '按质押',
  sort_by: '按排序',
  your_farms_rewards: '你的农场奖励',
  your_farms: '你的农场',
  new: '最新',
  unstake_tip_t: '目前你有进行中/未开始的农场.',
  unstake_tip_m:
    '取消质押操作会把所有质押从相同交易对的所有进行中和未开始的农场里移除.',
  unstake_tip_b: '你将要继续取消质押吗?',
  value_rewards: '奖励币总价值',
  stake_unstake_tip: '你有未领取的奖励, 质押/取消质押操作将会自动领取',
  over_tip: '支持一次提取5种代币',
  no_token_tip: '没有可提取的代币',
  getToken_tip: '你可以现在认领你的奖励或质押代币！',
  my_liquidity: '我的流动池',
  in_farm: '在农场中',
};
export default zh_CN;
