class SharesController < ApplicationController

	def create
		if user_signed_in?
			puts 'testing and suff'
			puts params[:post]
			s = Share.new
			s.code = params[:post][:code]
			s.user_id = current_user.id
			puts params[:post][:map]
			puts current_user.id
			puts ''
			puts s
			if s.save?
				#start the process
				puts "Heyy0 me-sa deyyyo "
				Rails.logger.debug('TESTING UP IN THSI BITCH')
				render 'heyyo'
			else
				Rails.logger.debug('TESTING UP IN THSI BITCasdl1j2lekH')
				puts 'IT FAILED IT DID SERIOUSLj'
				render 'no thanks'

			end
		end
	end
end
