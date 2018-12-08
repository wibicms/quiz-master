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

  def answer
    question = Question.find(params[:id])
    if is_correct?(question.answer, params[:answer])
      render json: {status: 200, message: 'CORRECT'}, status: 200
    else
      render json: {status: 200, message: 'INCORRECT'}, status: 200
    end
  end

  private
  def question_params
    params.require(:question).permit(:content, :answer)
  end

  def is_correct?(a, b)
    if a.downcase == b.downcase
      return true
    elsif a.to_f == b.to_f
      return true
    elsif I18n.with_locale(:en) { a.to_f.to_words remove_hyphen: true } == b.downcase
      return true
    elsif a.downcase == I18n.with_locale(:en) { a.to_f.to_words remove_hyphen: true }
      return true
    else
      return false
    end
  end

end