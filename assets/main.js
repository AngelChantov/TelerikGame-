'use strict'
const game = new Phaser.Game(1050, 1050, Phaser.AUTO, 'game-canvas', { preload, create, update })
let player1
let A
let D
let W
let background
let map
let layer
let coins
let coin
let counter
let death
let sprite
let text
let text1
let score = 0
let text2
let sus

function preload() {
    game.load.image("Tyles2","/tilemapss/fantasy-tiles.png")
    game.load.image("Tyles1", "/tilemapss/kenny_ground_64x64.png")
    game.load.tilemap('MAP', '/tilemapss/MAP.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('background', '/pictures/background.png')
game.load.spritesheet ('foxy', '/pictures/foxy.png', 600/3, 800/4  )
game.load.spritesheet('coin', '/pictures/coin.png', 384/6, 64/1);
game.load.audio('Sustallica', '/music/metallica-cover.mp3')
}

function create() {
    
  //background
    background = game.add.tileSprite(0, 0, 3840, 3840, 'background');

    //tilemap
    
     map = game.add.tilemap('MAP')
    map.addTilesetImage('Tyles1')
    layer = map.createLayer(0)
    map.setCollisionByExclusion([100])
    layer.resizeWorld()

    
//player
    player1 = game.add.sprite(0, 0, 'foxy')
    player1.animations.add("left", [3,4,5],10, true);
    player1.animations.add("right", [6,7,8],10, true);
    game.physics.arcade.enable(player1)
    player1.scale.setTo(0.3)
    game.camera.follow(player1)
    
    
    player1.body.gravity.y = 1900
    
    

  //coins
  coins = game.add.group()
    coins.enableBody = true
    map.createFromObjects('Object Layer 1', 172, 'coin', 0, true, false, coins)
    coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true)
    coins.callAll('animations.play', 'animations', 'spin')

    //text
    text1 = game.add.text(0, 0, '', { fill: '#ffffff' });
    text1.fixedToCamera = true

    text2 =game.add.text(game.camera.centerX,game.camera.centerY, '', { fill: '#ffffff' })
    text2.anchor.setTo(0.5, 0.5)
    text2.fixedToCamera = true
    text2.visible = false

    //audio
    sus = game.add.audio('Sustallica')
    //game.sound.setDecodedCallback([sus], start, this)
}


function update() {
    
    Death()
    game.physics.arcade.collide(player1, layer)
    player1.body.collideWorldBounds = true
    if((game.input.keyboard.isDown(Phaser.Keyboard.A))){
       
        player1.animations.play('left')
        player1.body.velocity.x = -300
   }else if((game.input.keyboard.isDown(Phaser.Keyboard.D))){
        
        player1.body.velocity.x = 300
        player1.animations.play('right')
    }else{
        player1.body.velocity.x = 0
        player1.animations.stop()
   }
   
if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
    if (player1.body.onFloor()){
        player1.body.velocity.y = -1000
   }

}
if(player1.body.velocity.y >= 1000){
    player1.body.velocity.y = 1000
}
//text
text1.text = 'Score: '+ score

//text2 = (game.camera.centerX,game.camera.centerY, '', { fill: '#ffffff' })
text2.text = 'To win, close your browser'
      //text2.fixedToCamera = true
      //text2.visible = false
      



//coins
game.physics.arcade.overlap(player1, coins, collectCoin, null, this)
    game.physics.arcade.collide(coins, layer)


}
function collectCoin(_player1, coin) {
    coin.kill()
    score++
    if(score>= 99){
    sus.play()
      text2.visible = true
    }

}

    
function createButtons(){
    A = game.input.keyboard.addKey(Phaser.Keyboard.A)
    D = game.input.keyboard.addKey(Phaser.Keyboard.D)
    W = game.input.keyboard.addKey(Phaser.Keyboard.W)
}


function Death(){
if ( player1.y>3750)
    {
        score = 0
        coins.removeAll()
        player1.reset(0,0)
        coins = game.add.group()
    coins.enableBody = true
    map.createFromObjects('Object Layer 1', 172, 'coin', 0, true, false, coins)
    coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true)
    coins.callAll('animations.play', 'animations', 'spin')
    
        text = game.add.text(0, 3110, 'You died try again >:)', { fill: '#ffffff' });
        

    }
   

}
