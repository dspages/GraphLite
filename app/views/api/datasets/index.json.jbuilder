@datasets.each do |dataset|
  json.set! dataset.id do
    json.partial! 'dataset', dataset: dataset
  end
end
