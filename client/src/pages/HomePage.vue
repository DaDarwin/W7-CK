<template>
  <section class="container-fluid">

    <EventForm/>

    <div class="row m-1">
      <button @click="filter = ''" class="btn btn-outline-secondary text-secondary col mx-1">All</button>
      <button v-for="category in eventCatagories" @click="filter = category" class="btn btn-outline-secondary text-secondary col mx-1">{{ category }}</button>
    </div>

    <div  v-if="events.length" class="row">
      
      <EventCard :eventTower="eventTower" class="col-md-3 col-12"  v-for="eventTower in events"/>
      
    </div>
    
  </section>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { eventService } from '../services/EventService';
import EventCard from '../components/EventCard.vue';
import EventForm from '../components/EventForm.vue';
import Pop from '../utils/Pop';
import { AppState } from '../AppState'
import { logger } from '../utils/Logger';
export default {

  setup() {
    onMounted(() => {
      getEvents()
    })
    const filter = ref('')

    async function getEvents() {
      try {
        await eventService.getEvents()
      }
      catch (error) {
        Pop.error(error)
      }
    }
    logger.log(filter.value)
    return {
      filter,
      events: computed(()=> {

        if(filter.value){
          logger.log(filter.value, AppState.events.filter(a => a.type == filter.value))
          return AppState.events.filter(eventTower => eventTower.type == filter.value)
        } 
        else {
          logger.log(AppState.events)
          return AppState.events
        }
      }),
      eventCatagories: computed(()=> AppState.eventCatagories)
    }
  },
  components:{EventCard, EventForm}
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
