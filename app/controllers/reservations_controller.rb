class ReservationsController < ApplicationController
  include CalendarCommon

  def calendar
    reservations = Reservation.where(token: params[:token])
    calendar_name = "#{reservations.first.item.name} 予約表 - #{Settings.app_name}"
    headers['Content-Type'] = 'text/calendar; charset=UTF-8'
    render plain: get_ical(reservations, calendar_name) and return
  end
end
