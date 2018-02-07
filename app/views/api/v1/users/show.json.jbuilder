json.status 'ok'
json.result do
  json.user do
    json.token @user.token
    json.name @user.name
    json.created_at @item.created_at
    json.updated_at @item.updated_at
  end
end
