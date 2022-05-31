require 'rails_helper'

RSpec.describe Article, type: :model do
  after(:context) do
    Article.destroy_all unless Article.count.zero?
  end

  it 'should have a required title field' do
    article = Article.create(title: '', content: 'contents', user_id: @user.id)
    expect(article).to_not be_valid
    expect(article.errors.messages[:title].count).to be > 0
    expect(article.errors.messages[:title][0]).to eq("can't be blank")
  end

  it 'should have a required content field' do
    article = Article.create(title: 'title', content: '', user_id: @user.id)
    expect(article).to_not be_valid
    expect(article.errors.messages[:content].count).to be > 0
    expect(article.errors.messages[:content][0]).to eq("can't be blank")
  end

  it 'should be related to a user' do
    article = Article.create(title: 'title', content: 'contents', user_id: nil)
    expect(article).to_not be_valid
    expect(article.errors.messages[:user].count).to be > 0
    expect(article.errors.messages[:user][0]).to eq("must exist")
  end

  it 'should successfully save when valid' do
    initial_article_count = Article.count
    article = Article.create(title: 'title', content: 'contents', user_id: @user.id)
    expect(article).to be_valid
    expect(article.errors.messages.count).to eq(0)
    expect(Article.count).to eq(initial_article_count + 1)
  end
end
