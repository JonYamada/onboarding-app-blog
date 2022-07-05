require 'rails_helper'

RSpec.describe 'Session', type: :request do
  after(:context) do
    User.destroy_all unless User.count.zero?
  end

  describe 'Authorization' do
    it 'redirects to the login screen on protected routes when the user is not authenticated' do
      protected_paths = [new_article_path]

      protected_paths.each do |path|
        get path
        expect(response.location).to eq("http://#{host}#{articles_path}")
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
  end
end
