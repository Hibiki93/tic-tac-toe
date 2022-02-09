<template>
<v-container>
    <v-row>
        <v-col offset="2" cols="8" class="text-center">
            <div class="text-h5">Setting</div>
        </v-col>
        <v-col offset="2" cols="8">
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <div class="text-h6">Bot difficult</div>
                        </v-col>
                        <v-col cols="12">
                            <v-radio-group v-model="setting.difficult" row>
                                <v-radio label="Easy" value="1"></v-radio>
                                <v-radio label="Normal" value="2"></v-radio>
                                <v-radio label="Hard" value="3"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="12">
                            <v-btn :to="{'name':'Home'}">
                                    Back To Main Pages
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    props: {
        setting: Object,
    },
    data: () => ({}),
    methods: {
        // emitToParent(){
        //     this.$emit('selected', this.setting);
        // }
    },

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
