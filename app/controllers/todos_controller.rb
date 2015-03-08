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

  def create
    @todo = Todo.create!(todo_params)

    respond_to do |format|
      format.json { render 'show' }
    end
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.update_attributes!(todo_params)

    respond_to do |format|
      format.json { render 'show' }
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy!

    respond_to do |format|
      format.json { render nothing: true }
    end
  end

private

  def todo_params
    params.slice(:name, :due_date, :completed_date).permit!
  end
end
