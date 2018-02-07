json.status 'ok'
json.result do
  json.item do
    json.token @item.token
    json.name @item.name
    json.duration @item.duration
    json.created_at @item.created_at
    json.updated_at @item.updated_at
    json.is_demo @item.flag_demo
    json.start_hour @item.start_hour
    json.end_hour @item.end_hour
    json.expiration_dt @item.expiration_dt
    json.reservation_count @reservations.count
    json.user_count @users.count
  end
  json.reservations @reservations.order(created_at: :asc) do |reservation|
    json.token reservation.token
    json.name reservation.user ? reservation.user.name : @reservation.name
    json.start_dt reservation.start_dt
    json.end_dt reservation.end_dt
    json.created_at reservation.created_at
    json.updated_at reservation.updated_at
    json.item_token reservation.item.token
  end
  json.users @users do |user|
    json.name user.name
    json.created_at user.created_at
    json.updated_at user.updated_at
  end
  json.memorandum do
    json.token @memorandum.try(:token)
    json.description @memorandum.try(:description)
    json.created_at @memorandum.try(:created_at)
    json.updated_at @memorandum.try(:updated_at)
    json.item_token @item.token
  end
end
