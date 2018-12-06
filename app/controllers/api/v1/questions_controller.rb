class Api::V1::QuestionsController < Api::V1::ApiController

  def index
    @questions = Question.all
    render 'api/v1/questions/index.json.jbuilder', status: 200
  end

  def create
    @question = Question.create(question_params)
    render 'api/v1/questions/create.json.jbuilder', status: 201
  end

  def show
    @question = Question.find(params[:id])
    render 'api/v1/questions/show.json.jbuilder', status: 200
  end

  def destroy
    question = Question.find(params[:id])
    question.destroy
    render 'api/v1/global/destroy.json.jbuilder', status: 200
  end

  private
  def question_params
    params.require(:question).permit(:content, :answer)
  end

end