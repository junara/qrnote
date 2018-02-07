json.status 'ok'
json.result do
  json.token @item.token
  json.name @item.name
  json.created_at @item.created_at
  json.updated_at @item.updated_at
end
