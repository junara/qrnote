class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # 例外ハンドル
  rescue_from ActiveRecord::RecordInvalid, with: :render_404
  rescue_from ActiveRecord::RecordNotFound, with: :render_404
  rescue_from ActionController::RoutingError, with: :render_404
  rescue_from StandardError, with: :render_500

  def routing_error
    raise ActionController::RoutingError, params[:path]
  end

  private
  def render_404(e = nil)
    logger.info "Rendering 404 with exception: #{e.message}" if e
    if request.format.to_sym == :json
      render json: {status: 'error', message: e}, status: :not_found and return
    else
      render 'public/404.html', status: :not_found and return
    end
  end

  def render_500(e = nil)
    logger.error "Rendering 500 with exception: #{e.message}" if e
    if request.format.to_sym == :json
      render json: {status: 'error', message: e}, status: :internal_server_error and return
    else
      render 'public/500.html', status: :internal_server_error and return
    end
  end
end
