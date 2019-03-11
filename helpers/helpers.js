export const unpackResponse = ({data}, collection = false) => {
  if (typeof data === 'Array') {
    return Object.assign({}, ...data.map(obj => {return {[obj.id]: unpackResponse({data: obj}, false)} }) )
  } else {
    return Object.assign({}, {...data.attributes, ...flattenRelationships(data.relationships)})
  }
}

const flattenRelationships = (relationships) => {
  let obj = {}
  for (let key of Object.keys(relationships)){
    obj[key] = relationships[key]['data']
  }
  return obj
}