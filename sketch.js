//Create variables here
var dog, database, foodS, foodStock;
var dogImg,happyDogImg;
var database;
var feed,addFood;
var  fedTime, lastFed;
var food;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

 
  
  createCanvas(500, 500);
  dog = createSprite(200,300,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  food = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {  
  background(46,139,87);
 food.display();
 
 fedTime = database.ref("Feedtime");
 fedTime.on("value",function(data){
   lastFed = data.val();

 });


 fill(255,255,254);
 textSize(15);

 if(lastFed>=12){
 text("Last Feed : " + lastFed%12,350,30);
 }else if(lastFed==0){
   text("Last Feed : 12 AM",350,30);
 }else{
   text("Last feed:" + lastFed + "AM",350,30);
 }

  drawSprites();
  //add styles here

  text("Food remaining :" + foodS,170,200);
}

function readStock(data){
   foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
    
  })
 
}
 function addFoods(){
   foodS++;
   database.ref('/').update({
     Food:foodS
   })
 }

 function feedDog(){
   dog.addImage(happyDogImg);

   food.updateFoodStock(food.getFoodStock()-1);
   database.ref('/').update({
     Food:foodObj.getFoodStock(),
     feedTime:hour
   })
 }
