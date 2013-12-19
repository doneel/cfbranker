class Performance < ActiveRecord::Base
		belongs_to 	:team
		belongs_to	:game
		belongs_to	:season, :foreign_key => 'year'

	def self.findTeamPoints(team_name)
		str = ""
		Performance.find_all_by_team_code(Team.find_by_name(team_name).team_code).each do |p|
			str += p.points.to_s + "\n"
		end
		return str
	end

	def self.cleanRow(hash)
		replacementHash = Hash.new
		hash.each do |key, value|
			key2 = key.downcase
			key2 = key2.gsub(' ', '_')
			key2 = key2.gsub('/', '_')
			key2 = key2.gsub('1st', 'first')
			key2 = key2.gsub('-', '_')
			replacementHash[key2] = value
		end
		return replacementHash
	end

	def self.import(file, year)
		self.destroy_all(:year => year)
		numRows = 0
		first = nil #date, not object
		maxWeek = 0
		CSV.foreach(file.path, headers: true) do |row|
			p = Performance.create(self.cleanRow(row.to_hash)	)
			p.year = year
			puts Game.where(:game_code => p.game_code).take.game_code
			date = Game.where(:game_code => p.game_code).take.date
			if first === nil
				first = date
				week = 1
			else
				week = ((date - first)/7).to_i + 1
			end
			if week > maxWeek
				maxWeek = week
			end

			p.save
			numRows += 1
		end
		s = Season.find(year)
		s.num_weeks = maxWeek
		s.save
		return numRows
	end
end
