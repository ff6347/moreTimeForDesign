import org.json.*; // https://github.com/agoransson/JSON-processing
import nervoussystem.obj.*; // http://n-e-r-v-o-u-s.com/tools/obj.php

PImage img;
XMLElement xml; 
JSONArray marks = new JSONArray();
void setup() {
  size(360,180,P3D);
  img = loadImage("worldMap_02.jpg");
  image(img,0,0,width,height);
  xml = new XMLElement(this, "World_nuclear_test_sites.kml");
  String desc = xml.getChild("description").getContent();
  String name = xml.getChild("name").getContent();
  //  println(xml.toString());
  ArrayList <XMLElement>  placemarks = new ArrayList();
  for (int i = 0; i < xml.getChildCount();i++) {
    if (xml.getChild(i).getName().equals("Placemark")==true) {
      placemarks.add(xml.getChild(i));
    }
  }
  JSONArray marks = new JSONArray();
    beginRecord("nervoussystem.obj.OBJExport", timestamp()+"nukeTestSites.obj"); 
  for (int j = 0; j < placemarks.size();j++) {
    JSONObject mark = new JSONObject();
    mark.put("name", placemarks.get(j).getChild("name").getContent());
    mark.put("description", placemarks.get(j).getChild("description").getContent());
    String [] coords = split(placemarks.get(j).getChild("Point/coordinates").getContent(), ",");
    mark.put("lat", float(coords[1]));
    mark.put("lon", float(coords[0]));
//        pushMatrix();
//        ellipse(width/2,height/2,5,5);
//     translate(width/2,height/2,0);
   point(float(coords[0])+(width/2),-(float(coords[1]))+(height/2),0);
//     popMatrix();
    marks.put(mark);
  }
      endRecord();

//  println(marks);

  //  for(int i = 0; i < marks.length();i++){
  //    pushMatrix();
  //    translate(width/2,height/2);
  //    point(marks.get(i).getLong("lat"),marks.get(i).getLong("lon"));
  //    popMatrix();
  //  }

  //noLoop();
}

void draw() {
}


String timestamp() {
  Calendar now = Calendar.getInstance();
  return String.format("%1$ty%1$tm%1$td_%1$tH%1$tM%1$tS", now);
}

void writeFile(JSONObject marks, String desc, String name) {

  String [] temp = new String [4];
  temp[0] = "//Based on "+name + "\n " + desc +"\n// edited by fabiantheblind";
  temp[1] = "var testsites = ";
  temp[2] = marks.toString();
  temp[3] = ";";
  String filename = "World_nuclear_test_sites.json";
  saveStrings(filename, temp);
  println("wrote "+ filename+" to disk.");
}




