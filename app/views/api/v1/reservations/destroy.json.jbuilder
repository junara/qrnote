json.status 'ok'
json.result do
  json.name @name
  json.item_token @item_token
  json.reservation_token @reservation_token
end
