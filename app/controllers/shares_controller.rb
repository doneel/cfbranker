class SharesController < ApplicationController

	def create
		if user_signed_in?
			puts 'testing and suff'
                        puts params[:algorithm_id]
                        puts params[:algorithm_id].class.name
                        if params[:algorithm_id] == ''
		            redirect_to '/controls/updatecsvs'
                        end
		        
                        s = Share.new(:algorithm_text => params[:algorithm_code], :user_id => current_user.id)
                        s.save
                        s.initialize_rankings(params[:map])
#			s.update_attribute(:algorithm_id, params[:algorithm_id])
#			s.update_attribute(:user_id, current_user.id)


#                        s.initialize_rankings(params[:map])

			#puts params[:post][:map]

                        #render :json => s'/shares/' + Base64.urlsafe_encode64(s.id)
                        share_string = '/shares/' + Base64.urlsafe_encode64(s.id.to_s)
                        render :text => share_string.to_s
                end
	end

        def view
            id = Base64::decode64(params[:encodedID])
            share = Share.find(id) 
            @share_rankings = share.share_rankings.map {|ranking|
                ranking.teams = Team.getNameTuples(ranking.teams)
                ranking
            }.to_json
            @code = share.algorithm_text


=begin
shown_ranking = share.share_rankings.last
            @year = shown_ranking.year
            @week = shown_ranking.week 
            if shown_ranking.week == Season.find(shown_ranking.year).num_weeks
                @week = "Bowl"
            end
            @rankings = shown_ranking.teams
=end
        end
end
