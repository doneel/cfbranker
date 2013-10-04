class Game < ActiveRecord::Base
	#self.primary_key = "game_code" No longer
	has_many :performances
	belongs_to :season, :foreign_key => 'year'
	def self.import(file, year)
		self.where(:year => year).destory_all
		numRows = 0
		first = nil
		weeks = Array.new
		CSV.foreach(file.path, headers: true) do |row|
			g = Game.create!(row.to_hash)
			g.year = year
			if first === nil
				first = g
				g.week = 1
			else
				g.week = (g.date - first.date)/7 + 1
			end
			weeks << g.week
			g.save
			numRows += 1
		end
		puts weeks
		return numRows
	end

	def package(team_id, year)
		opp_id = home_team_code
		home = false
		if(opp_id == team_id)
			opp_id = visit_team_code
			home = true
		end
		pCand = BCSGame.new
		pCand.team = Team.find_by(:team_code => team_id, :year => year).name
		pCand.opp = Team.find_by(:team_code => opp_id, :year => year).name

		team_perf = Performance.find(:all, :conditions => ["game_code = ? AND team_code = ?", game_code, team_id]).first#Performance.where(:game_code => game_code, team_code => team_id) Performance.find(:all, :conditions => ["game_code = ? AND team_code = ?", game_code, team_id]).first
		opp_perf = Performance.find(:all, :conditions => ["game_code = ? AND team_code = ?", game_code, opp_id]).first


		pCand.team_score = team_perf.points
		pCand.opp_score = opp_perf.points

		pCand.win = false
		if (pCand.team_score > pCand.opp_score)
			pCand.win = true
		end

		#meta data
		pCand.week = week
		pCand.date = date
		puts date
		puts pCand.date
		puts ""
		pCand.home = home
		pCand.neutral = (site == "NEUTRAL")

		return pCand
	end
end

class BCSGame
	attr_accessor :opp
	attr_accessor :team
	attr_accessor :team_score
	attr_accessor :opp_score
	attr_accessor :neutral
	attr_accessor :home
	attr_accessor :date
	attr_accessor :win
	attr_accessor :week
end
