task :travis_lint do
  require 'travis'
  sh 'bundle exec travis lint --skip-completion-check'
end
