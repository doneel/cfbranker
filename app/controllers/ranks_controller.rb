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
				s = Algorithm_Option.new
				s.id = alg.id
				s.name = alg.save_name
				if (alg.updated_at.today?)
					s.timestamp = "Today, at " + alg.updated_at.strftime("%H:%M:%S")
				else
					s.timestamp = Date::MONTHNAMES[alg.updated_at.month] + ' ' + alg.updated_at.mday.to_s + ', ' + alg.updated_at.year.to_s
				end
				s.delete_url = "/algorithm/delete/?id=" + alg.id.to_s
				s.load_url = "/algorithm/load/?id=" + alg.id.to_s
				s.last_time = alg.updated_at
				saveArray << s
			end
			saveArray.sort! {|a,b| a.last_time <=> b.last_time}
			@saveArray = saveArray.to_json
		end



		@algorithm = Algorithm.new
		@new_algorithm = Algorithm.new
#		@teamJSON = Year.find(Team.getAllJSON.to_s)
		@availableYears = Season.all.inject(Array.new) do |sel, season|
			sel << [season.year, season.year]
		end
		@maxWeeks = Hash.new
		Season.all.each do |season|
			@maxWeeks[season.year] = season.num_weeks
		end
		puts "MAx weeks"
		puts @maxWeeks
		@availableWeeks = Array.new
		for i in 1..15
			@availableWeeks << [i, i]
		end
		@availableWeeks << ["Final", 20]
		puts "SEROUSLY"
		puts @availableYears
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
			puts @teamJSON[1].schedule[1].opp;
			puts @teamJSON[1].schedule[1].date;
		end
		render	:json => @teamJSON
	end

	def ranksFrame
		#render :layout => false
	end
end

class Algorithm_Option
	attr_accessor	:id, :name, :timestamp, :logo, :delete_url, :load_url, :last_time
end