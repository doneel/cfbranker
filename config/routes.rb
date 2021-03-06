RankV2::Application.routes.draw do
  post "algorithm/save"
  post "algorithm/saveas"
  get "algorithm/delete"
  get "algorithm/load"
  devise_for :users
  get '/controls/updatecsvs', to: 'controls#updatecsvs'
  get '/controls/noaccess', to: 'controls#deniedAccess'
  post '/controls/uploadteams', to: 'controls#uploadteams'
  post '/controls/uploadgames', to: 'controls#uploadgames'
  post '/controls/uploadperformances', to: 'controls#uploadperformances'
  post '/controls/uploadconferences', to: 'controls#uploadconferences'
  post '/controls/cacheall', to: 'controls#cacheall'
  post '/controls/uploadzip', to: 'controls#uploadzip'

  get '/create', to: 'ranks#write'
  get '/req_data', to: 'ranks#getData'
  get '/ranks/codeFrame', to: 'ranks#ranksFrame'
  get '/ranks/shareCalcFrame', to: 'ranks#shareCalcFrame'
  post '/shares/create', to: 'shares#create'
  get '/shares/loading', to: 'shares#loading'
  get '/shares/:encodedID' => 'shares#view'
  # The priority is based upon order of creation: first created -> highest priority.
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'ranks#write'

  devise_scope :user do
      get "login", :to => "devise/sessions#new"
  end
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
