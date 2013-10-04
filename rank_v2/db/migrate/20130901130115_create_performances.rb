class CreatePerformances < ActiveRecord::Migration
  def change
    create_table :performances do |t|
    	t.integer			"year"

		t.integer  		 	"team_code"
		t.integer   		"game_code"
		t.integer   		"rush_att"
		t.integer   		"rush_yard"
		t.integer   		"rush_td"
		t.integer   		"pass_att"
		t.integer   		"pass_comp"
		t.integer   		"pass_yard"
		t.integer   		"pass_td"
		t.integer   		"pass_int"
		t.integer   		"pass_conv"
		t.integer   		"kickoff_ret"
		t.integer   		"kickoff_ret_yard"
		t.integer   		"kickoff_ret_td"
		t.integer   		"punt_ret"
		t.integer   		"punt_ret_yard"
		t.integer   		"punt_ret_td"
		t.integer   		"fum_ret"
		t.integer   		"fum_ret_yard"
		t.integer   		"fum_ret_td"
		t.integer   		"int_ret"
		t.integer   		"int_ret_yard"
		t.integer   		"int_ret_td"
		t.integer   		"misc_ret"
		t.integer   		"misc_ret_yard"
		t.integer   		"misc_ret_td"
		t.integer   		"field_goal_att"
		t.integer   		"field_goal_made"
		t.integer   		"off_xp_kick_att"
		t.integer   		"off_xp_kick_made"
		t.integer   		"off_2xp_att"
		t.integer   		"off_2xp_made"
		t.integer   		"def_2xp_att"
		t.integer   		"def_2xp_made"
		t.integer   		"safety"
		t.integer   		"points"
		t.integer   		"punt"
		t.integer   		"punt_yard"
		t.integer   		"kickoff"
		t.integer   		"kickoff_yard"
		t.integer   		"kickoff_touchback"
		t.integer   		"kickoff_out-of-bounds"
		t.integer   		"kickoff_onside"
		t.integer   		"fumble"
		t.integer   		"fumble_lost"
		t.integer   		"tackle_solo"
		t.integer   		"tackle_assist"
		t.integer   		"tackle_for_loss"
		t.integer   		"tackle_for_lossr_loss_yard"
		t.integer   		"sack"
		t.integer   		"sack_yard"
		t.integer   		"qb_hurry"
		t.integer   		"fumble_forced"
		t.integer   		"pass_broken_up"
		t.integer   		"kick_punt_blocked"
		t.integer   		"1st_down_rush"
		t.integer   		"1st_down_pass"
		t.integer   		"1st_down_penalty"
		t.integer   		"time_of_possession"
		t.integer   		"penalty"
		t.integer   		"penalty_yard"
		t.integer   		"third_down_att"
		t.integer   		"third_down_conv"
		t.integer   		"fourth_down_att"
		t.integer   		"fourth_down_conv"
		t.integer   		"red_zone_att"
		t.integer   		"red_zone_td"
   		t.integer			"red_zone_field_goal"

      t.timestamps
    end
  end
end
