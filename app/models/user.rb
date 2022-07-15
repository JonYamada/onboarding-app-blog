class User < ApplicationRecord
  include ActiveModel::Serialization

  has_secure_password

  validates :first_name, :last_name, :email, :password_digest, presence: true
  validates :email, uniqueness: true
  validate :correct_email_format

  has_many :articles, dependent: :destroy

  def attributes
    {
      'first_name' => self.first_name,
      'last_name' => self.last_name,
      'email' => self.email,
      'initials' => self.initials,
    }
  end

  private

  def correct_email_format
    errors.add(:email, :invalid_format) if email.present? && (email =~ /^(.+)@(.+)$/).nil?
  end

  def initials
    "#{self.first_name[0].upcase}#{self.last_name[0].upcase}" if self.present?
  end
end
