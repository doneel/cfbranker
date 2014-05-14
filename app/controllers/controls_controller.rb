class ControlsController < ApplicationController

	before_filter	:check_for_admin
	skip_before_action :check_for_admin, only: [:deniedAccess]

	#before_filter :check_for_year
	#skip_before_action :check_for_year, only: [:updatecsvs]

        before_filter :validate_year
        skip_before_action :validate_year, only: [:uploadteams, :updatecsvs, :uploadzip]

        protect_from_forgery :except => [:uploadzip]

        def uploadzip
                check_for_year
                puts "hello"
                lister = Proc.new {|file| puts file}
                Zip::ZipFile.foreach(params[:file].path, &lister)

                Zip::ZipFile.open(params[:file].path) do |zipfile|
                    team_file = zipfile.find_entry("team.csv")
                    game_file = zipfile.find_entry("game.csv")
                    performance_file = zipfile.find_entry("team-game-statistics.csv")
                    conference_file = zipfile.find_entry("conference.csv")

                    if team_file == nil || game_file == nil || performance_file == nil || conference_file == nil
                        flash[:notice] = "Failed to open all files in #{zipfile.name}"
                        render :text => "failure!" #'/controls/updatecsvs'
                    end

                    
                    team_filename = zipfile.name + '_' + team_file.to_s
                    team_file.extract(team_filename)
                    num = Team.import(File.new(team_filename), params[:year])

                    game_filename = zipfile.name + '_' + game_file.to_s
                    game_file.extract(game_filename)
                    num = Game.import(File.new(game_filename), params[:year])

                    performance_filename = zipfile.name + '_' + performance_file.to_s
                    performance_file.extract(performance_filename)
                    num = Performance.import(File.new(performance_filename), params[:year])

                    conference_filename = zipfile.name + '_' + conference_file.to_s
                    conference_file.extract(conference_filename)
                    num = Conference.import(File.new(conference_filename), params[:year])
                    flash[:notice] = "Succesfully extracted #{zipfile.name}"
                    #redirect_to '/controls/updatecsvs'
                end
                respond_to do |format|
                    format.html {render :text => "html, ok"}
                    format.json {render :text => "json, ok"}
                    format.js {render :text => "js, ok"}
                end

        end


	def uploadteams
                check_for_year
		num = Team.import(params[:file], params[:year])
		flash[:notice] = "Succesfully added #{num} teams"
		redirect_to '/controls/updatecsvs'
	end

	def uploadgames
		num = Game.import(params[:file], params[:year])
		flash[:notice] = "Succesfully added #{num} games"
		redirect_to '/controls/updatecsvs'
	end

	def uploadperformances
		num = Performance.import(params[:file], params[:year])
		flash[:notice] = "Succesfully added #{num} performances"
		redirect_to '/controls/updatecsvs'
	end

	def uploadconferences
		num = Conference.import(params[:file], params[:year])
		flash[:notice] = "Succesfully added #{num} conferences"
		redirect_to '/controls/updatecsvs'
	end

        def cacheall
            Rails.cache.clear
            weeksMap = Season.getWeeksMap
            weeksMap.each do |year, array|
                array.each do |week|
                    Team.getData(year,week[1])
                end
            end
            redirect_to '/controls/updatecsvs'
        end

	def updatecsvs
		#@text = Performance.findTeamPoints('Stanford')
		#@sampleJSON = Team.getAllJSON
	end


	private

        def validate_year
            if params[:year] != nil && !Season.exists?(params[:year]) 
                flash[:error] = "That year doesn't exist."
		redirect_to '/controls/updatecsvs'
            end
        end


	def check_for_year
		if params[:year] != nil && Season.exists?(params[:year]) == nil
			y = Season.new
			y.year = params[:year]
			y.save
		end
	end

	def performance_params
	  params.require(:performance).permit(:points)
	end

	def check_for_admin
		unless current_user.try(:admin?)
			flash[:error] = "You're not an admin, sorry."
			redirect_to '/controls/noaccess'
		end
	end

end
