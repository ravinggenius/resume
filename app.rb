require 'rubygems'
require 'sinatra'
require 'haml'

set :haml, { :format => :html5, :attr_wrapper => '"' }

get '/' do
  haml :index
end

[ :application, :print ].each do |type|
  get "/styles/#{type}.css" do
    content_type :css
    sass type
  end
end

not_found do
  'That URL doesn\'t exists.'
end
