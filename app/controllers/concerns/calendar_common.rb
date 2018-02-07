module CalendarCommon
  extend ActiveSupport::Concern

  def get_ical(reservations = [], calendar_name = 'calendar')
    calendar = ::Icalendar::Calendar.new
    calendar.append_custom_property("X-WR-CALNAME;VALUE=TEXT", "#{calendar_name} by ")
    reservations.each do |reservation|
      event = ::Icalendar::Event.new
      event.created = reservation.created_at
      event.summary = "#{reservation.name} さんの #{reservation.item.name} の予約"
      event.dtstart = reservation.start_dt
      event.dtend = reservation.end_dt
      event.dtstamp = reservation.created_at
      event.last_modified = reservation.updated_at
      event.description = "予約表名\n#{reservation.item.name}\n\n予約者名\n#{reservation.name} さん\n\n予約表URL\n#{item_url(token: reservation.item.token)}\n\nThis is provided by QRnote.\nhttps://qrnote.work\n"
      event.uid = reservation.token.to_s
      event.url = item_url(token: reservation.item.token)
      calendar.add_event(event)
    end
    calendar.publish
    return calendar.to_ical
  end
end