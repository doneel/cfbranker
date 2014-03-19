class Season < ActiveRecord::Base
	self.primary_key = :year
	has_many :conferences
	has_many :teams
	has_many :games
	has_many :performances

	def getAllTeams
		return teams
	end

        def maxWeek
            return Game.where(:year => self.year).order(:week).last().week
        end


        def lastRegWeek
            weeks = Array.new(self.maxWeek + 1)
            weeks.fill(0)
            neutrals = Array.new(weeks)
            Game.where(:year => self.year).select(:week, :site).each do |game|
                weeks[game.week] += 1
                if game.site == "NEUTRAL"
                    neutrals[game.week] += 1
                end
            end

            neutrals.each_index do |pos|
                unless weeks[pos] == 0
                    neutrals[pos] /= weeks[pos]
                end
            end

            pos = 0
            while !(neutrals[pos] == 1 && weeks[pos] > 1)
                neutrals[pos] = 0
                pos = neutrals.find_index 1
            end

            return pos - 1
        end

end
