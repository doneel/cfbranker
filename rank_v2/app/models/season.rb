class Season < ActiveRecord::Base
	self.primary_key = :year
	has_many :conferences
	has_many :teams
	has_many :games
	has_many :performances

	def getAllTeams
		return teams
	end

	attr_accessor :numWeeks
end
