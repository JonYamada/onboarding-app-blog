require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  after(:context) do
    User.destroy_all unless User.count.zero?
  end

  describe 'POST /register' do
    it 'authenticates the user in on sign up' do
      email = 'joe@example.com'
      expect(session[:current_user_id]).to be_nil
      post :create, params: { user: { first_name: 'Joe', last_name: 'Bloggs', email: email, password: 'password' } }
      expect(session[:current_user_id]).to eql(User.find_by_email(email).id)
    end
  end
end
