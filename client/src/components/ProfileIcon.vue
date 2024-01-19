<template>
    <div class="rounded-pill border border-secondary p-0 d-flex pill align-items-center">

        <!-- <router-link :to="{ name: 'Profile', params: { profileId: profile.id } }"> -->
            
            <img class="border border-secondary" :title="`Go to ${profile.name}'s Profile`" :src="profile.picture" :alt="profile.name">
            
        <!-- </router-link> -->
        
        <span class="fs-4 text-secondary pill px-1"> {{ profile.name }}</span>

    </div>
</template>


<script>
import { RouterLink } from 'vue-router';
export default {
    props: {
        profile: {}
    },
    
    setup(){
        
        return {
        }
    },
}
</script>


<style lang="scss" scoped>
    img{
        height: 4vh;
        aspect-ratio: 1/1;
        border-radius: 50%;
    }

    .pill{
        width: fit-content;
    }

</style>