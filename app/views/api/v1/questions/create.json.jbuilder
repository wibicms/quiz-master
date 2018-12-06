json.status 201
json.data do
  json.id @question.id
  json.content @question.content
  json.answer @question.answer
  json.created_at @question.created_at
  json.updated_at @question.updated_at
end