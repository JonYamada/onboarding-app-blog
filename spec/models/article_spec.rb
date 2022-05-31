require 'rails_helper'

RSpec.describe Article, type: :model do
  before(:context) do
    @user = User.find_or_create_by!(first_name: 'jon', last_name: 'yams', email: 'jonathon.yamada@wpengine.com')
  end

  after(:context) do
    Article.destroy_all unless Article.count.zero?
  end

  it 'should have a required title field' do
    article = Article.create(title: '', content: 'contents', user_id: @user.id)
    p Article.all
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
end
