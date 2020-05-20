<template>
  <div>
    <div class="playerturn">
    <h2 class="is-size-2">Turn: <span v-if="turn==0">Team 1</span> <span v-else>Team 2</span></h2>
    </div>
    <section class="section">
      <div class="container">
        <div class="columns is-mobile is-multiline">
          <div class="column is-3-mobile" v-for="player in players">
            <img :src="getImg(player.id)" />
              <p :class="[{'del':!player.disp},'is-size-6']">{{player.name}}</p>
              <p :class="[{'del':!player.disp},'is-size-6']">CH$ {{player.value}}</p>
                <b-button size="is-small" class="is-success buy-button" v-if="player.disp==true" @click="buyPlayer(player,turn)">
                Buy
                </b-button>
            </div>
          </div>
        </div>
    </section>
      <section class="section">
        <div class="container teams-list">
          <div class="columns">
            <div class="column">  
              <h2>
              <b>Team 1</b> - Saldo: <b>CH$ {{bank[0].player[0].saldo}} | ({{bank[0].player[1].players.length}} / 5)</b>
                <b-button class="is-warning sell-button" size="is-small" v-if="turn == 0" @click="nextTurn(turn)">Pass</b-button>    
              </h2>
                  <p v-for="player in bank[0].player[1].players">
                    <span>{{player.name}}</span> - <span>CH$ {{player.value}}</span>
                    <b-button class="is-danger sell-button" size="is-small" v-if="turn == 0" @click="sellPlayer(player,turn)">
                    Sell
                    </b-button>
                  </p>
              </div>
              <div class="column">
                <h2>
                <b>Team 2</b> - Saldo: <b>CH$ {{bank[1].player[0].saldo}} | ({{bank[1].player[1].players.length}} / 5)</b>
                  <b-button class="is-warning sell-button" size="is-small" v-if="turn == 1" @click="nextTurn(turn)"> Pass </b-button>    
                </h2>
                    <p v-for="player in bank[1].player[1].players">
                      <span>{{player.name}}</span> - <span>CH$ {{player.value}}</span>
                      <b-button class="is-danger sell-button" size="is-small" v-if="turn == 1" @click="sellPlayer(player,turn)">
                      Sell
                      </b-button>          
                    </p>
                </div>
            </div> 
          </div>
      </section>       
      <b-button class="is-dark" @click="startOver">
        Limpar tudo
      </b-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
    return {
      players: [
        { name: "Valci", value: 60, id:1, disp:true },
        { name: "Diego", value: 50, id:2, disp:true },
        { name: "Rodrigo", value: 50, id:3,disp:true },
        { name: "Tico", value: 30, id: 4, disp:true },
        { name: "Leo", value: 30, id:7, disp:true},      
        { name: "Eric", value: 20, id: 5, disp:true},
        { name: "Rafinho", value: 20, id:6, disp:true},
        { name: "Jv", value: 10, id:8, disp:true},
        { name: "Bill", value: 10, id:9, disp:true},
        { name: "Remo", value: 10, id:10, disp:true},
        { name: "Bolívar", value: 10, id:11, disp:true},
        { name: "JACF", value: 5, id: 12, disp: true},
        { name: "Lucas", value: 5, id: 13, disp: true}
      ],
      bank: [
        {player:[
          {saldo:110},
          {players:[]} 
          ]},
        {player:[
          {saldo:110},
          {players:[]}      
        ]}
      ],
      database: [
        {comprados:[]}
      ],
      turn: 0
    }
  },
    methods: {
      buyPlayer: function(id,turn){
        if(this.bank[turn].player[0].saldo > id.value || this.bank[turn].player[0].saldo == id.value) {
          if(this.bank[turn].player[1].players.length == 5){
            alert('time completo!!')
          } else {
            if(this.bank[turn].player[1].players.indexOf(id)==-1){
              this.bank[turn].player[1].players.push(id)  
              this.bank[turn].player[0].saldo -= id.value
              this.players.find(x=>x.id===id.id).disp = false
              this.nextTurn(turn)
            } else {
              alert('já comprado!!')
            }           
          }
        } else {
          alert("acabou o dinheiro!!")
        }
      },
      sellPlayer: function(player,turn){
        _.remove(this.bank[turn].player[1].players,{
          id:player.id
        })
        this.players.find(x=>x.id===player.id).disp = true      
        this.bank[turn].player[0].saldo += player.value  
        this.nextTurn(turn)
      },
      startOver: function(){
        this.bank[0].player[1].players = []
        this.bank[0].player[0].saldo = 110
        this.bank[1].player[1].players = []
        this.bank[1].player[0].saldo = 110
        this.players.forEach(function(player){
          player.disp=true
        })
      },
      nextTurn: function(turn){
        if(turn==0){
          this.turn = 1
        } else {
          this.turn = 0
        }
      },
      getImg: function(id){
      return "https://api.adorable.io/avatars/71/"+id+".png"
      }
    }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.player-list {
  padding: 5px;
}
.teams {
  margin:10px 0;
}
.teams-list p{
  padding:5px 0;
}
.sell-button {
  margin-left:10px;
}
.buy-button {
  margin-top:10px;
}
.del {
  text-decoration:line-through;
}
</style>
