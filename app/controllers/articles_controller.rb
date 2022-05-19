class ArticlesController < ApplicationController
  layout 'hello_world'
  helper_method :initials

  def index
    @articles = { articles: Article.all }
  end

  def create
    @article = Article.new(article_params)
    if @article.save!
      # TODO: redirect to show when action available
      redirect_to articles_path, status: 301
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def slug; end

  def article_params
    params.require(:article).permit(:title, :content, :user_id)
  end
end
