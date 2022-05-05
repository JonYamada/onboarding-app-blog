class User < ApplicationRecord
  validates :first_name, :email, presence: true
  validates :email, uniqueness: true
  validate :correct_email_format

  has_many :articles

  private

  def correct_email_format
    errors.add(:email, :invalid_format) if (email =~ /^(.+)@(.+)$/).nil?
  end
end
