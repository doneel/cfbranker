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

	def self.import(file, year)
		self.where(:year => year).destory_all
		numRows = 0
		CSV.foreach(file.path, headers: true) do |row|
			p = Performance.create(row.to_hash)
			p.year = year
			p.save
			numRows += 1
		end
		return numRows
	end
end
