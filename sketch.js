var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj,currentTime;
var feed,lastFed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("FEED DOG");
  feed.position(700,105);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,105);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  currentTime = hour();

  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
 }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
 }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
 }else{
    update("Hungry")
    foodObj.display();
 }
 

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour(),
  gameState:"Hungry"
    })
  }



//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
  food:foodS
  })
}
