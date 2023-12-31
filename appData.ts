export const API = 'https://odivrs.com/api/'

export const APP_VERSION_NAME = '1.0'

export const API_URL = {
  register: API + 'register',
  login: API + 'login',
  verify_otp: API + 'verify_otp',
  get_user: API + 'profile/get_user',
  get_pin_coins: API + 'spin_and_earn/get_spin_coin',
  get_reward_video_daily_limit: API + 'watch_and_earn/get_reward_video',
  add_reward: API + 'watch_and_earn/add_reward',
  spin_add_reward: API + 'spin_and_earn/add_reward',
  get_wallet_account: API + 'wallet/get_account',
  bind_wallet_account: API + 'wallet/bind_account',
  withdraw_wallet_account: API + 'wallet/withdraw',
  get_notification: API + 'notifications/get_notification',
  withdraw_history: API + 'wallet/get_transactions/withdraw',
  notifications_mark_read: API + 'notifications/mark_read',
  get_yt_task: API + 'tasks/get/youtube',
  get_insta_task: API + 'tasks/get/instagram',
  get_website_check_in: API + 'tasks/get/website_check_in',
  upload_task: API + 'tasks/submit/task',
  upload_task_v2: API + 'tasks/v2/submit/task',
  update_profile: API + 'profile/update_profile',
  banners: API + 'banners/get',
  refer_history: API + 'refer/get_history',
  popup: API + 'notifications/get_popup',
  get_update: API + 'app/get_update',
  offer_status: API + 'offers/check_status',
  yt_task_milestone: API + 'offers/claim/yt_task_milestone',
  telegram_task: API + 'offers/claim/telegram_task',
  app_install_task_claim: API + 'offers/claim/app_install_task',
  app_install_task: API + 'offers/get/app_install_task',
  submit_answers: API + 'tasks/v3/submit/task',
}

export const video_url: any = {
  youtube: 'https://odivrs.com/storage/tutorials/youtube.mp4',
  instagram: 'https://odivrs.com/storage/tutorials/instagram.mp4',
  website_check_in: 'https://odivrs.com/storage/tutorials/yt_shorts.mp4',
}

export const playStoreLink = 'https://play.google.com/store/apps/details?id=com.pixelprofits'
export const t_and_c_link = 'https://odivrs.com/terms_and_conditions'
export const privacy_policy_link = 'https://odivrs.com/privacy_policy'
export const about_us_link = 'https://odivrs.com/about_us'
export const instant_support_link = 'whatsapp://send?text=hello&phone=+919668406142'
export const promotion_contact_link = 'whatsapp://send?text=hello&phone=+919124156399'

export const INR_TO_COINS = 100

export function coins_to_inr(coins: number, balance: number) {
  // Two decimal places
  if (coins > balance) return 'Insufficient Balance (' + balance + ' coins)'
  return (coins / INR_TO_COINS).toFixed(2)
}

export function inr_to_coins(coins: number, balance: number) {
  // Two decimal places
  if (coins > balance) return 'Insufficient Balance'
  return `${coins} Coins`
}
