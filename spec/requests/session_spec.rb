require 'rails_helper'

RSpec.describe 'Session', type: :request do
  after(:context) do
    User.destroy_all unless User.count.zero?
  end

  describe 'Authorization' do
    it 'redirects to the login screen on protected routes when the user is not authenticated' do
      protected_paths = [
        { method: -> { get(new_article_path) } },
        { method: -> { post(articles_path) } }
      ]

      protected_paths.each do |protected_path|
        protected_path[:method].call
        expect(response.location).to eq("http://#{host}#{login_path}")
        expect(response).to have_http_status(302)
      end
    end

    it 'redirects to the root path on auth routes when the user is already authenticated' do
      post login_path, params: { user: { email: @user.email, password: ENV['seeds_user_password'] } }
      auth_paths = [login_path, register_path]

      auth_paths.each do |path|
        get path
        expect(response.location).to eq("http://#{host}#{root_path}")
      end
    end

    it 'redirects to main page on session destroy' do
      main_page_path = '/articles'

      post login_path, params: { user: { email: @user.email, password: ENV['seeds_user_password'] } }
      expect(response).to have_http_status(302)

      delete logout_path
      expect(response).to redirect_to(main_page_path)
    end
  end
end
