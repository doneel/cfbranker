class Conference < ActiveRecord::Base
	#self.primary_key = :conference_code Nope, now we have different conferences every year
	has_many	:teams
	belongs_to 	:season, :foreign_key => 'year'

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
			c = Conference.create!(self.cleanRow(row.to_hash))
			c.year = year
			numRows += 1
			c.save
		end
		return numRows
	end

end
