@graphs.each do |graph|
  json.set! graph.id do
    json.partial! 'graph', graph: graph
  end
end
