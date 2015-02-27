Rails.application.routes.draw do
  root 'pages#index'
  resources :todos, only: [:index, :show, :create, :update, :destroy]
end
