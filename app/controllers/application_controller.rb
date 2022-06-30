class ApplicationController < ActionController::Base
  protect_from_forgery with: :reset_session

  helper_method :current_user
  helper_method :current_user_initials

  def current_user_initials
    if current_user
      "#{current_user.first_name[0].upcase}#{current_user.last_name[0].upcase}"
    end
  end

  def current_user
    User.find(session[:current_user_id]) if session[:current_user_id]
  end
end
