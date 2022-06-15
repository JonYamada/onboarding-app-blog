class ArticlesController < ApplicationController
  layout 'main'

  def index
    @articles = { articles: Article.all }
  end

  def create
    @article = Article.new(article_params)
    if @article.save
      redirect_to articles_path, status: 301
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  # TODO: implement slug to hide id in urls
  def slug; end

  def article_params
    params.require(:article).permit(:title, :content, :user_id)
  end
end
