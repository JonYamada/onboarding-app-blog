class ArticlesController < ApplicationController
  layout 'hello_world'
  helper_method :initials

  def index
    @articles = { articles: Article.all }
  end

  def new; end

  def create; end

  def slug

  end
end
