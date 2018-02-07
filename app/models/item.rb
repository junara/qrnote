class Item < ApplicationRecord
  before_create :set_token, :set_expiration_dt, :set_duration
  is_impressionable counter_cache: true

  GUEST_EXPIRATION_DATE_AGO = Settings.item.guest_expiration_date_ago
  DEMO_EXPIRATION_DATE_AGO = Settings.item.demo_expiration_date_ago
  DEFAULT_DURATION = Settings.item.default_duration
  DEMO_DURATION = DEFAULT_DURATION
  DEMO_USER_NUM = Settings.item.demo_user_num
  DEMO_RESERVATION_NUM = Settings.item.demo_reservation_num
  DEMO_MEMORANDUM_DESCRIPTION = <<-EOS
メモを付与できます。

右上の__メモを編集する__ボタンを押して試してください。

1. 右上のボタンを押す

    ![画像](https://i.imgur.com/Dj51LCbt.png)

1. メモを編集するボタンを押す

    ![画像](https://i.imgur.com/Z3ccSoqt.png)


---
また、Markdownと呼ばれる記法を使うと、さらに詳細な記述が出来ます。

* リンクを作成できます

    `https://qrnote.work`    

    https://qrnote.work

    `[QRnoteへのリンク](https://qrnote.work)`

    [QRnoteへのリンク](https://qrnote.work)

* 画像も表示できます
    
    `![画像](https://i.imgur.com/mBIgJ1P.png)`

    ![画像](https://i.imgur.com/mBIgJ1P.png)

* 箇条書き

    `* 箇条書きできます`
    
    * 箇条書きできます

* 見出し

    `# 見出し1`

    `## 見出し2`

    # 見出し1

    ## 見出し2
 
詳しくは、[Markdown記法-日本語Markdownユーザー会-](http://www.markdown.jp/syntax/)を参考にしてください。


  EOS

  DEMO_NAME = 'demo予約表名称(右上の設定から変更）'
  has_many :reservations, dependent: :delete_all
  has_many :memorandums, dependent: :delete_all
  validates :name, presence: true,
            length: {minimum: 1, maximum: 50}
  validates :duration,
            presence: true,
            inclusion: {in: [10, 15, 20, 30, 60]},
            numericality: {
              only_integer: true,
              greater_than_or_equal_to: 1,
              less_than_or_equal_to: 60,
            }
  validates :start_hour,
            numericality: {
              only_integer: true,
              greater_than_or_equal_to: 1,
              less_than_or_equal_to: 24,
            }
  validates :end_hour,
            numericality: {
              only_integer: true,
              greater_than_or_equal_to: 1,
              less_than_or_equal_to: 24,
            }
  validates :post_ip,
            length: {minimum: 1, maximum: 20}

  def users
    user_ids = self.reservations.pluck(:user_id)
    return User.where(id: user_ids)
  end

  def find_user_or_create_by(*args, &block)
    temp_users = self.users.where(*args)
    if temp_users.present?
      return temp_users.first
    else
      return User.create!(*args, &block)
    end
  end

  def self.delete_expired!(to = Time.current)
    self.where('expiration_dt <= ?', to).destroy_all
  end

  def expired?
    self.expiration_dt < Time.current
  end

  def set_expiration_dt
    expiration = self.flag_demo ? DEMO_EXPIRATION_DATE_AGO : GUEST_EXPIRATION_DATE_AGO
    self.expiration_dt ||= Time.current.since(expiration)
  end

  def set_duration
    self.duration = DEFAULT_DURATION
  end

  def self.demo_name
    Faker::Config.locale = :ja
    Faker::University.name
    DEMO_NAME
  end

  def create_demo_reservations
    source_names = sample_user_names
    DEMO_RESERVATION_NUM.times do
      sample_user_name = source_names.sample(1)[0]
      sample_user = self.find_user_or_create_by(name: sample_user_name) do |user|
        user.post_ip = self.post_ip
        user.flag_demo = self.flag_demo
      end
      self.reservations.create(user: sample_user, name: sample_user.name)
    end
  end

  def create_demo_memorandum
    self.memorandums.create(description: DEMO_MEMORANDUM_DESCRIPTION)
  end

  def sample_user_names(num = DEMO_USER_NUM)
    (1..num).map {
      gimei = Gimei.name
      "#{gimei.last.kanji}#{gimei.first.kanji}"
    }
  end
end
