<template lang="pug">
  .container.inventory-deck
    .container.portrait-tabs
      .portrait(v-for="character in characterCollection" 
        @click="selectCharacter(character)") {{ character.name }}
    inventory(v-if="activeCharacter", 
      :inventoryReference="activeCharacter.inventory", :owner="activeCharacter")
</template>

<script>
  import inventory from '~/components/inventory'
  export default {
    components: { inventory },
    props: ['characterCollection'],
    data(){
      return {
        activeCharacter: null
      }
    },
    methods: {
      selectCharacter(character){
        this.activeCharacter = character
      }
    }  
  }
</script>

<style lang="scss" scoped>
  .inventory-deck {
    flex-direction: column
  }
  .portrait-tabs {
    flex-direction: row;
    justify-content: space-around
  }
  .portrait {
    min-width: 5rem;
    min-width: 5rem;
    border-style: solid;
  }
</style>

