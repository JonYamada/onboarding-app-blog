require 'rails_helper'

RSpec.describe Article, type: :model do
  after(:context) do
    Article.destroy_all unless Article.count.zero?
  end

  it 'should have a required title field' do
    article = Article.create(title: '', content: 'contents', user_id: @user.id)
    expect_validation_thrown(article, :title)
  end

  it 'should have a required content field' do
    article = Article.create(title: 'title', content: '', user_id: @user.id)
    expect_validation_thrown(article, :content)
  end

  it 'should be related to a user' do
    article = Article.create(title: 'title', content: 'contents', user_id: nil)
    expect_validation_thrown(article, :user, { error_message: 'must exist' })
  end

  it 'should successfully save when valid' do
    article = Article.new(title: 'title', content: 'contents', user_id: @user.id)
    expect_successfully_saved(article)
  end
end
