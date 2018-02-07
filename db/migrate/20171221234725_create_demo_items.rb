class CreateDemoItems < ActiveRecord::Migration[5.1]
  def change
    create_table :demo_items do |t|
      t.integer :item_id, null: false
      t.timestamps
    end
    add_index :demo_items, :item_id, unique: true
  end
end
