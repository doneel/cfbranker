require 'test_helper'

class AlgorithmControllerTest < ActionController::TestCase
  test "should get save" do
    get :save
    assert_response :success
  end

  test "should get saveas" do
    get :saveas
    assert_response :success
  end

  test "should get delete" do
    get :delete
    assert_response :success
  end

end
