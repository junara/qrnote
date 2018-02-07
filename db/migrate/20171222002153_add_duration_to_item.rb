class AddDurationToItem < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :duration, :integer, default: 15
  end
end
