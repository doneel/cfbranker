class Share < ActiveRecord::Base
	has_many 	:share_rankings
        belongs_to      :user
        has_one         :algorithm

#        attr_accessor   :algorithm_id

        def initialize_rankings(ranksMap)
             
        end
end
