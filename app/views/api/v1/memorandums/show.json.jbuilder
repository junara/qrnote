json.status 'ok'
json.result do
  json.token @memorandum.token
  json.description @memorandum.description
  json.name @memorandum.user ? @memorandum.user.name : nil
  json.created_at @memorandum.created_at
  json.updated_at @memorandum.updated_at
  json.item_token @memorandum.item.token
end
