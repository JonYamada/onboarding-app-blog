class User < ApplicationRecord
  validates :first_name, :email, presence: true
  validates :email, uniqueness: true
  validate :correct_email_format

  has_many :articles

  def initials
    return "#{first_name[0]}#{last_name[0]}".upcase if last_name.present?
    first_name.upcase
  end

  private

  def correct_email_format
    errors.add(:email, :invalid_format) if (email =~ /^(.+)@(.+)$/).nil?
  end
end
