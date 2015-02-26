class TodosController < ApplicationController
  def index
    @todos = Todo.all
    respond_to do |format|
      format.json
    end
  end

  def show
    @todos = Todo.find(params[:id])
    respond_to do |format|
      format.json
      format.html { render template: 'pages/index' }
    end
  end
end
