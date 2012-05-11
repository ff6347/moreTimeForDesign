//found here http://processing.org/discourse/yabb2/YaBB.pl?num=1260544401
int x1 = 5;
int y1 = 10;
int x2 = 30;
int y2 = 50;
float a, b;
float x, y, px, py;
float step = 1;

void setup()
{
  size(100, 100);
  a = y2 - y1;
  if (x1 == x2){
    a = 0;
  }else{
     a = a /( x2 - x1);
   }
  b = y1 - x1 * a;
  px = x1; 
  py = y1;
}

void draw()
{
  x = px + step;
  if (x > x2){ 
  noLoop();
}
  y = fun(x);
  line(px, py, x, y);
  px = x; py = y;
}

float fun(float x)
{
  return a * x + b;
}
 
