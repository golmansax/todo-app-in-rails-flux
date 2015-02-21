task :jscs do
  sh './node_modules/.bin/jscs --esprima=esprima-fb app/assets/javascripts/'
end
