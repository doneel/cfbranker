class Algorithm < ActiveRecord::Base
	belongs_to :user
        has_one :share

	attr_accessor :timestamp

        def getAlgorithmOption
             return Algorithm_Option.new(self)
        end
end


class Algorithm_Option
	attr_accessor	:id, :name, :timestamp, :logo, :delete_url, :load_url, :last_time
        def initialize(alg)
             self.id = alg.id
             self.name = alg.save_name
            if (alg.updated_at.today?)
                    self.timestamp = "Today, at " + alg.updated_at.strftime("%H:%M:%S")
            else
                    self.timestamp = Date::MONTHNAMES[alg.updated_at.month] + ' ' + alg.updated_at.mday.to_s + ', ' + alg.updated_at.year.to_s
            end
            self.delete_url = "/algorithm/delete/?id=" + alg.id.to_s
            self.load_url = "/algorithm/load/?id=" + alg.id.to_s
            self.last_time = alg.updated_at
        end
end
