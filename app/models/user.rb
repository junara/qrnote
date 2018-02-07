class User < ApplicationRecord
  before_create :set_token
  has_many :reservations, dependent: :delete_all
  has_many :memorandums, dependent: :delete_all
  validates :name, presence: true,
            length: {minimum: 1, maximum: 20}
  validates :post_ip,
            length: {minimum: 1, maximum: 20}

end
