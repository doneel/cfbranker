class SharesController < ApplicationController

	def create
		if user_signed_in?
			puts 'testing and suff'
			puts params[:post]
			
                        s = Share.new
			s.algorithm_id = params[:post][:algorithm_id]
			s.user_id = current_user.id
                        success = s.save?
                        puts "Success?"
                        puts success

			#puts params[:post][:map]

                        render :json => s                
                end
	end
end
