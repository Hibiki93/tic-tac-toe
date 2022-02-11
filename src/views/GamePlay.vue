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
        <v-col offset="2" cols="8" class="text-center">
            {{cells}}
        </v-col>
        <v-col cols="12" class="d-flex flex-column" style="min-height:calc(100vh - 180px);">
            <v-card class="my-auto mx-auto text-center transparent_bg" max-width="500" min-width="400">
                <div class="game_view_outer_box">
                    <div v-for="(cell,i) in cells" :key="i" @click="fillCell(i)" class="game_view_box">
                        <i v-if="cell == 'kokoro'" class="kokoro"></i>
                        <i v-else-if="cell == 'karyl'" class="kiruya"></i>
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
const defaultData = function () {
    return {
      myTurn: true,
      winLines: [],
      cells: {
        'A1': false,
        'A2': false,
        'A3': false,
        'B1': false,
        'B2': false,
        'B3': false,
        'C1': false,
        'C2': false,
        'C3': false
      },
      winningCombinations: [
        ['A1','A2','A3'],
        ['A1','B2','C3'],
        ['A1','B1','C1'],
        ['A2','B2','C2'],
        ['A3','B2','C1'],
        ['A3','B3','C3'],
        ['B1','B2','B3'],
        ['C1','C2','C3']
      ]
    }
  };
