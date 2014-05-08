class SharesController < ApplicationController

	def create
		if user_signed_in?
			puts 'testing and suff'
                        puts params[:algorithm_id]
                        puts params[:algorithm_id].class.name
                        if params[:algorithm_id] == ''
		            redirect_to '/controls/updatecsvs'
                        end
		        
                        s = Share.new(:algorithm_text => params[:algorithm_code], :user_id => current_user.id)
                        s.save
                        s.initialize_rankings(params[:map])
#			s.update_attribute(:algorithm_id, params[:algorithm_id])
#			s.update_attribute(:user_id, current_user.id)


#                        s.initialize_rankings(params[:map])

			#puts params[:post][:map]

                        render :json => s
                end
	end
end
