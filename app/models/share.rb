class Share < ActiveRecord::Base
	has_many 	:share_rankings
        belongs_to      :user


        def initialize_rankings(map)
                
                map.each do |year, weeks|
                    puts year
                    weeks.each do |week, data|
                        puts self
                        puts self.id
                        # Create a new share ranking
                        sr = ShareRanking.new
                        sr.share_id = self.id
                        sr.year = year
                        sr.week = week.partition(',').last
                        data = data.map{|x| x.to_i}
                        sr.teams = data
                        sr.save
                    end
                end
        end
end
