class TicTacToe{
    constructor(selector){
        this.parrentElement = document.querySelector(selector);
        this.playerList = ['x','o'];
        this.gameBoards = Array(9).fill('');
        this.currentPlayer =0;

        this.Init();

    }

    Init(){
        this.buildGameUI();
    }

    getPlayerLabel(){
        return this.playerList[this.currentPlayer];
    }

    buildCardPlayer(playerName,playerNumber){
        return `<div class="box-player">
                <p class="player-label ${playerName}">
                   ${playerName}
                </p>
                <p class="player-name">
                <b>Player ${playerNumber} </b>
                </p>
                <p class="nert">Giliranmu</p>
    </div>`
    }


    buildGameUI(){
        //gameinfo

        const gamaeInfoEL = document.createElement('div');
        gamaeInfoEL.className = 'game-info';


        let playerCards ='';
        this.playerList.forEach((player, i) => {
            playerCards += this.buildCardPlayer(player,i+1)
        });

        gamaeInfoEL.innerHTML = playerCards;
    
    //button reset
    const gamecontrol = document.createElement('div');
    gamecontrol.className = 'game-control';

    const btnReset = document.createElement('button');
    btnReset.className = 'btn btn-reset';
    btnReset.innerText='Reset Game';
    btnReset.addEventListener('click', () => this.gameReset());

    gamecontrol.appendChild(btnReset);
    gamaeInfoEL.appendChild(gamecontrol);

    //gameplay
     const gamaePlayEL = document.createElement('div');
     gamaePlayEL.className = 'game-play';

     for (let i = 0; i <9; i++) {
        const btn = document.createElement('button');
        btn.className = 'btn-tic-tac-tow';
        btn.addEventListener('click',(e) => this.onCellClick (e, i))
        gamaePlayEL.appendChild(btn);

        
     }

     //append to parrent element
     this.parrentElement.append(gamaeInfoEL,gamaePlayEL);
     this.gamaePlayEL =gamaePlayEL;

    }

    onCellClick(event, index){
        const btn = event.target;
        btn.innerText = this.getPlayerLabel();
        btn.classList.add(btn.innerText)
        btn.disabled = true
        this.gameBoards [index] = btn.innerText;

        this.checkWinner ();
        this.switchPlayer();

    }

    switchPlayer(currentPlayer = undefined) {
        if(currentPlayer != undefined){
            this.currentPlayer = currentPlayer;
        }else{
            this.currentPlayer = this.currentPlayer == 1 ? 0 : 1;
        }

        const boxPlayer = document.querySelectorAll('.box-player');
        boxPlayer.forEach((box,i)=>{
            if(this.currentPlayer == i){
                box.classList.add('active');
            }else{
                box.classList.remove('active');
            }
        });
    }

    gameReset(){
        this.gameBoards = Array(9).fill('');
        this.switchPlayer(0)

        for (const btn of this.gamaePlayEL.children){
            btn.innerHTML = '';
            btn.classList.remove(...this.playerList);
            btn.disabled = false;
        }
    }

    checkWinner(){
        const winConditions = [
            [0, 1, 2], //horizontal
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6], //vertical
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8], //diagonal left - right
            [2, 4, 6], //diagonal right - left
        ];

        for (let i = 0; i < winConditions.length; i++) {
            const [a,b,c] = winConditions [i];

            if(
                this.getPlayerLabel() == this.gameBoards[a] &&
                this.getPlayerLabel() == this.gameBoards[b] &&
                this.getPlayerLabel() == this.gameBoards[c]
            ){
                Swal.fire({
                title: 'Mantap Men',
                text:`Selamat player ${this.currentPlayer+1} kamu memenangkan permainan ini `,
                showDenyButton: true,
                confirmButtonText: 'Kembali !',
                denyButtonText: `Main lagi dong`,
                icon: 'success',

                }).then((result) => {
                    //disable other better
                    for (const btn of this.gamaePlayEL.children){
                        btn.disabled = true;
                    }

                 if (result.isDenied) {
                    this.gameReset();
                    Swal.fire('Permainan sudah direset, Ayo main lagi', '', "info");
                }
            });
          }
            
      }
       
 } 
   }
