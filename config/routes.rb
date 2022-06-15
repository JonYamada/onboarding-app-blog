Rails.application.routes.draw do
  root 'articles#index'
  resources :articles, only: [:new, :create, :show]
end
