require 'rails_helper'

RSpec.describe "Articles", type: :request do
  before(:context) do
    post login_path, params: { user: { email: @user.email, password: ENV['seeds_user_password'] } }
  end

  after(:context) do
    Article.destroy_all unless Article.count.zero?
  end

  describe 'POST /create' do
    it 'successfully creates an article' do
      initial_article_count = Article.count

      post articles_path, params: { article: { title: 'Test Title', content: 'Test Content', user_id: @user.id } }

      expect(response).to have_http_status(200)
      expect(Article.count).eql?(initial_article_count + 1)
    end

    it 'gracefully handles save errors' do
      initial_article_count = Article.count

      params_blank_content = { article: { title: 'Test Title', content: '', user_id: @user.id } }
      params_blank_title = { article: { title: '', content: 'Test Contents', user_id: @user.id } }
      params_blank_user_id = { article: { title: 'Test Title', content: 'Test Contents', user_id: nil } }

      [params_blank_title, params_blank_content, params_blank_user_id].each do |params|
        post articles_path, params: params
        expect(response).to have_http_status(422)
        expect(initial_article_count).eql?(Article.count)
      end
    end
  end
end
