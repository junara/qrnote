class SyncItemJob < ActiveJob::Base
  def perform(item_token)
    ActionCable.server.broadcast("note_for_#{item_token}", {token: item_token})
  end
end
