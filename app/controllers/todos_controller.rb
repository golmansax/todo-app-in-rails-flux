class TodosController < ApplicationController
  def index
    @todos = Todo.all
    respond_to do |format|
      format.json
    end
  end

  def show
    @todo = Todo.find(params[:id])
    respond_to do |format|
      format.json
      format.html { render template: 'pages/index' }
    end
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.update_attributes!(todo_params)

    respond_to do |format|
      format.json { render 'show' }
    end
  end

private

  def todo_params
    params.slice(:name, :completed_date).permit!
  end

end
