<template>
<v-container>
    <v-row>
        <v-col offset="2" cols="8" class="text-center">
            Now is
            <span class="text-h4 text-capitalize mx-3">
                {{player}}
            </span>
            turn
        </v-col>
        <v-col cols="12" class="d-flex flex-column" style="min-height:calc(100vh - 180px);">
            <v-card class="my-auto mx-auto text-center transparent_bg" max-width="500" min-width="400">
                <div class="game_view_outer_box">
                    <div v-for="(cell,i) in cells" :key="i" @click="fillCell(i)" class="game_view_box">
                        {{cell}}
                    </div>
                </div>

            </v-card>
        </v-col>
        <v-col offset="4" cols="4" class="d-flex flex-column">
            <v-btn @click="resetGame()">
                Re - play
            </v-btn>
            <v-btn class="mt-3" :to="{'name':'Home'}">
                Back To Main Pages
            </v-btn>
        </v-col>
        <v-col>
            <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialog" content-class="no_shadow">
                <template>
                    <v-card class="elevation-0" style="background-color:transparent;" @click="dialog = false">
                        <v-card-text class="text-center">
                            <!--<v-icon x-large>
                                mdi-message-alert
                            </v-icon>-->
                            <div class="message_frame">
                                <p class="text-h5 game_font">{{message}}</p>
                                <div class="d-flex" v-if="winner == 'kokoro'">
                                    <v-img src="@/assets/kokoro_win.gif" width="500"></v-img>
                                </div>
                                <div class="d-flex" v-else>
                                    <v-img src="@/assets/kyaru_win.gif" width="500"></v-img>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </template>
            </v-dialog>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    name: 'Home',
    props: {
        setting: Object,
    },
    data() {
        return {
            player: 'kokoro',
            moveMade: 0,
            winner: null,
            cells: [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
            winningCombinations: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ],
            dialog: true,
            message: "Game Start",
        }
    },
    methods: {
        fillCell(id) {
            let cell = document.querySelectorAll('.game_view_box');
            if (this.winner == null) {
                if (this.cells[id] == null) {
                    this.moveMade += 1;
                    if (this.player == "kokoro") {
                        cell[id].innerHTML = '<i class="kokoro"></i>';
                    } else {
                        cell[id].innerHTML = '<i class="kiruya"></i>';
                    }
                    this.cells[id] = this.player;
                    this.player = (this.player == "kokoro") ? "kiruya" : "kokoro";

                    if (this.moveMade >= 5) {
                        this.checkGame();
                    }
                }
            } else {
                this.dialog = true;
                // alert('Already Got A Winner')
            }
        },
        checkGame() {
            for (let i = 0; i <= 7; i++) {
                let winningCombinations = this.winningCombinations[i];
                let a = this.cells[winningCombinations[0]];
                let b = this.cells[winningCombinations[1]];
                let c = this.cells[winningCombinations[2]];

                if (a == null || b == null || c == null) {
                    continue;
                }
                if (a == b && b == c) {
                    this.winner = a;

                    this.message = this.winner + ' Win';
                    this.dialog = true;
                    break;
                }
            }

            if (this.moveMade == 9 && this.winner == null) {
                this.dialog = true;
                this.message = 'Draw';
            }

            return
        },
        resetGame() {
            this.winner = null;
            this.cells = [];
            this.moveMade = 0;
            let cell = document.querySelectorAll('.game_view_box');
            for (var i = 0; i <= 8; i++) {
                this.cells.push(null);
                cell[i].innerHTML = '';
            }
        },

    },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

.game_font {
    font-family: 'Permanent Marker', cursive !important;
}

.transparent_bg {
    background-color: rgba(255, 255, 255, 0.4) !important;
    padding: 25px;
}

.no_shadow{
    box-shadow: none !important;
}

.message_frame{
    position:relative;
    .game_font{
        position:absolute;
        bottom:10%;
        left:50%;
        transform: translate(-50%,0);
        z-index:10;
        background-color:rgba(255,255,255,0.6);
        padding:10px 20px;
    }
}

.menu_btn {
    background: white;
    color: #333;
}

.game_view_outer_box {
    display: flex;
    flex-dircetion: row;
    flex-wrap: wrap;

    .game_view_box {
        width: 33.33%;
        height: 100px;

        border-right: 5px solid rgba(red, 0.7);
        border-bottom: 5px solid rgba(red, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        cursor: pointer;
        user-select: none;
        -moz-user-select: none;

        &:nth-child(3n) {
            border-right: none;
        }

        &:nth-child(7n),
        &:nth-child(8n),
        &:nth-child(9n) {
            border-bottom: none;
        }

        .kokoro {
            background-image: url('~@/assets/outline_kokoro.png');
            background-size: contain;
            background-position: center;
            height: 100%;
            width: 100%;
        }

        .kiruya {
            background-image: url('~@/assets/ou.jpg');
            background-size: contain;
            background-position: center;
            height: 100%;
            width: 100%;
        }
    }
}
</style>
