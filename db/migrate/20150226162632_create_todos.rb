class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :name, null: false
      t.date :due_date
      t.date :completed_date

      t.timestamps
    end
  end
end
