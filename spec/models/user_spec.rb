require 'rails_helper'

RSpec.describe User, type: :model do
  after(:context) do
    User.destroy_all
  end

  describe 'Validations' do
    it 'should have a required first_name field' do
      user = User.create(first_name: '', last_name: 'McLast', email: 'user@email.com')
      expect(user).to_not be_valid
      expect(user.errors.messages[:first_name][0]).to eq("can't be blank")
    end

    it 'should have a required email field' do
      user = User.create(first_name: 'first name', last_name: 'McLast', email: '')
      expect(user).to_not be_valid
      expect(user.errors.messages[:email][0]).to eq("can't be blank")
    end

    it 'should not have a required last_name field' do
      initial_user_count = User.count
      user = User.create(first_name: 'first name', last_name: '', email: 'user@email.com')
      expect(user).to be_valid
      expect(user.errors.messages.count).to eq(0)
      expect(User.count).to eq(initial_user_count + 1)
    end

    it 'should only accept a unique email field' do
      initial_user_count = User.count
      email = 'user@unique.com'

      user = User.create(first_name: 'first name', last_name: '', email: email)
      expect(user).to be_valid
      expect(user.errors.messages.count).to eq(0)
      expect(User.count).to eq(initial_user_count + 1)

      user = User.create(first_name: 'first name', last_name: '', email: email)
      expect(user).to_not be_valid
      expect(user.errors.messages[:email][0]).to eq('has already been taken')
    end

    it 'should only accept an email field with correct format' do
      valid_format = 'user@email.com'
      invalid_formats = ['invalid format', '@email.com', 'name@']

      user = User.create(first_name: 'first name', last_name: '', email: valid_format)
      expect(user).to be_valid
      expect(user.errors.messages.count).to eq(0)

      invalid_formats.each do |invalid_format|
        user = User.create(first_name: 'first name', last_name: '', email: invalid_format)
        expect(user).to_not be_valid
        expect(user.errors.messages[:email][0]).to eq('Ensure you enter a valid email')
      end

    end
  end

  describe 'methods' do
    it 'should return user initials' do
      user = User.create(first_name: 'Joe', last_name: '', email: 'joe@bloggs.com')
      expect(user.initials).to eq('J')

      user.last_name = 'Bloggs'
      expect(user.initials).to eq('JB')
    end
  end
end
