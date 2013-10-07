class Team < ActiveRecord::Base
	has_many	:games
	has_many 	:performances
	belongs_to 	:conference
	belongs_to 	:season, :foreign_key => 'year'

	@@FBS_CONFS = [821, 25354, 823, 827, 24312, 99001, 875, 5486, 905, 911, 818, 923];
	@@AQ_CONFS = [821,25354,823,827,24312,905,911];


	def self.cleanRow(hash)
		replacementHash = Hash.new
		hash.each do |key, value|
			key2 = key.downcase
			key2 = key2.gsub(' ', '_')
			key2 = key2.gsub('\\', '_')
			replacementHash[key2] = value
		end
		return replacementHash
	end


	def self.import(file, year)
		self.destroy_all(:year => year)
		numRows = 0
		CSV.foreach(file.path, headers: true) do |row|
			t1 = Team.create!(self.cleanRow(row.to_hash))
			t1.year = year
			t1.save
			numRows += 1
		end
		return numRows
	end

	def self.getData(year, week)
		puts "RUNNING"
		allTeams = Array.new
		puts year
		puts Team.where(:year => year)[0]
		Team.where(:year => year).each do |team|
			puts "ok.."
			allTeams.push team.package(year, week.to_i)
		end
		return allTeams
	end

	def package(year, maxWeek)
		tp = TeamPackage.new
		tp.name = name
		tp.team_code = team_code
		puts name

		# SCHEDULE
		sched = Array.new
		Game.find_all_by_home_team_code(team_code).each do |game|
			if game.week <= maxWeek
				sched << game.package(team_code, year)
			end
		end
		Game.find_all_by_visit_team_code(team_code).each do |game|
			if game.week <= maxWeek
				sched << game.package(team_code, year)
			end
		end
		tp.schedule = sched

		# COUNT GAMES AND WINS -> WIN %
		games = 0
		wins = 0
		sched.each do |game|
			if(game.win == true)
				wins += 1
			end
			games += 1
		end
		tp.win_pct = 0
		if wins != 0
			tp.win_pct = wins.to_f/games
		end
		tp.games = games
		tp.wins = wins

		#Conference stuff
		aq, fbs = false;
		if @@AQ_CONFS.include? conference_code
			aq = true
		end
		if @@FBS_CONFS.include? conference_code
			fbs = true
		end
		tp.conference = conference_code
		return tp
	end
end


class TeamPackage
	attr_accessor :name, :schedule, :win_pct, :games, :wins, :aq, :fbs, :conference, :team_code
end