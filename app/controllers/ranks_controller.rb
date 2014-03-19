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

                if Rails.cache.exist?(:weeksMap)
                    @weeksMap = Rails.cache.read(:weeksMap)
                else
                    @weeksMap = Hash.new
                    Season.all.each do |season|
                            @weeksMap[season.year] = Array.new
                            maxReg = season.lastRegWeek
                            max = season.maxWeek
                            for i in 1..maxReg
                                @weeksMap[season.year] << [i, i]
                            end
                            @weeksMap[season.year] << ["Bowls", max]
                    end
                    Rails.cache.write(:weeksMap, @weeksMap)
                end
	end

	def getData
#		@teamJSON = Season.find(year => params[:year]).teams.to_json
#		@teamJSON = Team.getData(params[:year], params[:week])
#		render	:json => @teamJSON
#		return
		if Rails.cache.exist?(params[:year])
			weekData = Rails.cache.read(params[:year])[params[:week].to_i]
			if weekData != nil
				@teamJSON = weekData
			else
				@teamJSON = Team.getData(params[:year], params[:week])
				year = Rails.cache.read(params[:year])
				year[params[:week].to_i] = @teamJSON
				Rails.cache.write(params[:year], year)
			end
		else
			@teamJSON = Team.getData(params[:year], params[:week])
			year = Array.new(16)
			year[params[:week].to_i] = @teamJSON
			Rails.cache.write(params[:year], year)
			#puts @teamJSON[1].schedule[1].opp;
			#puts @teamJSON[1].schedule[1].date;
		end
		render	:json => @teamJSON
	end

	def ranksFrame
		render :layout => false
	end
end

