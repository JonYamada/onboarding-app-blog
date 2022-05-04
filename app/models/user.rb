class User < ApplicationRecord
  validates :first_name, :email, presence: true
  validates :email, uniqueness: true
  validate :correct_email_format

  private

  def correct_email_format
    errors.add(:email, 'Ensure you enter a valid email') if (email =~ /^(.+)@(.+)$/).nil?
  end
end
