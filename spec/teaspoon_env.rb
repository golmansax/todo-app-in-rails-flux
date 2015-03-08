# Set RAILS_ROOT and load the environment if it's not already loaded.
unless defined?(Rails)
  ENV['RAILS_ROOT'] = File.expand_path('../../', __FILE__)
  require File.expand_path('../../config/environment', __FILE__)
end

Teaspoon.configure do |config|
  config.suite do |suite|
    suite.use_framework :mocha
    suite.matcher = 'spec/javascripts/**/*_spec.{js,jsx}'
    suite.no_coverage = [
      %r{/ruby.*/gems/},
      %r{/vendor/assets/},
      %r{/tmp/},
    ]
  end
end
