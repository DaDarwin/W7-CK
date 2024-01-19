<template>
    <section v-if="activeEvent.id" class="row justify-content-center">

        <img class="img-fluid col-12 cover-Img" :src="activeEvent.coverImg" alt="">

        <span class="fs-2  text-center col-12" 

            :class="{
                'text-danger': activeEvent.isCanceled,
                'text-primary': isAttending && !activeEvent.isCanceled,
                'text-secondary': !activeEvent.isCanceled && !isAttending
        }"> {{ activeEvent.name }}

            <i class="fs-5">
                ({{ activeEvent.type }})
            </i>

        </span>

        <span class="col-2">{{ activeEvent.ticketCount }} / {{ activeEvent.capacity }} Tickets</span>

        <span class="col-3">{{ activeEvent.location }}</span>

        <span class="col-3">{{ activeEvent.startDate.toDateString() }}</span>

        <p class="col-8 text-secondary">{{ activeEvent.description }}</p>

    </section>

    <section class="row p-2">

        <form @submit.prevent="createComment()" class="col-6">
            <label for="comment">Comment</label>
            <textarea v-model="commentData.body" name="comment" id="comment" rows="3" class="form-control"></textarea>
            <button>Comment</button>
        </form>

        <div v-if="comments.length" class="col-6">
            <div class="row">

                <div v-for="remark in comments" class="col-12">

                    <p>{{ remark.body }}</p>

                    <ProfileIcon :profile="remark.creator" class="m-1"/>

                    <button @click="deleteComment(remark.id)" v-if="remark.creatorId == account.id">Delete Comment</button>

                </div>

            </div>

        </div>

        <div v-if="tickets.length" class="col-6">

            <div class="row">

                <span class="fs-3 text-secondary text-center">Attendees</span>

                
                <div v-if="tickets.length" v-for="ticket in tickets" class="col-2 p-1">
                    
                    <ProfileIcon :profile="ticket.profile"/>
                    
                    <button @click="deleteTicket(ticket.id)" v-if="ticket.accountId == account.id">Delete Ticket</button>
                    
                </div>
            
            </div>

        </div>

    </section>

    <section v-if="account.id && activeEvent.ticketCount < activeEvent.capacity && !activeEvent.isCanceled" class="p-1">

        <button @click="createTicket()">Get Ticket</button>

    </section>

    <section v-if="account.id == activeEvent.creatorId && !activeEvent.isCanceled" class="p-1">

        <button @click="cancelEvent()">Cancel Event</button>

    </section>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, watchEffect, ref } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { eventService } from '../services/EventService.js'
import { ticketService } from '../services/TicketService';
import ProfileIcon from '../components/ProfileIcon.vue';
import { commentService } from '../services/CommentService';
export default {
    setup() {
        const route = useRoute();
        const commentData = ref({eventId: route.params.id})
        // logger.log(route);
        watchEffect(() => {
            route.params.id;
            getEventById();
            getEventComments()
        });
        async function getEventById() {
            try {
                const activeEventData = await eventService.getEventById(route.params.id);
                if (activeEventData.ticketCount) {
                    getEventTickets();
                }
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function createTicket() {
            try {
                await ticketService.createTicket(route.params.id);
            }
            catch (error) {
                Pop.error(error);
            }
        }

        async function deleteTicket(id){
            try {
                await ticketService.deleteTicket(id)    
            } 
            catch (error) {
                Pop.error(error)
            }
        }

        async function getEventTickets() {
            try {
                await eventService.getTickets(route.params.id);
            }
            catch (error) {
                Pop.error(error);
            }
        }

        async function getEventComments(){
            try {
                await eventService.getComments(route.params.id)
                
            } 
            catch (error) {
                Pop.error(error)
            }
        }

        async function createComment(){
            try {
                await commentService.createComment(commentData.value)    
            } 
            catch (error) {
                Pop.error(error)
            }
        }

        async function deleteComment(id){
            try {
                await commentService.deleteComment(id)    
            } 
            catch (error) {
                Pop.error(error)
            }
        }

        async function cancelEvent() {
            try {
                eventService.cancelEvent(route.params.id)
            }
            catch (error) {
                Pop.error(error)
            }
        }
        return {
            activeEvent: computed(() => AppState.activeEvent),
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),
            comments: computed(() => AppState.comments),
            isAttending: computed(()=> Boolean(AppState.tickets.findIndex(ticket => ticket.accountId == AppState.account.id))),
            commentData,
            createTicket,
            deleteTicket,
            createComment,
            deleteComment,
            cancelEvent,
        };
    },
    components: { ProfileIcon }
};
</script>


<style lang="scss" scoped>
.cover-Img {
    height: 30vh;
    object-fit: cover;
    object-position: center;
}
</style>