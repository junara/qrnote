module Api
  module V1
    class ReservationsController < ApplicationController
      def show
        @reservation = Reservation.find_by(token: params[:token])
      end

      def create
        item = Item.find_by!(token: params[:item_token])
        @user = item.find_user_or_create_by(name: reservation_params[:name]) do |user|
          user.post_ip = request.ip
          user.flag_demo = item.flag_demo
        end

        @reservation = item.reservations.find_or_create_by!(
          name: reservation_params[:name],
          user_id: @user.id,
          start_dt: reservation_params[:start_dt].in_time_zone,
          end_dt: reservation_params[:end_dt].in_time_zone
        ) do |reservation|
          reservation.post_ip = request.ip
        end
        @reservation.extend_item_expiation_dt
        SyncItemJob.perform_later(item.token)
      end

      def destroy
        @reservation_token = params[:token]
        @item_token = params[:item_token]
        reservation = Reservation.find_by!(token: @reservation_token)
        @name = reservation.user.name
        reservation.destroy
        SyncItemJob.perform_later(@item_token)
      end

      private
      def reservation_params
        params.slice(:name, :start_dt, :end_dt).permit(:name, :start_dt, :end_dt)
      end
      
    end
  end
end
