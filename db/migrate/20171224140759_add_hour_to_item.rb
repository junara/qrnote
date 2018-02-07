class AddHourToItem < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :start_hour, :integer, default: 8
    add_column :items, :end_hour, :integer, default: 20
  end
end
