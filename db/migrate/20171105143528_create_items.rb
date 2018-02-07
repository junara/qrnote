class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.string :name, null: false
      t.string :token
      t.timestamps
    end
    add_index :items, :token, unique: true
  end
end
