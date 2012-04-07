class AnObject{

  String name;

  AnObject(){}
  
  AnObject(String name){
  this.name = name;
  }

int compare(int a,int b){
	if(a>b){return a;}else{return b;}
  }
}


AnObject myObject = new AnObject("Hello World");
int a = 23, b = 5;

void setup(){
println("The Object named: "+ myObject.name +"\nCompared: "+ a +" with "+ b +"\n" + myObject.compare(a,b) + " is bigger\n");
}

