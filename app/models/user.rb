class User < ApplicationRecord
  validates :first_name, :email, presence: true
  validates :email, uniqueness: true
  validate :correct_email_format

  has_many :articles, dependent: :destroy

  # TODO add this to navbar avatar
  def initials
    return "#{first_name[0]}#{last_name[0]}".upcase if last_name.present?
    first_name[0].upcase
  end

  private

  def correct_email_format
    errors.add(:email, :invalid_format) if (email =~ /^(.+)@(.+)$/).nil?
  end
end
