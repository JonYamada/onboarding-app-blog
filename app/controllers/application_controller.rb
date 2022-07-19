class ApplicationController < ActionController::Base
  protect_from_forgery with: :reset_session, if: :session_timed_out?

  helper_method :serialized_current_user

  def serialized_current_user
    current_user.serializable_hash
  end


  def redirect_if_authenticated
    redirect_to root_path, status: :moved_permanently if current_user
  end

  def redirect_if_unauthenticated(path)
    redirect_to path if current_user.blank?
  end

  private

  def current_user
    User.find(session[:current_user_id]) if session[:current_user_id]
  end
  
  def session_timed_out?
    if session[:authentication_created_at].present?
      now = Time.now.strftime('%s').to_i

      session_start_time = session[:authentication_created_at].strftime('%s').to_i

      return now - session_start_time > 1.hour
    end

    true
  end
end
