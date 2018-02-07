Rails.application.routes.draw do
  get '/about', to: 'home#index'
  get '/items/:token/calendar', to: 'items#calendar', as: 'item_calendar', format: 'ics'
  get '/items/:token/qrcode', to: 'items#qrcode', as: 'item_qrcode', format: 'png'
  get '/reservations/:token/calendar', to: 'reservations#calendar', as: 'reservation_calendar', format: 'ics'
  get '/items/:token', to: 'home#index', as: 'item', format: 'html'
  get '/new_items/:token', to: 'home#index', as: 'new_item', format: 'html'

  namespace :api, format: 'json' do
    namespace :v1 do
      resources :items, param: :token do
        resources :reservations, param: :token do
        end
        resources :memorandums, param: :token do
        end
      end
    end
  end

  root 'home#index'
  get '*not_found' => 'application#routing_error'
  post '*not_found' => 'application#routing_error'
end
