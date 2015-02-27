Rails.application.routes.draw do
  root 'pages#index'
  resources :todos, only: [:index, :show, :update, :destroy]
end
