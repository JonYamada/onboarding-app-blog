class ArticlesController < ApplicationController
  layout 'main'

  def index; end

  def create
    @article = Article.new(article_params)
    if @article.save
      redirect_to article_path(@article), status: 301
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show; end

  private

  def article_params
    params.require(:article).permit(:title, :content, :user_id)
  end
end
