class ControlsController < ApplicationController

	before_filter	:check_for_admin

	before_filter :check_for_year
	skip_before_action :check_for_year, only: [:updatecsvs]
	def uploadteams
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

	def updatecsvs
		#@text = Performance.findTeamPoints('Stanford')
		#@sampleJSON = Team.getAllJSON
	end


	private

	def check_for_year
		if Season.exists?(params[:year]) == nil
			y = Season.new
			y.year = params[:year]
			y.save
		end
	end

	def performance_params
	  params.require(:performance).permit(:points)
	end

	def check_for_admin
end