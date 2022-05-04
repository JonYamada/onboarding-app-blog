class User < ApplicationRecord
  validates :first_name, :email, presence: true
  validates_uniqueness_of :email

  EMAIL_REGEX = /^(.+)@(.+)$/

  def valid_email?(email)
    email =~ EMAIL_REGEX
  end

  # p valid_email?('john.doe@domain.com' ? 'Valid Email' ∶ 'Invalid Email')
end
