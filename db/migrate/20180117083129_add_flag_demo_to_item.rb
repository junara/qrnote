class AddFlagDemoToItem < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :flag_demo, :boolean, default: false
  end
end
