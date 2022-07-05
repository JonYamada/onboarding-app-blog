require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  before(:each) do
    @email = 'joe@example.ie'
    @password = 'password'
  end

  after(:context) do
    User.destroy_all unless User.count.zero?
  end

  describe 'POST /login - Authentication' do
    def create_user
      User.create({ first_name: 'Joe', last_name: 'Bloggs', email: @email, password: @password })
    end

    def create_session(params)
      post :create, params: { user: params }
    end

    it 'successfully authenticates the user' do
      create_user
      expect(session[:current_user_id]).to be_nil

      create_session({ email: @email, password: @password })
      expect(session[:current_user_id]).to eql(User.find_by_email(@email).id)
    end

    it 'redirects to root path on login' do
      create_user
      create_session({ email: @email, password: @password })
      expect(response.location).to redirect_to(articles_path)
    end

    it 'throws validation error unless both email and password are present' do
      invalid_params = [
        { email: @email, password: nil },
        { email: nil, password: @password },
        { email: nil, password: nil }
      ]

      invalid_params.each do |params|
        create_session(params)
        expect(session[:current_user_id]).to be nil

        expect(JSON.parse(response.body)).to eq({"errors"=>"Authentication failed."})
        expect(response).to have_http_status(422)
        expect(session[:current_user_id]).to be nil
      end
    end
  end
end
