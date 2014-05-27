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

        def self.getNameTuples(team_code_array)
            unless Rails.cache.exist?(:names_map)
                names_map = Hash.new
                Team.all.each do |team|
                    names_map[team.team_code] = team.name
                end
                Rails.cache.write(:names_map, names_map)
            end
            names_map = Rails.cache.read(:names_map)
            team_code_array.map! { |code|  
                tp = TeamPreview.new
                tp.name = names_map[code] 
                tp.team_code = code
                tp
            }
            return team_code_array
        end

	def self.getData(year, week)
                if Rails.cache.exist?(year.to_s + '-' + week.to_s)
                    logger.debug "Cache hit #{year} #{week}"
                    return Rails.cache.read(year.to_s + '-' + week.to_s)
                end
                
                logger.info "Cache miss #{year} #{week}"
                allTeams = Array.new
		Team.where(:year => year).each do |team|
			allTeams.push team.package(year, week.to_i)
		end
                Rails.cache.write(year.to_s + '-' + week.to_s, allTeams)
		return allTeams
	end

	def package(year, maxWeek)
		tp = TeamPackage.new
		tp.name = name
		tp.team_code = team_code

		# SCHEDULE
		sched = Array.new
		Game.where(:home_team_code => team_code, :year => year).each do |game|
			#puts game.week
			#puts maxWeek
			#puts game.date
			#puts
			if game.week <= maxWeek
				sched << game.package(team_code, year)
			end
		end
		Game.where(:visit_team_code => team_code, :year => year).each do |game|
			#puts game.week
			#puts maxWeek
			#puts game.id
			#puts game.date

			if game.week <= maxWeek
				sched << game.package(team_code, year)
			end
		end
		sched.sort!{|a,b| a.week <=> b.week}
		tp.schedule = sched

		# COUNT GAMES AND WINS -> WIN %
		games = 0
		wins = 0
		#puts 'dates!'
		sched.each do |game|
			#puts game.date
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
		tp.aq, tp.fbs = false;
		if @@AQ_CONFS.include? conference_code
			tp.aq = true
		end
		if @@FBS_CONFS.include? conference_code
			tp.fbs = true
		end
		tp.conference = conference_code
		return tp
	end
end


class TeamPackage
	attr_accessor :name, :schedule, :win_pct, :games, :wins, :aq, :fbs, :conference, :team_code
end

class TeamPreview
        attr_accessor :name, :team_code
end

