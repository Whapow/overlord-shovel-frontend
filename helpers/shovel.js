export default function toHash(response){ // v1 implementation - deprecated in favour of helpers/helpers.js [unpackResponse]
  return Object.assign({},
    ...response.data.map(obj => {
      return { 
        [obj.id]: {
          ...obj.attributes, 
          ..._.mapValues(obj.relationships, r => { return r.data }) 
        }
      } 
    }) 
  )
}

export function shovel(response, keyBy = 'id'){ // v3 implementation - current
  let referenceOnly = _.isEmpty(response.included)
  let included = {}
  if (!referenceOnly){
    response.included.forEach(item => { included[item.id] = item.attributes })
  }
  return Object.assign({},
    ...response.data.map(obj => {
      return { 
        [obj.id]: {
          ...obj.attributes, 
          ..._.mapValues(obj.relationships, r => { 
            if (referenceOnly){
              return r.data
            } else {
              return r.data.map( arr => {
                return included[arr.id]
              }) 
            }
          }) 
        }
      } 
    }) 
  )
}