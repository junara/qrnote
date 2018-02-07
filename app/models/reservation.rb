class Reservation < ApplicationRecord
  DEFAULT_DURATION = Settings.reservation.default_duration
  before_create :set_token
  belongs_to :item
  belongs_to :user
  validates :name, presence: true,
            length: {minimum: 1, maximum: 20}
  validates :post_ip,
            length: {minimum: 1, maximum: 20}

  def initialize(*)
    super
    initialize_dt
  end

  def extend_item_expiation_dt
    return if self.item.flag_demo

    expiration = Settings.item.guest_expiration_date_ago
    self.item.update(expiration_dt: Time.current.since(expiration))
  end

  private
  def initialize_dt
    # TODO REFACTORING
    duration = self.item.duration > 0 ? self.item.duration.minutes : DEFAULT_DURATION.minutes
    if self.item.try(:flag_demo)
      time_now = Time.zone.now.beginning_of_day

      arr = [*self.item.start_hour...self.item.end_hour, *(self.item.start_hour + 24)...(self.item.end_hour + 24), *(self.item.start_hour + 24 * 2)...(self.item.end_hour + 24 * 2)]
      self.start_dt ||= time_now.since(arr.sample(1)[0].to_i.hours).since((0...60).step(self.item.duration).to_a.sample(1)[0].to_i.minutes)
      self.end_dt ||= self.start_dt + duration
      gimei = Gimei.name
      self.name ||= "#{gimei.last.kanji}#{gimei.first.kanji}"
      self.post_ip ||= self.item.post_ip
    else
      time_now = Time.zone.now.beginning_of_hour
      self.start_dt ||= time_now
      self.end_dt ||= self.start_dt + duration
    end

  end
end
