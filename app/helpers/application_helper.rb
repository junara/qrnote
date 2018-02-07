module ApplicationHelper
  def default_meta_tags
    {
      title: Settings.app_name,
      description: 'Simple online schedule site.',
      keywords: 'QR,予約表,ログインなし,ログイン不要,ユーザー登録不要,ユーザー登録なし',
      charset: 'UTF-8',
      site: Settings.app_name,
      og: {
        title: Settings.app_name,
        type: 'website',
        url: request.original_url,
        site_name: '5秒で作ることができるオンライン予約表',
        description: '世界一シンプル！オンライン予約表をログインなしで利用可能。スマホからQRコードから、誰でもどこからでもアクセスできる予約表です。',
        locale: 'ja_JP',
        image: image_url('ogp_image.png'),
      },
      twitter: {
        card: 'summary',
        site: Settings.app_twitter,
      }
    }
  end
end