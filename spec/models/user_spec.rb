require 'rails_helper'

RSpec.describe User, type: :model do
  after(:context) do
    User.destroy_all
  end

  describe 'Validation' do
    before(:all) do
      @user_no_first_name = User.create(first_name: '', last_name: 'McLast', email: 'user@email.com', password_digest: 'password')
      @user_no_last_name = User.create(first_name: 'first name', last_name: '', email: 'user@email.com', password_digest: 'password')
      @user_no_email = User.create(first_name: 'first name', last_name: 'McLast', email: '', password_digest: 'password')
      @user_no_password = User.new(first_name: 'first name', last_name: 'McLast', email: 'user@email.com', password_digest: '')
    end

    it 'should have a required first_name field' do
      expect_validation_thrown(@user_no_first_name, :first_name)
    end

    it 'should have a required last_name field' do
      expect_validation_thrown(@user_no_last_name, :last_name)
    end

    it 'should have a required email field' do
      expect_validation_thrown(@user_no_email, :email)
    end

    it 'should have a required password field' do
      expect_validation_thrown(@user_no_password, :password_digest)
    end

    it 'should only accept a unique email' do
      user_params = { first_name: 'first name', last_name: 'McLast', email: 'user@unique.com', password_digest: 'password' }

      user = User.new(user_params)
      expect_successfully_saved(user)

      user = User.new(user_params)
      expect_validation_thrown(user, :email, { error_message: 'has already been taken' })
    end

    it 'should only accept an email field with correct format' do
      valid_format = 'user@email.com'
      invalid_formats = ['invalid format', '@email.com', 'name@']

      user = User.new(first_name: 'first name', last_name: 'Mc Last', email: valid_format, password_digest: 'password')
      expect_successfully_saved(user)

      invalid_formats.each do |invalid_format|
        user = User.create(first_name: 'first name', last_name: 'McLast', email: invalid_format, password_digest: 'password')
        expect_validation_thrown(user, :email, { error_message: 'Ensure you enter a valid email' })
      end

    end
  end

  describe 'Serialization' do
    it 'should have correct fields' do
      expected_hash = {
        'first_name' => 'jon',
        'last_name' => 'yams',
        'email' => 'jonathon.yamada@wpengine.com',
        'initials' => 'JY'
      }
      expect(@user.serializable_hash).to eq(expected_hash)
    end
  end
end
