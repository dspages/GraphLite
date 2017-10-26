class Api::GraphsController < ApplicationController
  def create
    @graph = Graph.new(graph_params)
    if @graph.save
      render :show
    else
      render json: @graph.errors.full_messages, status: 406
    end
  end

  def update
    @graph = Graph.find(params[:id])
    if @graph.update_attributes(graph_params)
      render :show
    end
  end

  def destroy
    @graph = Graph.find(params[:id])
    @graph.delete
  end

  def show
    @graph = Graph.find(params[:id])
  end

  def index
    @graphs = Graph.all
  end

  private

  def graph_params
    params.require(:graph).permit(:x_data, :y_data, :y_data2, :y_data3, :filter,
     :labels, :sort_by, :title, :user_id, :graph_type, :datafile_id, :sort_reverse,
     :scaled)
  end
end
