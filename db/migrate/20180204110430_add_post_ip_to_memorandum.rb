class AddPostIpToMemorandum < ActiveRecord::Migration[5.1]
  def change
    add_column :memorandums, :post_ip, :string
  end
end
