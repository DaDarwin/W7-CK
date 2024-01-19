<template>
    <div v-if="account.id">

        <form @submit.prevent="createEvent()" class="row border border-secondary p-2 m-1 rounded">

            <h2 class="text-center text-secondary">Create an Event!</h2>

            <div class="col-6">
                <label for="event-name">Name</label>
                <input v-model="eventData.name" type="text" id="event-name" name="event-name" class="form-control">
            </div>

            <div class="col-6">
                <label for="event-type">Type</label>
                <select v-model="eventData.type" type="date" id="event-type" name="event-type" class="form-control">
                    <option selected disabled value="">Select A Type</option>
                    <option v-for="type in types" :value="type"> {{ type }} </option>
                </select>
            </div>
            
            <div>
                <label for="event-description">Description</label>
                <textarea v-model="eventData.description" id="event-description" name="event-description" class="form-control" cols="10" rows="10"></textarea>
            </div>

            <div class="col-4">
                <label for="event-location">Location</label>
                <input v-model="eventData.location" type="text" id="event-location" name="event-location" class="form-control">
            </div>

            <div class="col-4">
                <label for="event-startDate">Start Date</label>
                <input v-model="eventData.startDate" type="date" id="event-startDate" name="event-startDate" class="form-control">
            </div>

            <div class="col-4">
                <label for="event-capacity">Capacity</label>
                <input v-model="eventData.capacity" type="number" id="event-capacity" name="event-capacity" class="form-control">
            </div>

            <div class="col-8">
                <label for="event-coverImg">Cover Image</label>
                <input v-model="eventData.coverImg" type="url" id="event-coverImg" name="event-coverImg" class="form-control">
            </div>

            <div class="col-4 d-flex justify-content-end align-items-end">
                <button class="btn btn-info ">Submit</button>
            </div>

        </form>


    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { eventService } from '../services/EventService';
import { logger } from '../utils/Logger';
import { useRouter } from 'vue-router';
export default {
    setup(){
        const eventData = ref({})
        const router = useRouter()

        async function createEvent(){
            try {
                logger.log(eventData.value)
                const eventTower = await eventService.createEvent(eventData.value)
                eventData.value = {}
                router.push({name: 'Event', params: {id: eventTower.id}})
            } 
            catch (error) {
            Pop.error(error)    
            }
        }
    return {
        createEvent,
        eventData,
        account: computed(()=> AppState.account),
        types: computed(()=> AppState.eventCatagories)
      }
    }
};
</script>


<style lang="scss" scoped>

</style>