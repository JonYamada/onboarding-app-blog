class User < ApplicationRecord
  has_secure_password

  validates :first_name, :last_name, :email, :password_digest, presence: true
  validates :email, uniqueness: true
  validate :correct_email_format

  has_many :articles, dependent: :destroy

  private

  def correct_email_format
    errors.add(:email, :invalid_format) if (email =~ /^(.+)@(.+)$/).nil? & email.present?
  end
end
