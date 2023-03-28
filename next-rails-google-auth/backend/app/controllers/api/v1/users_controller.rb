# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      def create
        user = User.find_or_create_by(provider: params[:provider], uid: params[:uid], name: params[:name],
                                      email: params[:email])
        if user.save
          redirect_to 'http://localhost:4000/'
        else
          render json: { error: 'ログインに失敗しました' }, status: :unprocessable_entity
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end

      def destroy
        user = User.find_by(email: params[:email])
        if user
          user.destroy
        else
          render json: { error: 'ユーザーが見つかりませんでした' }, status: :not_found
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end
    end
  end
end
