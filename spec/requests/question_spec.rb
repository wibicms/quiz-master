require "rails_helper"

RSpec.describe "Questions", :type => :request do
  before do
    post "/api/v1/questions", params: {question: {content: '2x2 equals ?', answer: 4 }}
  end

  describe 'POST /api/v1/questions' do\
    it "creates new question" do
      expect(response).to have_http_status 201
    end

    it "return created user" do
      body = JSON.parse(response.body)
      expect(body['data']).not_to be_empty
    end
  end

  describe 'GET /api/v1/questions' do
    before do
      get "/api/v1/questions"
    end

    it "return success status" do
      expect(response).to have_http_status 200
    end

    it "return all questions" do
      body = JSON.parse(response.body)
      expect(body).not_to be_empty
    end
  end

  describe 'GET /api/v1/questions/{id}' do
    before do
      body = JSON.parse(response.body)
      get "/api/v1/questions/#{body['data']['id']}"
    end

    it "return success status" do
      expect(response).to have_http_status 200
    end

    it "return a question" do
      body = JSON.parse(response.body)
      expect(body).not_to be_empty
    end
  end

  describe 'DELETE /api/v1/questions/{id}' do
    before do
      body = JSON.parse(response.body)
      delete "/api/v1/questions/#{body['data']['id']}"
    end

    it "it deletes question" do
      expect(response).to have_http_status 200
    end
  end


end