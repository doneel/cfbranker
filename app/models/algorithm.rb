class Algorithm < ActiveRecord::Base
	belongs_to :user
	attr_accessor :timestamp
end
