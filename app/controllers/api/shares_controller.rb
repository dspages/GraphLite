class Api::SharesController < ApplicationController
  def create
    @share = Share.new(share_params)
    if @share.save
      render :show
    else
      render json: @share.errors.full_messages, status: 406
    end
  end

  private

  def share_params
    params.require(:share).permit(:receiver_id, :dataset_id)
  end
end
