class AddImpressionsCountToItem < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :impressions_count, :integer
  end
end
