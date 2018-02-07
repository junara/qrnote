class AddPostIpToItem < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :post_ip, :string
  end
end
