class Memorandum < ApplicationRecord
  before_create :set_token
  belongs_to :item
  validates :description, length: {minimum: 0, maximum: 1000}
end
