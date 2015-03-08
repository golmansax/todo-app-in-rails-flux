# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

unless Rails.env.production?
  Rails.application.config.assets.precompile += %w(
    teaspoon.css teaspoon-teaspoon.js mocha/*.js teaspoon-mocha.js
    spec_helper.js
  )
end
