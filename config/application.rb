require File.expand_path('../boot', __FILE__)

require 'csv'
require 'zip/zip'
require 'rails/all'
require 'base64'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)
#RbConfig.cache_store = :memory_store
module RankV2
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de
       #
    #for horoku
    #config.assets.initialize_on_precompile = false
    #config.assets.precompile += ['*.js', '*.css', '.svg', '.woff', '.ttf', "mains/main.js", "mains/rankFrameMain.js", "selectric,css", "basic.css"]
    config.assets.paths << Rails.root.join('app', 'assets', 'fonts')
    config.assets.enabled = true
    config.assets.compile = true 
    config.assets.precompile += %w( separate-*.js )
    config.assets.precompile += %w( *.ttf  )
    config.assets.precompile += %w( *.woff )
    config.assets.precompile += %w( *.svg )
    config.cache_store = :memory_store
  end
end
