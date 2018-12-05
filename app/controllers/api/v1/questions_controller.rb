class Api::V1::QuestionsController < Api::V1::ApiController

  def index
    @questions = Question.all
    render 'api/v1/questions/index.json.jbuilder'
  end

  def create
    @question = Question.create(question_params)
    render 'api/v1/questions/create.json.jbuilder'
  end

  def show
    @question = Question.find(params[:id])
    render 'api/v1/questions/show.json.jbuilder'
  end

  def destroy
    question = Question.find(params[:id])
    question.destroy
    render 'api/v1/global/destroy.json.jbuilder'
  end

  private
  def question_params
    params.require(:question).permit(:content, :answer)
  end

end