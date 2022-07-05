class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      session[:current_user_id] = @user.id
      render json: @user, status: 200
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end
end
