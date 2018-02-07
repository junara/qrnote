class AddFlagDemoToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :flag_demo, :boolean, default: false
  end
end
