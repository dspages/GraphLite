class Api::DatasetsController < ApplicationController
  def create
    @dataset = Dataset.new(dataset_params)
    if @dataset.save
      render :show
    else
      render json: "BAD DATA"
    end
  end

  def destroy
    @dataset = Dataset.find(params[:id])
    @dataset.delete
  end

  def show
    shared = current_user.shared_datasets.pluck(:id)
    @dataset = Dataset.where(
    "privacy=(?) OR user_id=(?) OR id IN (?)", false,
    current_user.id, shared).find_by(id: params[:id])
  end

  def index
    shared = current_user.shared_datasets.pluck(:id)
    @datasets = Dataset.where(
    "privacy=(?) OR user_id=(?) OR id IN (?)", false,
    current_user.id, shared)
  end

  private

  def dataset_params
    params.required(:dataset).permit(:data, :title, :user_id, :privacy)
  end
end
