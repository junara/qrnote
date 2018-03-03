class NoteChannel < ApplicationCable::Channel
  def subscribed
    stream_from "note_for_#{params[:token]}" if Item.find_by(token: params[:token]).present?
  end
  def unsubscribed
    p 'unsubscribed !'
  end
end
