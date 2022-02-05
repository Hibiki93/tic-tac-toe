<template>
<v-container>
    <v-row class="justify-center">
        <v-col offset="2" cols="8">
            Now is {{player}} turn
        </v-col>
        <v-col offset="2" cols="8" class="d-flex flex-column" style="min-height:calc(100vh - 80px);">
            <v-card class="my-auto mx-auto text-center transparent_bg" max-width="500" min-width="400">
                <div class="game_view_outer_box">
                    <div v-for="(cell,i) in cells" :key="i" @click="fillCell(i)" class="game_view_box">
                        {{cell}}
                    </div>
                </div>

            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    name: 'Home',
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
                alert('Already Got A Winner')
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
                    console.log(a)
                    this.winner = a;
                    alert(this.winner + 'is winner');
                    break;
                }
            }

            if (this.moveMade == 9 && this.winner == null) {
                alert('Draw')
            }

            return
        },
    },
}
</script>

<style lang="scss">
.transparent_bg {
    background-color: rgba(255, 255, 255, 0.4) !important;
    padding:25px;
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

        border-right:5px solid rgba(red,0.7);
        border-bottom:5px solid rgba(red,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        cursor: pointer;
        user-select: none;
        -moz-user-select: none;
        &:nth-child(3n){
            border-right:none;
        }
        &:nth-child(7n),
        &:nth-child(8n),
        &:nth-child(9n){
            border-bottom:none;
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
