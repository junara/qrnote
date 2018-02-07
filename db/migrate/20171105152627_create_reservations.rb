class CreateReservations < ActiveRecord::Migration[5.1]
  def change
    create_table :reservations do |t|
      t.integer :item_id
      t.string :name, null: false
      t.string :token
      t.datetime :start_dt, null: false
      t.datetime :end_dt, null: false
      t.timestamps
    end
    add_index :reservations, :item_id
    add_index :reservations, :token, unique: true
  end
end
