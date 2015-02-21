task :jshint do
  sh './node_modules/.bin/jsxhint --verbose app/assets/javascripts/'
end
