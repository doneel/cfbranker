class Game < ActiveRecord::Base
	#self.primary_key = "game_code" No longer
	has_many :performances
	belongs_to :season, :foreign_key => 'year'

	def self.cleanRow(hash)
		replacementHash = Hash.new
		hash.each do |key, value|
			key2 = key.downcase
			key2 = key2.gsub(' ', '_')
			key2 = key2.gsub('\\', '_')
			value2 = value
			if key == "Date"
				value2  = value.gsub(/([0-9]*)\/([0-9]*)\/([0-9]*)/, '\2-\1-\3')
			end
			replacementHash[key2] = value2
		end
		puts replacementHash
		return replacementHash
	end

	def self.import(file, year)
		self.destroy_all(:year => year)
		numRows = 0
		first = nil
		weeks = Array.new
		CSV.foreach(file.path, headers: true) do |row|
			puts self.cleanRow(row.to_hash)
			g = Game.create!(self.cleanRow(row.to_hash))
			g.year = year
			if first === nil
				first = g
				g.week = 1
			else
				puts g.date
				puts g.date.class.name
				puts first.date
				g.week = ((g.date - first.date)/7).to_i + 1
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
		pCand.home = home
		pCand.neutral = (site == "NEUTRAL")

		#BIG LOOP FOR ALL FIELDS
		restricted_fields = Array.new(["updated_at", "created_at", "id", "year", "team_code"])
		num = 0
		team_perf.attribute_names.each do |field|
			field2 = field
			if restricted_fields.include?(field) # == "updated_at" or field == "created_at" or
				next
			elsif field == "1st_down_rush"
				field2 = "first_down_rush"
			elsif field == "1st_down_pass"
				field2 = "first_down_pass"
			elsif field == "1st_down_penalty"
				field2 = "first_down_penalty"
			elsif field == "kickoff_out-of-bounds"
				field2 = "kickoff_out_of_bounds"
			end
			#puts team_perf[field]
			#if num < 412
			#puts field
			#puts field2
			pCand.send(field2 + "=", team_perf[field])
			#num += 1
			#end
		end

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
	attr_accessor :game_code





	attr_accessor :rush_att
	attr_accessor :rush_yard
	attr_accessor :rush_td
	attr_accessor :pass_att
	attr_accessor :pass_comp
	attr_accessor :pass_yard
	attr_accessor :pass_td
	attr_accessor :pass_int
	attr_accessor :pass_conv
	attr_accessor :kickoff_ret
	attr_accessor :kickoff_ret_yard
	attr_accessor :kickoff_ret_td
	attr_accessor :punt_ret
	attr_accessor :punt_ret_yard
	attr_accessor :punt_ret_td
	attr_accessor :fum_ret
	attr_accessor :fum_ret_yard
	attr_accessor :fum_ret_td
	attr_accessor :int_ret
	attr_accessor :int_ret_yard
	attr_accessor :int_ret_td
	attr_accessor :misc_ret
	attr_accessor :misc_ret_yard
	attr_accessor :misc_ret_td
	attr_accessor :field_goal_att
	attr_accessor :field_goal_made
	attr_accessor :off_xp_kick_att
	attr_accessor :off_xp_kick_made
	attr_accessor :off_2xp_att
	attr_accessor :off_2xp_made
	attr_accessor :def_2xp_att
	attr_accessor :def_2xp_made
	attr_accessor :safety
	attr_accessor :points
	attr_accessor :punt
	attr_accessor :punt_yard
	attr_accessor :kickoff
	attr_accessor :kickoff_yard
	attr_accessor :kickoff_touchback
	attr_accessor :kickoff_out_of_bounds #EDITED
	attr_accessor :kickoff_onside

	attr_accessor :fumble
	attr_accessor :fumble_lost
	attr_accessor :tackle_solo
	attr_accessor :tackle_assist
	attr_accessor :tackle_for_loss
	attr_accessor :tackle_for_loss_yard
	attr_accessor :sack
	attr_accessor :sack_yard
	attr_accessor :qb_hurry
	attr_accessor :fumble_forced

	attr_accessor :pass_broken_up
	attr_accessor :kick_punt_blocked
	attr_accessor :first_down_rush #DITED
	attr_accessor :first_down_pass
	attr_accessor :first_down_penalty
	attr_accessor :time_of_possession
	attr_accessor :penalty
	attr_accessor :penalty_yard
	attr_accessor :third_down_att
	attr_accessor :third_down_conv
	attr_accessor :fourth_down_att
	attr_accessor :fourth_down_conv
	attr_accessor :red_zone_att
	attr_accessor :red_zone_td
	attr_accessor :red_zone_field_goal

end
