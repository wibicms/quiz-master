class Api::V1::ApiController < ActionController::Base

  skip_before_action :verify_authenticity_token

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::NotNullViolation, with: :render_not_null_violation

  def render_unprocessable_entity_response(exception)
    render json: { error:  exception.record.errors, code: 500 }, status: :unprocessable_entity
  end

  def render_not_found_response(exception)
    render json: { error: exception.message, code: 404 }, status: :not_found
  end

  def render_not_null_violation(exception)
    render json: { error:  exception.message, code: 500 }, status: :internal_server_error
  end

end
