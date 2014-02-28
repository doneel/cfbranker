class AlgorithmController < ApplicationController

	respond_to :html, :json
	before_filter :authenticate_user!

	def save
		if Algorithm.exists?(params[:algorithm][:id])
			al = Algorithm.find(params[:algorithm][:id])
			if al.user_id = current_user.id
				al.code = params[:algorithm][:code]
				al.save
			end
		end
	end

	def load
		alg = Algorithm.find(params[:id])
		if alg != nil and alg.user_id == current_user.id
			current_user.current_alg_id = params[:id]
			current_user.save
			copy = alg.clone
			if (alg.created_at.today?)
				copy.timestamp = "Today, at " + copy.created_at.strftime("%H:%M:%S")
			else
				copy.timestamp = Date::MONTHNAMES[copy.created_at.month] + ' ' + copy.created_at.mday.to_s + ', ' + copy.created_at.year.to_s
			end
			render :json => copy.to_json
		end
	end

	def saveas
		@a = Algorithm.new(algorithm_params)
		@a.user_id = current_user.id
		if @a.save
		  	flash[:notice] = "It totally saved!"
		  	flash[:color]= "valid"
			current_user.current_alg_id = @a.id
			current_user.save
			render :json => @a.getAlgorithmOption
		else
			flash[:notice] = "Form is invalid"
		  	flash[:color]= "invalid"
		end
	end

	def delete
		alg = Algorithm.find(params[:id])
		if alg != nil and alg.user_id == current_user.id
			current_user.current_alg_id = current_user.algorithms.take
			alg.destroy
			render :json => alg.to_json
		end
	end

	def algorithm_params
		params.require(:algorithm).permit(:code, :save_name, :timestamp)
	end
end

class Algorithm_Option
	attr_accessor	:id, :name, :timestamp
end
