json.call todo, :name, :id
json.due_date todo.due_date ? todo.due_date.iso8601 : nil
json.completed_date todo.completed_date ? todo.completed_date.iso8601 : nil
