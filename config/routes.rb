Rails.application.routes.draw do
  root 'articles#index'
  resources :articles, only: %i[index new create]

  get 'register', to: 'users#new'
  post 'register', to: 'users#create'

  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
end
