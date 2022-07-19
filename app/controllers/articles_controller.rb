class ArticlesController < ApplicationController
  before_action only: %i[new create] do
    redirect_if_unauthenticated(login_path)
  end

  def index; end

  def create
    @article = Article.new(article_params)

    if @article.save
      render json: @article, status: 200
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def article_params
    params.require(:article).permit(:title, :content, :user_id)
  end
end
