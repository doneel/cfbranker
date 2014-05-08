class RanksController < ApplicationController

	respond_to	:html, :json

	def write
		@signed_in = false
		@saveArray = nil
		@curAlg = nil
		if user_signed_in?
			@signed_in = true
			saves = current_user.algorithms
			if current_user.current_alg_id
				if Algorithm.exists?(current_user.current_alg_id)
					@curAlg = Algorithm.find(current_user.current_alg_id).to_json
				end
			end
			saveArray = Array.new
			saves.each do |alg|
				saveArray << alg.getAlgorithmOption
			end
			saveArray.sort! {|a,b| a.last_time <=> b.last_time}
			@saveArray = saveArray.to_json
		end



		@algorithm = Algorithm.new
		@new_algorithm = Algorithm.new

                @weeksMap = Season.getWeeksMap

	end

	def getData
#		@teamJSON = Season.find(year => params[:year]).teams.to_json
#		@teamJSON = Team.getData(params[:year], params[:week])
#		render	:json => @teamJSON
#		return
	   
            render :json => Team.getData(params[:year], params[:week])
            return
	end

	def ranksFrame
		render :layout => false
	end
end

