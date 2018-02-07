class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def set_token
    self.token = SecureRandom.uuid
  end
end
