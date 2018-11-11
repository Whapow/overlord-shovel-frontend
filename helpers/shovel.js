export default function toHash(response){
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