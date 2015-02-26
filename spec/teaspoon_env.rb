# Set RAILS_ROOT and load the environment if it's not already loaded.
unless defined?(Rails)
  ENV['RAILS_ROOT'] = File.expand_path('../../', __FILE__)
  require File.expand_path('../../config/environment', __FILE__)
end

Teaspoon.configure do |config|
  config.suite do |suite|
    suite.use_framework :mocha
    suite.matcher = 'spec/javascripts/**/*_spec.{js,js.jsx}'
    suite.no_coverage = [
      %r{/ruby.*/gems/},
      %r{/vendor/assets/},
      %r{/tmp/},
    ]
  end

  def add_coverage_thresholds!(coverage)
    coverage.statements = 90
    coverage.branches = 80
    coverage.functions = 89
    coverage.lines = 90
  end

  config.coverage do |coverage|
    coverage.reports = ['text-summary', 'html']
    coverage.output_path = 'coverage/istanbul'
    add_coverage_thresholds!(coverage)
  end

  config.coverage :ci do |coverage|
    coverage.reports = ['text']
    add_coverage_thresholds!(coverage)
  end
end
