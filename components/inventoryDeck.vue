<template lang="pug">
  .flex.inventory-deck
    inventory(v-if="activeCharacter", 
      :inventoryReference="activeCharacter.inventory", :owner="activeCharacter")
    .flex.portrait-tabs
      .portrait(v-for="character in characterCollection" 
        @click="selectCharacter(character)", 
        :class=`character == activeCharacter ? 'active' : ''`
        ) {{ character.name | shortName }}
</template>

<script>
  import inventory from '~/components/inventory'
  export default {
    components: { inventory },
    props: ['characterCollection'],
    data(){
      return {
        selectedCharacter: null
      }
    },
    computed: {
      activeCharacter(){
        return this.selectedCharacter || this.characterCollection[0]
      }
    },
    methods: {
      selectCharacter(character){
        this.selectedCharacter = character
      }
    },
    filters: {
      shortName(name){
        const matches = /^(.+)\s/.exec(name)
        const firstName = matches ? matches[1] : name
        return  firstName.substring(0,6) + (firstName.length > 6 ? ".." : "")
      }
    }  
  }
</script>

<style lang="scss" scoped>
  .inventory-deck {
    flex-direction: row;
  }
  .portrait-tabs {
    flex-direction: column;
  }
  .portrait {
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
    border-style: solid;
    background-color: white;
    &.active{
      background-color: lightgray;
    }
  }
</style>

