module Api
  module V1
    class MemorandumsController < ApplicationController
      def show
        @memorandum = Memorandum.find_by(token: params[:token])
      end

      def create
        item = Item.find_by!(token: params[:item_token])
        @memorandum = item.memorandums.build({post_ip: request.ip}.merge(memorandum_params))
        @memorandum.save!
      end

      def update
        Item.find_by!(token: params[:item_token])
        @memorandum = Memorandum.find_by!(token: params[:token])
        @memorandum.update!({post_ip: request.ip}.merge(memorandum_params))
      end

      # def destroy
      #   @memorandum_token = params[:token]
      #   @item_token = params[:item_token]
      #   memorandum = Memorandum.find_by!(token: @memorandum_token)
      #   memorandum.destroy
      # end

      private
      def memorandum_params
        params.slice(:description).permit(:description)
      end
    end
  end
end
