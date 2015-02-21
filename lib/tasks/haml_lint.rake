task :haml_lint do
  sh 'bundle exec haml-lint app/views'
end
