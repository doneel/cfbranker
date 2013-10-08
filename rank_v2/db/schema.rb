# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20130916202541) do

  create_table "algorithms", force: true do |t|
    t.integer  "user_id"
    t.text     "code"
    t.string   "save_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "conferences", force: true do |t|
    t.integer "conference_code"
    t.string  "name"
    t.string  "subdivision"
    t.integer "year"
  end

  create_table "games", force: true do |t|
    t.integer  "game_code"
    t.date     "date"
    t.integer  "visit_team_code"
    t.integer  "home_team_code"
    t.integer  "stadium_code"
    t.string   "site"
    t.integer  "week"
    t.integer  "year"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "performances", force: true do |t|
    t.integer  "year"
    t.integer  "team_code"
    t.integer  "game_code"
    t.integer  "rush_att"
    t.integer  "rush_yard"
    t.integer  "rush_td"
    t.integer  "pass_att"
    t.integer  "pass_comp"
    t.integer  "pass_yard"
    t.integer  "pass_td"
    t.integer  "pass_int"
    t.integer  "pass_conv"
    t.integer  "kickoff_ret"
    t.integer  "kickoff_ret_yard"
    t.integer  "kickoff_ret_td"
    t.integer  "punt_ret"
    t.integer  "punt_ret_yard"
    t.integer  "punt_ret_td"
    t.integer  "fum_ret"
    t.integer  "fum_ret_yard"
    t.integer  "fum_ret_td"
    t.integer  "int_ret"
    t.integer  "int_ret_yard"
    t.integer  "int_ret_td"
    t.integer  "misc_ret"
    t.integer  "misc_ret_yard"
    t.integer  "misc_ret_td"
    t.integer  "field_goal_att"
    t.integer  "field_goal_made"
    t.integer  "off_xp_kick_att"
    t.integer  "off_xp_kick_made"
    t.integer  "off_2xp_att"
    t.integer  "off_2xp_made"
    t.integer  "def_2xp_att"
    t.integer  "def_2xp_made"
    t.integer  "safety"
    t.integer  "points"
    t.integer  "punt"
    t.integer  "punt_yard"
    t.integer  "kickoff"
    t.integer  "kickoff_yard"
    t.integer  "kickoff_touchback"
    t.integer  "kickoff_out_of_bounds"
    t.integer  "kickoff_onside"
    t.integer  "fumble"
    t.integer  "fumble_lost"
    t.integer  "tackle_solo"
    t.integer  "tackle_assist"
    t.integer  "tackle_for_loss"
    t.integer  "tackle_for_loss_yard"
    t.integer  "sack"
    t.integer  "sack_yard"
    t.integer  "qb_hurry"
    t.integer  "fumble_forced"
    t.integer  "pass_broken_up"
    t.integer  "kick_punt_blocked"
    t.integer  "first_down_rush"
    t.integer  "first_down_pass"
    t.integer  "first_down_penalty"
    t.integer  "time_of_possession"
    t.integer  "penalty"
    t.integer  "penalty_yard"
    t.integer  "third_down_att"
    t.integer  "third_down_conv"
    t.integer  "fourth_down_att"
    t.integer  "fourth_down_conv"
    t.integer  "red_zone_att"
    t.integer  "red_zone_td"
    t.integer  "red_zone_field_goal"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "seasons", force: true do |t|
    t.integer "year"
    t.integer "num_weeks"
  end

  create_table "teams", force: true do |t|
    t.integer  "team_code"
    t.string   "name"
    t.integer  "conference_code"
    t.integer  "year"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.integer  "current_alg_id"
    t.boolean  "is_admin"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
