const rand=(max,min=0)=>{
  return Math.floor(Math.random()*max)+min
}
const scoreEl=document.querySelector("#score");
const canvas=document.querySelector("canvas");
canvas.width=innerWidth;
canvas.height=innerHeight;
const ctx=canvas.getContext("2d");
let color="blue";
let animate=null;
let moves=[];
let down=10;
let numOfEnmy=10;
let add=true;
let score=0;
let colors=["#F100AC","#00F163","#DCFFEA","#8C00FF","#FF2A00","#FF00D9"
  ]
  const start="";
class Enemies {
  constructor(speed){
    this.speed=speed;
  }
  create(num){
    add=true;
    for(let i=0;i<num;i++){
      //rnd color here
          const x=Math.floor(Math.random()*canvas.width)+20;
      this.drawEnemy(x);
    }
    
   this.update()
  }
  drawEnemy(x,y=Math.floor(Math.random()*2)){
    ctx.beginPath();
    ctx.fillStyle=colors[rand(colors.length-1)];
    ctx.strokeStyle=colors[rand(colors.length-1)];
    ctx.arc(x,y,10,0,Math.PI*2,true);
    ctx.fill()
    ctx.stroke();
    add ? moves.push({"x":x,"y":y}):''
  }
  update(){
    add=false
    let addEnemy=0;
    let bulletSpeed=0;
    let level=1000;
    let levelLife=0;
    animate=setInterval(  ()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i=0; i<moves.length;i++){
        const e=moves[i];
        if(e.y<canvas.height){
        e.y+=0.2+levelLife;
        this.drawEnemy(e.x,e.y);
     
        }
        else {
          moves.splice(i,1);
             //lost
             score -= 1;
          const x = Math.floor(Math.random() * canvas.width)+20;
          this.drawEnemy(x);
          //moves.length < 5 ? this.create(numOfEnmy):""
          if(numOfEnmy>40){
            clearInterval(animate);
         //   this.speed-=4;
           // numOfEnmy=10;
            
          }
          if(moves.length==5){
           // numOfEnmy+=2
          }
          }
          addEnemy++;
          if (addEnemy>level) {
            moves.push({ "x": rand(canvas.width), "y": rand(canvas.height /100) });
            addEnemy=0;
          }
          bulletSpeed++;
          if(bulletSpeed>250){
            bulletSpeed=0;
            if(bullets.length<moves.length*2){
            bullets.push(
              {"x":playerPoint.x, 
              "y":playerPoint.y});
            }
          }
          ///killlings
          
          let j;
          for (j = 0; j < bullets.length; j++) {
            const e = bullets[j];
            if (e.y > 0) {
              e.y -=0.4;
            }
            else {
              bullets.splice(j, 1);
            }
            const bulletVelocity=Math.floor(e.y);
            const enemyVelocity=Math.floor(moves[i].y)
            const enemyPoint=Math.floor(moves[i].x);
            const bulletPoint=Math.floor(e.x)
          if(bulletVelocity<=enemyVelocity && (bulletPoint == enemyPoint
          || bulletPoint+2==enemyPoint || bulletPoint+4==enemyPoint 
           || bulletPoint+6==enemyPoint 
           || bulletPoint-2==enemyPoint 
           || bulletPoint-4==enemyPoint 
           || bulletPoint-6==enemyPoint 
          
          || bulletPoint+1==enemyPoint || bulletPoint+3==enemyPoint 
           || bulletPoint+5==enemyPoint 
           || bulletPoint-1==enemyPoint 
           || bulletPoint-3==enemyPoint 
           || bulletPoint-5==enemyPoint 
          )){
            moves.splice(i,1);
            bullets.splice(j,1);
            clash(e.x,e.y);
            score+=1;
          }
            player.shot(e.x, e.y);
          }
          
      }//end for
      //player updates
      if(moves.length<1){
        win();
    
        levelLife+=1;
        level-=200;
      }
      
      player.drawPlayer(playerPoint.x,playerPoint.y);
      scoreEl.innerHTML="Score : "+score;
    },this.speed)
    
  }
  }


let playerPoint={
  "x":canvas.width/2,
  "y":canvas.height-50
}
let bullets=[{"x":0,"y":0}]

const handleTouch=(e)=>{
  const x=e.touches[0].clientX;
  const y=e.touches[0].clientY;
  playerPoint.x=x;
  playerPoint.y=y;
}
addEventListener("touchstart",handleTouch)
addEventListener("touchmove",handleTouch)
addEventListener("touchend",handleTouch)
class Player{
  constructor(life){
    this.life=life;
  }
  drawPlayer(x=playerPoint.x,y=playerPoint.y){
    ctx.beginPath();
    ctx.fillStyle="blue"
    ctx.fill();
    ctx.arc(x,y,30,0,Math.PI*2,true);
    //bullets
    ctx.stroke();
    ctx.closePath()

  }
  shot(x=playerPoint.x,y=playerPoint.y){
        //bullets
        ctx.beginPath()
    ctx.fillRect(x-2.5,y-30,5,6);
       ctx.stroke()

  }
}

function clash(x,y){
  ctx.beginPath();
  ctx.fillStyle="red";
  ctx.fillRect(x,y,7,12);
  ctx.fillStyle="blue";
  ctx.arc(x,y,35,0,Math.PI*2,true);
  ctx.fill()
  ctx.closePath();
}
clash(100,100)
const enemy=new Enemies(10);
const player=new Player(5);
onload=()=>{
//style.cssenemy.create(numOfEnmy);
//player.drawPlayer();
}
const go=()=>{
  enemy.create(numOfEnmy);
  player.drawPlayer();
  document.querySelector(".st"). style.display="none";
  document.querySelector("audio").play()
}
ondblclick=()=>{
 // clearInterval(animate)
}
function win(){
  document.querySelector("#msg").style.display="flex";
}
function again(){
      numOfEnmy+=10;
  document.querySelector("#msg").style.display="none";
  moves.splice(0,moves.length)
  bullets.splice(0,bullets.length);
  clearInterval(animate);
  enemy.create(numOfEnmy);
  player.drawPlayer();
}
//win()