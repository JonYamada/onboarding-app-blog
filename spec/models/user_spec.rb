require 'rails_helper'

RSpec.describe User, type: :model do
  after(:context) do
    User.destroy_all
  end

  describe 'Validations' do
    it 'should have a required first_name field' do
      user = User.create(first_name: '', last_name: 'McLast', email: 'user@email.com')
      expect_validation_thrown(user, :first_name)
    end

    it 'should have a required email field' do
      user = User.create(first_name: 'first name', last_name: 'McLast', email: '')
      expect_validation_thrown(user, :email)
    end

    it 'should not have a required last_name field' do
      user = User.new(first_name: 'first name', last_name: '', email: 'user@email.com')
      expect_successfully_saved(user)
    end

    it 'should only accept a unique email' do
      email = 'user@unique.com'

      user = User.new(first_name: 'first name', last_name: '', email: email)
      expect_successfully_saved(user)

      user = User.create(first_name: 'first name', last_name: '', email: email)
      expect_validation_thrown(user, :email, { error_message: 'has already been taken' })
    end

    it 'should only accept an email field with correct format' do
      valid_format = 'user@email.com'
      invalid_formats = ['invalid format', '@email.com', 'name@']

      user = User.new(first_name: 'first name', last_name: '', email: valid_format)
      expect_successfully_saved(user)

      invalid_formats.each do |invalid_format|
        user = User.create(first_name: 'first name', last_name: '', email: invalid_format)
        expect_validation_thrown(user, :email, { error_message: 'Ensure you enter a valid email' })
      end

    end
  end

  describe 'User methods' do
    it 'should return user initials when first_name and last_name present' do
      user = User.create(first_name: 'Joe', last_name: 'Bloggs', email: 'joe@bloggs.com')
      expect(user.initials).to eq('JB')
    end

    it 'should return first letter of first name when last_name is absent' do
      user = User.create(first_name: 'Joe', last_name: '', email: 'joe@bloggs.com')
      expect(user.initials).to eq('J')
    end
  end
end
