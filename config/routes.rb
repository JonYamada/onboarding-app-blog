Rails.application.routes.draw do
  root 'articles#index'
  get 'register', to: 'users#new'
  resources :articles, only: [:index, :new, :create]
end
