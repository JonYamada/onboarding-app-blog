require 'rails_helper'

RSpec.describe "Users", type: :request do
  before(:context) do
    @params_valid = { user: { first_name: 'Joe', last_name: 'Bloggs', email: 'joe@example.com', password: 'password' } }
  end

  after(:context) do
    User.destroy_all unless User.count.zero?
  end

  describe 'POST /register' do
    it 'successfully creates a user' do
      initial_user_count = User.count

      post register_path, params: @params_valid

      expect(response).to have_http_status(200)
      expect(User.count).eql?(initial_user_count + 1)
    end

    it 'throws correct validations' do
      initial_user_count = User.count

      params_blank_first_name = { user: { first_name: '', last_name: 'Bloggs', email: 'joe@example.com', password: 'password' } }
      params_blank_last_name = { user: { first_name: 'Joe', last_name: '', email: 'joe@example.com', password: 'password' } }
      params_blank_email = { user: { first_name: 'Joe', last_name: 'Bloggs', email: '', password: 'password' } }
      params_blank_password = { user: { first_name: 'Joe', last_name: 'Bloggs', email: 'joe@example.com', password: '' } }
      params_invalid_email = { user: { first_name: 'Joe', last_name: 'Bloggs', email: 'invalid email format', password: 'password' } }
      params_duplicate_email = { user: { first_name: 'Joe', last_name: 'Bloggs', email: User.take.email, password: 'password' } }

      [
        params_blank_email,
        params_blank_first_name,
        params_blank_last_name,
        params_blank_password,
        params_duplicate_email,
        params_invalid_email
      ].each do |params|
        post register_path, params: params

        expect(response).to have_http_status(422)
        expect(initial_user_count).eql?(User.count)
      end
    end
  end
end
