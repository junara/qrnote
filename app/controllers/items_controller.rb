class ItemsController < ApplicationController
  include CalendarCommon

  def calendar
    item = Item.find_by(token: params[:token])
    reservations = item.reservations
    calendar_name = item.name
    headers["Content-Type"] = "text/calendar; charset=UTF-8"
    render plain: get_ical(reservations, calendar_name) and return
  end

  def qrcode
    item = Item.find_by(token: params[:token])
    url = item_url(token: item.token)
    qr = RQRCode::QRCode.new(url, :size => 10, :level => :h)
    png = qr.to_img.resize(400, 400)
    filename = "QRコード画像__#{item.name}__#{item.token}.png"
    send_data png, type: 'image/png', disposition: 'attachment', filename: filename and return
  end

end
