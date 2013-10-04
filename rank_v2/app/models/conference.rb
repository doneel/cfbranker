class Conference < ActiveRecord::Base
	#self.primary_key = :conference_code Nope, now we have different conferences every year
	has_many	:teams
	belongs_to 	:season, :foreign_key => 'year'

	def self.import(file, year)
		self.where(:year => year).destory_all
		numRows = 0
		CSV.foreach(file.path, headers: true) do |row|
			c = Conference.create!(row.to_hash)
			c.year = year
			numRows += 1
			c.save
		end
		return numRows
	end

end
