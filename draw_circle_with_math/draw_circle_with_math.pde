// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Exercise 13-5: Using Example 13-5, draw a spiral path. Start in the center and move 
// outward. Note that this can be done by changing only one line of code and adding one line 
// of code!           

// A Polar coordinate, radius now starts at 0 to spiral outwards
float r = 25;
float theta = 0;
float w = 5;
float phi = 1;
float Phi = 1/phi;
void setup() {
  size(1000,1000);
  background(255);
  smooth();
  frameRate(1);
}

void draw() {
//  background(255,5);
fill(255,3);
//rect(0,0,width,height);
  // Polar to Cartesian conversion
  float x = r * cos(theta);
  float y = r * sin(theta);

  // Draw an ellipse at x,y
//  noStroke();
//  fill(0);
noFill();
strokeWeight(10);
  // Adjust for center of window
  point(x+width/2, y+height/2); 

  // Increment the angle
  theta += radians(90);
  // Increment the radius
//  r += 0.2;

 r = Phi*(2*(theta/PI));
// phi = phi*2;
 Phi = 1/phi;
//  w+=0.01;
  println("radians: "+ (theta)%(2*PI));
  
    println("degrees: " + degrees(theta)%(360));

}
