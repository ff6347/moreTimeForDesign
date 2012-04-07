#include <iostream>
#include <string>

// using namespace std;
class Object{
	
public:
	std::string name;

	Object(){}// basis constructor

	Object(std::string in){name = in;}// another constructor

	int compare(int a, int b);//Prototype

	void setName(std::string in){name = in;}
};

int Object::compare(int a, int b){

	if(a>b){return a;}else{return b;}
}

int main()
{
	Object* myObject = new Object("Hello World");

	int a = 23,b = 5;

	std::cout << "The Object named: "<< 
	myObject->name << "\nCompared: "
	<< a << " with "
	<< b << "\n" 
	<< myObject->compare(a,b) <<" is bigger\n" 
	<< std::endl;
	/* code */
	delete myObject;
	return 0;
}