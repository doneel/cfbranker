class ShareRanking < ActiveRecord::Base
	belongs_to		:share

        attr_accessor   :week, :year, :teams
end
