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

  describe 'POST /api/v1/questions/{id}/answer' do

    it "answers with number" do
      body = JSON.parse(response.body)
      post "/api/v1/questions/#{body['data']['id']}/answer", params: {answer: 4}
      expect(response).to have_http_status 200

      resp = JSON.parse(response.body)
      expect(resp['message']).to eq('CORRECT')
    end

    it "answers with string" do
      body = JSON.parse(response.body)
      post "/api/v1/questions/#{body['data']['id']}/answer", params: {answer: 'four'}
      expect(response).to have_http_status 200

      resp = JSON.parse(response.body)
      expect(resp['message']).to eq('CORRECT')
    end

    it "answers with string non-case-sensitive" do
      body = JSON.parse(response.body)
      post "/api/v1/questions/#{body['data']['id']}/answer", params: {answer: 'FOur'}
      expect(response).to have_http_status 200

      resp = JSON.parse(response.body)
      expect(resp['message']).to eq('CORRECT')
    end

    it "answers with wrong number" do
      body = JSON.parse(response.body)
      post "/api/v1/questions/#{body['data']['id']}/answer", params: {answer: 5}
      expect(response).to have_http_status 200

      resp = JSON.parse(response.body)
      expect(resp['message']).to eq('INCORRECT')
    end



    it "answers with wrong string" do
      body = JSON.parse(response.body)
      post "/api/v1/questions/#{body['data']['id']}/answer", params: {answer: 'five'}
      expect(response).to have_http_status 200

      resp = JSON.parse(response.body)
      expect(resp['message']).to eq('INCORRECT')
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