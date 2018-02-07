class DropDemoItem < ActiveRecord::Migration[5.1]
  def change
    drop_table :demo_items
  end
end
