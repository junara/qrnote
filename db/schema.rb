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

ActiveRecord::Schema.define(version: 20180204110430) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "impressions", force: :cascade do |t|
    t.string "impressionable_type"
    t.integer "impressionable_id"
    t.integer "user_id"
    t.string "controller_name"
    t.string "action_name"
    t.string "view_name"
    t.string "request_hash"
    t.string "ip_address"
    t.string "session_hash"
    t.text "message"
    t.text "referrer"
    t.text "params"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["controller_name", "action_name", "ip_address"], name: "controlleraction_ip_index"
    t.index ["controller_name", "action_name", "request_hash"], name: "controlleraction_request_index"
    t.index ["controller_name", "action_name", "session_hash"], name: "controlleraction_session_index"
    t.index ["impressionable_type", "impressionable_id", "ip_address"], name: "poly_ip_index"
    t.index ["impressionable_type", "impressionable_id", "params"], name: "poly_params_request_index"
    t.index ["impressionable_type", "impressionable_id", "request_hash"], name: "poly_request_index"
    t.index ["impressionable_type", "impressionable_id", "session_hash"], name: "poly_session_index"
    t.index ["impressionable_type", "message", "impressionable_id"], name: "impressionable_type_message_index"
    t.index ["user_id"], name: "index_impressions_on_user_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name", null: false
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "duration", default: 15
    t.integer "start_hour", default: 8
    t.integer "end_hour", default: 20
    t.string "post_ip"
    t.integer "impressions_count"
    t.datetime "expiration_dt"
    t.boolean "flag_demo", default: false
    t.index ["token"], name: "index_items_on_token", unique: true
  end

  create_table "memorandums", force: :cascade do |t|
    t.string "token"
    t.text "description"
    t.integer "user_id"
    t.integer "item_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "post_ip"
    t.index ["item_id"], name: "index_memorandums_on_item_id"
    t.index ["token"], name: "index_memorandums_on_token", unique: true
    t.index ["user_id"], name: "index_memorandums_on_user_id"
  end

  create_table "reservations", force: :cascade do |t|
    t.integer "item_id"
    t.string "name", null: false
    t.string "token"
    t.datetime "start_dt", null: false
    t.datetime "end_dt", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.string "post_ip"
    t.index ["item_id"], name: "index_reservations_on_item_id"
    t.index ["token"], name: "index_reservations_on_token", unique: true
    t.index ["user_id"], name: "index_reservations_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "post_ip"
    t.boolean "flag_demo", default: false
    t.index ["token"], name: "index_users_on_token", unique: true
  end

end
