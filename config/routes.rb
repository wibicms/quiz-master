Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #
  namespace :api, module: 'api/v1', path: 'api/v1' do
    resources :questions do
      member do
        post 'answer', to: 'questions#answer'
      end
      collection do
        get 'random', to: 'questions#random'
      end
    end
  end

  resources :questions, only:[:index, :new, :edit]
  resources :quiz, only:[:index]
end
