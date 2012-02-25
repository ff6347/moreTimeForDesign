XMLElement xml;
ArrayList <Station> stations = new ArrayList();
void setup() {
  size(200, 200);
  xml = new XMLElement(this, "http://www.weather.gov/xml/current_obs/index.xml");
  int numStations = xml.getChildCount();
  for (int i = 0; i < numStations; i++) {
    XMLElement xmlStation = xml.getChild(i);

    if (xmlStation.getName().equals("station")==true) {


      //        println(xmlStation.toString());
      //        println(st_name.toString());


      //THIS IS THE LONG WAY
      //        XMLElement st_name = xmlStation.getChild("station_name");
      //        XMLElement st_xmlrl = xmlStation.getChild("xml_url");
      //        XMLElement st_lat = xmlStation.getChild("latitude");
      //        XMLElement st_lon = xmlStation.getChild("longitude");
      //        
      //        String name  = st_name.getContent();
      //        String url = st_xmlrl.getContent();
      //        float lat = float(st_lat.getContent());
      //        float lon = float(st_lon.getContent());

      // I LIKE IT SHORT no extra variable creation
      // make a station 
      Station st = new Station();

      st.setNAME(xmlStation.getChild("station_name").getContent());
      st.setXML_URL(xmlStation.getChild("xml_url").getContent());
      st.setLAT(float(xmlStation.getChild("latitude").getContent()));
      st.setLON(float(xmlStation.getChild("longitude").getContent()));
      // you could also use this constructor
      // Station (String name,String xmlurl,float lat, float lon)

      stations.add(st);
    }
  }

  println(stations.get(0).getNAME());
  
   XMLElement xml_url = new XMLElement(this, stations.get(0).getXML_URL());
    println(xml_url.toString());

}

