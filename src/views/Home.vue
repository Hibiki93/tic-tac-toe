<template>
<v-container>
    <v-row class="justify-center">
        <v-col cols="8" class="d-flex flex-column" style="min-height:calc(100vh - 80px);">
            <v-card class="my-auto mx-auto text-center transparent_bg" max-width="500" min-width="334" style="background-color:transparent;box-shadow:none;">
                <div class="title mb-5">Tic tac toe</div>
                <div v-for="i in 10" :key="i" class="pt-5"></div>
                <div class="mb-3">
                    <router-link :to="{'name':'Game Screen'}" class="text-decoration-none">
                      <v-card>
                        <v-card-text>
                            Play Game
                        </v-card-text>
                      </v-card>
                    </router-link>
                </div>
                <div class="mb-3">
                    <router-link :to="{'name':'Setting'}" class="text-decoration-none">
                      <v-card>
                        <v-card-text>
                            Setting
                        </v-card-text>
                      </v-card>
                    </router-link>
                </div>
                
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    name: 'Home',
    props:{
        setting:Object,
    }
}
</script>

<style lang="scss">
.transparent_bg {
    background-color: rgba(255, 255, 255, 0.4);
}
.menu_btn {
    background: white;
    color: #333;
}
</style>

<style>
#app {
    background-image: url('~@/assets/main.jpg');
    min-height: 100%;
    background-size: cover;
}
</style>
