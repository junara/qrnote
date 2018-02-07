class AddPostIpToReservation < ActiveRecord::Migration[5.1]
  def change
    add_column :reservations, :post_ip, :string
  end
end
