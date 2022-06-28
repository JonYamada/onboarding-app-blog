Rails.application.routes.draw do
  root 'articles#index'
  get 'register', to: 'users#new'
  post 'register', to: 'users#create'
  resources :articles, only: [:index, :new, :create]
end
