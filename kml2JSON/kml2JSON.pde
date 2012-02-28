import org.json.*;

XMLElement xml; 
void setup(){
  xml = new XMLElement(this,"World_nuclear_test_sites.kml");
  String desc = xml.getChild("description").getContent();
  String name = xml.getChild("name").getContent();
//  println(xml.toString());
  ArrayList <XMLElement>  placemarks = new ArrayList();
  for(int i = 0; i < xml.getChildCount();i++){
  if(xml.getChild(i).getName().equals("Placemark")==true){
    placemarks.add(xml.getChild(i));
    }
  }
    JSONArray marks = new JSONArray();

  for(int j = 0; j < placemarks.size();j++){
       JSONObject mark = new JSONObject();
       mark.put("name",placemarks.get(j).getChild("name").getContent());
       mark.put("description",placemarks.get(j).getChild("description").getContent());
       String [] coords = split(placemarks.get(j).getChild("Point/coordinates").getContent(),",");
       mark.put("lat",float(coords[1]));
       mark.put("lon",float(coords[0]));
       
    marks.put(mark);
  }
//  println(marks);
  
   String [] temp = new String [4];
    temp[0] = "//Based on "+name + "\n " + desc +"\n// edited by fabiantheblind";
    temp[1] = "var testsites = ";
    temp[2] = marks.toString();
    temp[3] = ";";
    String filename = "World_nuclear_test_sites.json";
saveStrings(filename,temp);
println("wrote "+ filename+" to disk.");
}

void draw(){

}
