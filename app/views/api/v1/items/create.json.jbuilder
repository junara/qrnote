json.status 'ok'
json.result do
  json.token @item.token
  json.name @item.name
  json.name @item.duration
  json.created_at @item.created_at
  json.updated_at @item.updated_at
  json.is_demo @item.flag_demo
end
