class AddExpirationDtToItem < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :expiration_dt, :datetime
  end
end
