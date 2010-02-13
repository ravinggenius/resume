require 'rubygems'
require 'sinatra'
require 'haml'

set :haml, { :format => :html5, :attr_wrapper => '"' }

get '/' do
  haml :index
end

get '/styles/:name.css' do
  content_type :css
  sass :"stylesheets/#{params[:name]}"
end

not_found do
  'That URL doesn\'t exists.'
end
