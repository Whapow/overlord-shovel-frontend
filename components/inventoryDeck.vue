<template lang="pug">
  .flex.inventory-deck
    inventory(v-if="activeCharacter", 
      :inventoryReference="activeCharacter.inventory", :owner="activeCharacter")
    .flex.portrait-tabs
      .portrait(v-for="character in characterCollection" 
        @click="selectCharacter(character)", 
        :class=`character == activeCharacter ? 'active' : ''`
        ) {{ character.name }}
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
    }  
  }
</script>

<style lang="scss" scoped>
  .inventory-deck {
    flex-direction: row;
    border-color: blue;
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
    border-color: yellow;
    background-color: white;
    &.active{
      background-color: lightgray;
      border-color: orange;
    }
  }
</style>

