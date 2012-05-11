// this is based on this code
// http://processing.org/discourse/yabb2/YaBB.pl?num=1248664247


float phi = (sqrt(5)+1)/2; // Calculate Phi
  float sx, sy;
  float speed = radians(45);
  boolean on = false;
  float x;
  float y; 
  float angle = radians(0); // Current angle


void setup(){
size(500,500);

  
      sx = width/2;
    sy = height/2;
    on = true;
}



void draw(){

  
      if (on == true) {
      angle += speed; //Update the angle
      float sinval = sin(angle);
      float cosval = cos(angle);
      float x = cosval * (pow(phi, (2/PI)*(angle)));
      float y = sinval * (pow(phi, (2/PI)*(angle)));
      ellipse(x + sx, y + sy, 4, 4); // Draw circle
        if (x > width) {
         on = false;
         angle = 0;
       }
}
}
