json.array! @questions.each do |q|
  json.id q.id
  json.content q.content
  json.answer q.answer
  json.created_at q.created_at
  json.updated_at q.updated_at
end
