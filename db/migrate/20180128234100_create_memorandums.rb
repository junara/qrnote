class CreateMemorandums < ActiveRecord::Migration[5.1]
  def change
    create_table :memorandums do |t|
      t.string :token
      t.text :description
      t.integer :user_id
      t.integer :item_id
      t.timestamps
    end
    add_index :memorandums, :token, unique: true
    add_index :memorandums, :user_id
    add_index :memorandums, :item_id
  end
end
