require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  after(:context) do
    User.destroy_all unless User.count.zero?
  end

  describe 'Authentication' do
    it 'POST /login authenticates the user' do
      email = 'joe@example.ie'
      password = 'password'

      User.create({ first_name: 'Joe', last_name: 'Bloggs', email: email, password: password })
      expect(session[:current_user_id]).to be_nil

      post :create, params: { user: { email: email, password: password } }
      expect(session[:current_user_id]).to eql(User.find_by_email(email).id)
    end
  end
end
