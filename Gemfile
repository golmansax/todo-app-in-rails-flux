source 'https://rubygems.org'
source 'https://rails-assets.org'

ruby '2.1.5'

gem 'rails', '4.2.0'

gem 'browserify-rails', '~> 0.7'
gem 'bootstrap-sass'
gem 'haml-rails'
gem 'jbuilder'
gem 'react-rails', '~> 1.0.0.pre', github: 'reactjs/react-rails'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'

group :development, :test do
  gem 'haml-lint'
  gem 'rubocop'
  gem 'scss-lint'
  gem 'sqlite3'
  gem 'travis', require: false
  gem 'web-console', '~> 2.0'
end

group :test do
  gem 'rspec-rails', '~> 3.0.0'
end

group :production do
  gem 'pg'
end
