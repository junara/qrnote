class AddPostIpToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :post_ip, :string
  end
end
