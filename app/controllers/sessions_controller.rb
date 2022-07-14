class SessionsController < ApplicationController
  before_action :redirect_if_authenticated, only: :new

  def create
    @user = User.find_by_email(params[:user][:email])

    if @user.present? && @user.authenticate(params[:user][:password])
      set_session
      redirect_to articles_path
    else
      render json: { errors: 'Authentication failed.' }, status: :unprocessable_entity
    end
  end

  def destroy
    session[:current_user_id] = nil
    redirect_to articles_path
  end

  private

  def session_params
    params.require(:user).permit(:email, :password)
  end

  def set_session
    session[:current_user_id] = @user.id
    session[:authentication_created_at] = DateTime.now
  end
end
