class Game {
        constructor(){}

        getState(){
          var gameStateRef  = database.ref('gameState');
          gameStateRef.on("value",function(data){
            gameState = data.val();
          })

        }

        update(state){
          database.ref('/').update({
            gameState: state
          });
        }

        async start(){
          if(gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
              playerCount = playerCountRef.val();
              player.getCount();
            }
            form = new Form()
            form.display();
          }
        //put sprites here for trex/ground object
        ground = createSprite(400,600,800,800)
        ground.addImage("ground1",groundImg)
        ground.scale= 5.5
        ground.velocityX = -5
        inground1 = createSprite(400,650,800,15);
        inground2 = createSprite(400,450,800,15);
        trex1 = createSprite(200,600)
        trex1.addImage("trex1",trex1I)
        trex1.scale = 0.5 
        trex2 = createSprite(150,400)
        trex2.addImage("trex2",trex1I)
        trex2.scale = 0.5
        trex = [trex1,trex2]
        
        }

        play(){
          form.hide();
          textSize(30);
          text("Game Start", 120, 100)
          Player.getPlayerInfo();
          trex1.collide(inground1);
          trex2.collide(inground2);
          this.spawnObstacles();
          if(player.index === 1 ){
            score1 =+1
            player.score = score1
          }
          else if(player.index === 2 ){
           score2 =+2
           player.score = score2
          }
          if(ground.x<=0){
            ground.x = ground.width/2
          }
          //console.log(player.index)
          if(keyDown("space")){
      
                if(player.index === 1 ){
      
                        console.log("inside jump if block")
                        trex[player.index-1].y=trex[player.index-1].y-50;
                        //trex1.velocityY = -12
                
                        //trex1.velocityY =+0.75;
                  }
          else if(player.index === 2 ){
            
                        console.log("inside jump if block")
                        trex[player.index-1].y=trex[player.index-1].y-=50;
                        //trex2.velocityY = -12
                      
                        //trex2.velocityY =+0.1;
            
                  }
          }
          trex[player.index-1].y=trex[player.index-1].y+10;
          if(obstacleG.isTouching(trex1)||obstacleG.isTouching(trex2)){
            this.end();
          }
              drawSprites()
      }
          end(){
                console.log("Game Over");
                text("game over", 100 , 100)
              obstacle.velocityX = 0
              ground.velocityX = 0
              //  console.log("Your rank is :"+ player.rank);
                form.restart();
              //  alert("game over")
              //  swal
          }

      spawnObstacles(){
                if (frameCount % 60 === 0){
                  var obstacle = createSprite(600,165,10,40);
                  obstacle.velocityX = -6;
                  obstacle.addImage(obstacle1);
                  obstacle.scale = 0.1
                  var rand = Math.round(random(400,600))
                  console.log("rand" + rand )
                  //assign scale and lifetime to the obstacle           
                  obstacle.lifetime = 300;
                  obstacle.y = rand
                  //add each obstacle to the group
                  obstacleG.add(obstacle);
                }
          }
}
