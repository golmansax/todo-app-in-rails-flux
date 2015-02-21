task :scss_lint do
  sh 'bundle exec scss-lint app/assets/stylesheets'
end
