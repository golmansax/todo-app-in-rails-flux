json.todos do
  json.array! @todos, partial: 'todo', as: :todo
end
