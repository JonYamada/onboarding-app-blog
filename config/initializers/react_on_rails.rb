include Rails.application.routes.url_helpers
# frozen_string_literal: true

# See https://github.com/shakacode/react_on_rails/blob/master/docs/basics/configuration.md
# for many more options.

module RenderingExtension

  # Return a Hash that contains custom values from the view context that will get merged with
  # the standard rails_context values and passed to all calls to render-functions used by the
  # react_component and redux_store view helpers
  def self.custom_context(view_context)
    {
      routes: {
        root: root_path,
        articles: {
          index: articles_path,
          new: new_article_path,
          create: articles_path
        },
        users: {
          new: register_path,
          create: register_path,
        },
        sessions: {
          new: login_path,
          create: login_path,
          destroy: logout_path,
        },
      }
    }
  end
end

ReactOnRails.configure do |config|
  # This configures the script to run to build the production assets by webpacker. Set this to nil
  # if you don't want react_on_rails building this file for you.
  # If nil, then the standard shakacode/shakapacker assets:precompile will run
  # config.build_production_command = nil

  ################################################################################
  ################################################################################
  # TEST CONFIGURATION OPTIONS
  # Below options are used with the use of this test helper:
  # ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)
  ################################################################################

  # If you are using this in your spec_helper.rb (or rails_helper.rb):
  #
  # ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)
  #
  # with rspec then this controls what yarn command is run
  # to automatically refresh your webpacker assets on every test run.
  #
  # Alternately, you can remove the `ReactOnRails::TestHelper.configure_rspec_to_compile_assets`
  # and set the config/webpacker.yml option for test to true.
  config.build_test_command = "RAILS_ENV=test bin/webpack"

  ################################################################################
  ################################################################################
  # SERVER RENDERING OPTIONS
  ################################################################################
  # This is the file used for server rendering of React when using `(prerender: true)`
  # If you are never using server rendering, you should set this to "".
  # Note, there is only one server bundle, unlike JavaScript where you want to minimize the size
  # of the JS sent to the client. For the server rendering, React on Rails creates a pool of
  # JavaScript execution instances which should handle any component requested.
  #
  # While you may configure this to be the same as your client bundle file, this file is typically
  # different. You should have ONE server bundle which can create all of your server rendered
  # React components.
  #
  config.server_bundle_js_file = "server-bundle.js"
  config.rendering_extension = RenderingExtension
end