export default {
    name: 'Home',
    props: {
        setting: Object,
    },
    created() {
        if (this.setting.difficult !== 0) {
            this.bot = true;
        }
    },
    data() {
        return {
            player: 'kokoro',
            myTurn:true,
            bot: false,
            moveMade: 0,
            winner: null,
            winLines: [],
            cells: {
                'A1': false,
                'A2': false,
                'A3': false,
                'B1': false,
                'B2': false,
                'B3': false,
                'C1': false,
                'C2': false,
                'C3': false,
            },
            winningCombinations: [
                ['A1', 'A2', 'A3'],
                ['A1', 'B2', 'C3'],
                ['A1', 'B1', 'C1'],
                ['A2', 'B2', 'C2'],
                ['A3', 'B2', 'C1'],
                ['A3', 'B3', 'C3'],
                ['B1', 'B2', 'B3'],
                ['C1', 'C2', 'C3']
            ],
            dialog: true,
            message: "Game Start",
            scores: {
                X: 10,
                O: -10,
                tie: 0
            },
        }
    },
    methods: {
        // fillCell(id) {
        //     let cell = document.querySelectorAll('.game_view_box');
        //     if (this.winner == null) {
        //         if (this.cells[id] == null) {
        //             this.moveMade += 1;
        //             if (this.player == "kokoro") {
        //                 cell[id].innerHTML = '<i class="kokoro"></i>';
        //             } else {
        //                 cell[id].innerHTML = '<i class="kiruya"></i>';
        //             }
        //             this.cells[id] = this.player;
        //             this.player = (this.player == "kokoro") ? "karyl" : "kokoro";

        //             if (this.moveMade >= 5) {
        //                 this.checkGame();
        //             }
        //             if (this.bot) {
        //                 this.botTrun();
        //             }
        //         }
        //     } else {
        //         this.dialog = true;
        //         // alert('Already Got A Winner')
        //     }
        // },
        fillCell(index) {
            if (!this.myTurn) return;
            if (!this.cells[index]) {
                this.cells[index] = 'kokoro';
                this.player = (this.player == "kokoro") ? "karyl" : "kokoro";
                if (!this.checkWinner()) {
                    // setTimeout(this.player = 'karyl', 1000);
                    this.myTurn = false;
                    this.computerTurn()
                }
            }
        },
        computerTurn() {
            //Check avaiable choices
            let avaiablePositions = {};
            let xPositions = {};
            let oPositions = {};
            for (var index in this.cells) {
                avaiablePositions[index] = (!this.cells[index]) ? true : false;
                if (this.cells[index] === 'kokoro') {
                    xPositions[index] = true
                }
                if (this.cells[index] === 'karyl') {
                    oPositions[index] = true
                }
            }
            //First turn
            if (Object.keys(xPositions).length === 1) {
                if (xPositions['A1'] || xPositions['A3'] || xPositions['C1'] || xPositions['C3']) {
                    if (avaiablePositions['B2']) {
                        this.setAIDecision('B2');
                        return;
                    }
                } else {
                    let choices = ['A1', 'A3', 'C1', 'C3'];
                    this.setAIDecision(choices[this.getRand(0, choices.length)]);
                }
            } else {
                let decision = false;
                //Check enemy position and valutate the danger of lost this game and the possibility to win it
                let dangerValutation = [];
                let winValutation = [];
                this.winningCombinations.map(combination => {
                    let dangerCounter = 0;
                    let winCounter = 0;
                    combination.map(item => {
                        if (xPositions[item]) dangerCounter++;
                        if (oPositions[item]) winCounter++;
                    })
                    dangerValutation.push(dangerCounter);
                    winValutation.push(winCounter);
                })

                //Manage win level 2, major decision for winning the game
                this.winningCombinations.map((combination, index) => {
                    if (winValutation[index] === 2) {
                        combination.map(item => {
                            if (avaiablePositions[item] && !decision) {
                                this.setAIDecision(item)
                                decision = true;
                                return;
                            }
                        })
                    }
                })
                //Manage danger level 2, major decision for avoiding player's win
                this.winningCombinations.map((combination, index) => {
                    if (dangerValutation[index] === 2) {
                        //Check if the danger was neutralized
                        let danger = true;
                        let avaiable = false;
                        combination.map(item => {
                            if (oPositions[item]) {
                                danger = false;
                            }
                            if (avaiablePositions[item]) {
                                avaiable = item;
                            }
                        })
                        if (danger && !decision) {
                            this.setAIDecision(avaiable)
                            decision = true;
                            return;
                        }
                    }
                })
                //Manage danger level 0, minor decisions
                this.winningCombinations.map((combination, index) => {
                    if (dangerValutation[index] === 0 && !decision) {
                        let avaiable = [];
                        combination.map(item => {
                            if (avaiablePositions[item]) {
                                avaiable.push(item)
                            }
                        })
                        if (!decision) {
                            this.setAIDecision(avaiable[this.getRand(0, avaiable.length)])
                            decision = true;
                            return;
                        }
                    }
                })
                //Manage danger level 1, minor decisions
                this.winningCombinations.map((combination, index) => {
                    if (dangerValutation[index] === 1 && !decision) {
                        let avaiable = [];
                        combination.map(item => {
                            if (avaiablePositions[item]) {
                                avaiable.push(item)
                            }
                        })
                        if (!decision && avaiable.length > 0) {
                            this.setAIDecision(avaiable[this.getRand(0, avaiable.length)])
                            decision = true;
                            return;
                        }
                    }
                })
                //If it's not exists a possibility for win do random choice
                let avaiable = [];
                for (var i in avaiablePositions) {
                    if (avaiablePositions[i]) {
                        avaiable.push(i)
                    }
                }
                if (!decision && avaiable.length > 0) {
                    this.setAIDecision(avaiable[this.getRand(0, avaiable.length)])
                    decision = true;
                    return;
                }
            }
        },
        setAIDecision(index) {
        this.cells[index] = 'karyl';
        if(!this.checkWinner()) {
          this.myTurn = true;
        } else {
            this.dialog = true;
            this.message = this.winner +' Win';
        }
      },
        getRand(min, max) {
            return Math.floor(Math.random() * max) + min
        },
        //Check if exists a winner
        checkWinner() {
            let g = this.cells;
            let winner = false;
            //Horizontal match
            if (!winner) winner = this.compareValues(g['A1'], g['A2'], g['A3'], ['A1', 'A2', 'A3']);
            if (!winner) winner = this.compareValues(g['B1'], g['B2'], g['B3'], ['B1', 'B2', 'B3']);
            if (!winner) winner = this.compareValues(g['C1'], g['C2'], g['C3'], ['C1', 'C2', 'C3']);
            //Vertical match
            if (!winner) winner = this.compareValues(g['A1'], g['B1'], g['C1'], ['A1', 'B1', 'C1']);
            if (!winner) winner = this.compareValues(g['A2'], g['B2'], g['C2'], ['A2', 'B2', 'C2']);
            if (!winner) winner = this.compareValues(g['A3'], g['B3'], g['C3'], ['A3', 'B3', 'C3']);
            //Cross match
            if (!winner) winner = this.compareValues(g['A1'], g['B2'], g['C3'], ['A1', 'B2', 'C3']);
            if (!winner) winner = this.compareValues(g['A3'], g['B2'], g['C1'], ['A3', 'B2', 'C1']);
            this.checkIfDraw(); //Check if the game is finished
            this.winner = winner;
            return winner;
        },
        checkIfDraw() {
            let avaiablePositions = 0;
            for (var index in this.cells) {
                if (!this.cells[index]) {
                    avaiablePositions++
                }
            }
            if(avaiablePositions === 0 && this.winLines.length === 0) {
              this.dialog = true;
              this.message ="Draw";
            }
        },
        compareValues(a, b, c, index) {
            if (a === b && a === c && a !== false) {
                this.winLines = index;
                return a;
            }
            return false;
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
        },
        resetGame() {
            // this.winner = null;
            // this.cells = [];
            // this.moveMade = 0;
            // this.player = "kokoro";
            // let cell = document.querySelectorAll('.game_view_box');
            // for (var i = 0; i <= 8; i++) {
            //     this.cells.push(null);
            //     cell[i].innerHTML = '';
            // }
             Object.assign(this.$data, defaultData())
        },
        // Bot Control
        botTrun() {
            if (this.winner == null && this.bot && this.player == "karyl") {
                this.bestSpot();
            }
        },
        bestSpot() {
            switch (this.setting.difficult) {
                case 1:
                    this.fillCell(this.emptyCells()[0]);
                    break;
                case 2:
                    console.log()
                    this.fillCell(this.bestMove());
                    break;
                case 3:
                    this.fillCell(this.emptyCells()[0]);
                    break;

            }
        },
        emptyCells() {
            let emptyCells = [];
            for (let x in this.cells) {
                if (this.cells[x] == null) {
                    emptyCells.push(x)
                }
            }
            return emptyCells;
            // return this.cells.filter(cell => cell == null);
        },
        checkWin() {
            for (let i = 0; i <= 7; i++) {
                let winningCombinations = this.winningCombinations[i];
                let a = this.cells[winningCombinations[0]];
                let b = this.cells[winningCombinations[1]];
                let c = this.cells[winningCombinations[2]];
                if (a == null || b == null || c == null) {
                    continue;
                }
                if (a == b && b == c) {
                    if (a == 'karyl') {
                        return c;
                    }
                }
            }
        },
        bestMove() {
            let availableCells = this.emptyCells();
            let finalMove = null;
            console.table(availableCells)
            for (let n in availableCells) {
                this.cells[n.value] = 'karyl';
                let result = this.checkWin();
                this.cells[n.value] = null;

                if (result == undefined) {
                    continue;
                }
                if (result == 'karyl') {
                    finalMove = n;
                }
            }
            if (finalMove == null) {
                finalMove = availableCells[0];
            }
            console.log(finalMove)
            return finalMove;
        },
        miniMax(board, player) {
            let move, moveScore;
            if (player == 'karyl') {
                [moveScore, move] = this.max(board);
            } else {
                [moveScore, move] = this.min(board);
            }

            if (move == null) {
                moveScore = 0;
            }

            return [moveScore, move];
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

.no_shadow {
    box-shadow: none !important;
}

.message_frame {
    position: relative;

    .game_font {
        position: absolute;
        bottom: 10%;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 10;
        background-color: rgba(255, 255, 255, 0.6);
        padding: 10px 20px;
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
