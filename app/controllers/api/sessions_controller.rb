

class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
    params[:user][:username],
    params[:user][:password]
    )
    if @user
      log_in(@user)
    else
      render json: "Username or password incorrect", status: 406
    end
  end

  def destroy
    log_out
  end

  private

  def user_params
    params.required(:user).permit(:username, :password)
  end

end
