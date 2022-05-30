require 'rails_helper'

RSpec.describe "Articles", type: :request do
  before(:context) do
    @user = User.find_or_create_by!(first_name: 'jon', last_name: 'yams', email: 'jonathon.yamada@wpengine.com')
  end

  after(:context) do
    Article.destroy_all unless Article.count.zero?
  end

  describe 'POST /create' do
    it 'successfully creates an article' do
      initial_article_count = Article.count

      post '/articles', params: { article: { title: 'Test Title', content: 'Test Content', user_id: @user.id } }

      expect(response).to redirect_to(:articles)
      expect(response).to have_http_status(301)
      expect(Article.count).eql?(initial_article_count + 1)
    end

    it 'gracefully handles save errors' do
      initial_article_count = Article.count

      params_blank_content = { article: { title: 'Test Title', content: '', user_id: @user.id } }
      params_blank_title = { article: { title: '', content: 'Test Contents', user_id: @user.id } }
      params_blank_user_id = { article: { title: 'Test Title', content: 'Test Contents', user_id: nil } }

      [params_blank_title, params_blank_content, params_blank_user_id].each do |params|
        post '/articles', params: params
        expect(response).to have_http_status(422)
        expect(initial_article_count).eql?(Article.count)
      end
    end
  end
end
