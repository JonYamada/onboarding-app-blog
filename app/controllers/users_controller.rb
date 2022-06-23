class UsersController < ApplicationController
  def create
    @user = Article.new(user_params)
    if @user.save
      render json: @user, status: 200
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password_digest)
  end
end
