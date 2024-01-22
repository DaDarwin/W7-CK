<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <section class="row m-2">
    <span class="col-12 fs-2 text-secondary text-center">
      Attending Events
    </span>
    
      <EventCard class="col-6" :eventTower="eventTower" v-for="eventTower in accountEvents"/>
      
  </section>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { eventService } from '../services/EventService';
import Pop from '../utils/Pop';
import EventCard from '../components/EventCard.vue';
export default {
    setup() {
        onMounted(() => {
            getAccountTickets();
        });
        async function getAccountTickets() {
            try {
                await eventService.getAccountTickets();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            account: computed(() => AppState.account),
            accountEvents: computed(() => AppState.accountEvents)
        };
    },
    components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
