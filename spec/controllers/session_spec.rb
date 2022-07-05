require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  before(:each) do
    @email = 'joe@example.ie'
    @password = 'password'
  end

  after(:context) do
    User.destroy_all unless User.count.zero?
  end

  describe 'Authentication' do
    it 'POST /login authenticates the user' do
      User.create({ first_name: 'Joe', last_name: 'Bloggs', email: @email, password: @password })
      expect(session[:current_user_id]).to be_nil

      post :create, params: { user: { email: @email, password: @password } }
      expect(session[:current_user_id]).to eql(User.find_by_email(@email).id)
    end

    describe 'Authentication Validations' do
      it 'throws validation error unless both email and password are present' do
        invalid_params = [
          { email: @email, password: nil },
          { email: nil, password: @password },
          { email: nil, password: nil }
        ]

        invalid_params.each do |params|
          post :create, params: { user: params }
          expect(session[:current_user_id]).to be nil

          expect(response.body).to match(/Authentication failed./)
          expect(response).to have_http_status(422)
          expect(session[:current_user_id]).to be nil
        end
      end
    end
  end
end
