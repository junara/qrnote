json.status 'ok'
json.result do
  json.token @reservation.token
  json.name @reservation.user ? @reservation.user.name : @reservation.name
  json.start_dt @reservation.start_dt
  json.end_dt @reservation.end_dt
  json.item_token @reservation.item.token
end
