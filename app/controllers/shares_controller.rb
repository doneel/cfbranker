class SharesController < ApplicationController

	def create
		if user_signed_in?
			puts 'testing and suff'
                        if params[:algorithm_id] == ''
		            redirect_to '/controls/updatecsvs'
                        end
			
                        s = Share.new(:algorithm_id => params[:algorithm_id], :user_id => current_user.id)
                        s.save
                        puts params[:algorithm_id]
#			s.update_attribute(:algorithm_id, params[:algorithm_id])
#			s.update_attribute(:user_id, current_user.id)


#                        s.initialize_rankings(params[:map])

			#puts params[:post][:map]

                        render :json => s                
                end
	end
end
