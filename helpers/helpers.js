export const unpackResponse = ({data}, collection = false) => {
  if (Array.isArray(data)) {
    return Object.assign({}, ...data.map(obj => {return {[obj.id]: unpackResponse({data: obj})} }) )
  } else {
    return Object.assign({}, {...data.attributes, ...flattenRelationships(data.relationships)})
  }
}

const flattenRelationships = (relationships = {}) => {
  let obj = {}
  for (let key of Object.keys(relationships)){
    obj[key] = relationships[key]['data']
  }
  return obj
}