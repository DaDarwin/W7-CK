<template>
    <section>

        <router-link :to="{name: 'Event', params: {id: eventTower.id}}">

            
            <div class="border border-secondary rounded m-1 p-1 text-center card row position-relative">
                
                <img 
                class="img-fluid rounded border border-secondary cover-img text-center col-12 p-0" 
                :src="eventTower.coverImg" 
                alt="">
                
                <div class="p-1 col-12">
                    
                    <span class="text-center">{{ eventTower.name }}</span>
                    
                    <ProfileIcon :profile="eventTower.creator" class=""/>
                    
                </div>
                
            </div>
            
        </router-link>

    </section>
</template>


<script>
import { computed, ref, onMounted } from 'vue';
import { Event } from '../models/Event';
export default {
    props:{
        eventTower: {type: Event, required: true}
    },
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

    .cover-img{
        object-fit: cover;
        object-position: center;
        max-height: 30vh;
    }

    .card{
        height: 40vh;

    }
    

</style>