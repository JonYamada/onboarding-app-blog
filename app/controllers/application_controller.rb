class ApplicationController < ActionController::Base
  protect_from_forgery with: :reset_session

  helper_method :current_user
  helper_method :current_user_initials

  def current_user_initials
    "#{current_user.first_name[0].upcase}#{current_user.last_name[0].upcase}" if current_user
  end

  def current_user
    User.find(session[:current_user_id]) if session[:current_user_id]
  end

  def redirect_if_authenticated
    redirect_to articles_path if current_user
  end

  def redirect_if_unauthenticated(path)
    redirect_to path if current_user.blank?
  end
end
