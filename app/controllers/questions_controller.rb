class QuestionsController < ApplicationController

  def index

  end

  def new

  end

  def edit
    @id = params[:id]
  end
end
