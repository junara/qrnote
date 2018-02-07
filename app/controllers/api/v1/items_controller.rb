module Api
  module V1
    class ItemsController < ApplicationController
      def show
        session[:init] = true
        Item.delete_expired!
        @item = Item.find_by!(token: params[:token])
        impressionist(@item, nil, unique: [:session_hash, :ip_address, :params])

        reservation_range = Range.new(Time.zone.yesterday.beginning_of_day, Time.zone.now.days_since(Settings.reservation.show_since).end_of_day)
        @reservations = Reservation.where(item_id: @item.id).where(start_dt: reservation_range).eager_load(:item, :user).order(start_dt: :asc)
        @users = @item.users
        @memorandum = @item.memorandums.last
      end

      def create
        if params[:flag_demo]
          @item = Item.create!(post_ip: request.ip, name: Item.demo_name, flag_demo: true, duration: Settings.item.default_duration)
          @item.create_demo_reservations
          @item.create_demo_memorandum
        else
          @item = Item.new(item_params.merge(post_ip: request.ip))
          @item.save!
        end

      end

      def update
        @item = Item.find_by!(token: params[:token])
        @item.update!(item_params)
      end

      def destroy
        item = Item.find_by!(token: params[:token])
        if item
          @item_token = item.token
          @item_name = item.name
          item.destroy
        end

      end

      private
      def item_params
        params.slice(:name, :flag_demo).permit(:name, :flag_demo)
      end

    end
  end
end
