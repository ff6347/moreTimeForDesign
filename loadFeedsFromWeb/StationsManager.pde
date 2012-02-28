class StationsManager {

  public XMLElement xml;
  public ArrayList <Station> stations = new ArrayList();
  private String url =  "http://www.weather.gov/xml/current_obs/index.xml";
  private PApplet p;
  StationsManager(PApplet p) {
    this.p = p;
  }


  public void init() {

    xml = new XMLElement(p, url);
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
        //strings
        st.setNAME(xmlStation.getChild("station_name").getContent());

        st.setLAT(float(xmlStation.getChild("latitude").getContent()));
        st.setLON(float(xmlStation.getChild("longitude").getContent()));
        st.setXML_URL(xmlStation.getChild("xml_url").getContent());
println(xmlStation);


        //      st.setWEATHER(xmlStation.getChild("weather").getContent());
        //      st.setWIND_DIR(xmlStation.getChild("wind_dir").getContent());
        //values
        //      st.setTEMPF(float(xmlStation.getChild("temp_f").getContent()));
        //      st.setTEMPC(float(xmlStation.getChild("temp_c").getContent()));

        // you could also use this constructor
        // Station (String name,String xmlurl,float lat, float lon)


        stations.add(st);
      }
    }

    println(stations.get(0).getNAME());
    for (int j = 0; j < stations.size();j++) {
      try{
      XMLElement currObs = new XMLElement(p, stations.get(j).getXML_URL());
      delay(5000);
            println(stations.get(j).getNAME());
            stations.get(j).setWIND_DIR(currObs.getChild("wind_dir").getContent());
            stations.get(j).setWEATHER(currObs.getChild("weather").getContent());
            stations.get(j).setTEMPC(float(currObs.getChild("temp_c").getContent()));
            stations.get(j).setTEMPF(float(currObs.getChild("temp_f").getContent()));
//      println(currObs.toString());
      }catch(Exception e){
//                  stations.get(j).setWIND_DIR("undefined");
//            stations.get(j).setWEATHER("undefined");
      }

//            stations.get(j).setTEMPC(null);
//            stations.get(j).setTEMPF(null);
    }
  }
  
  
  
  public void writeToFile(String filename){
  
  JSONArray stList = new JSONArray();
  
   for(int i = 0; i < stations.size();i++){
     Station s = stations.get(i);
     JSONObject st = new JSONObject();
//       private String name, xml_url, weather, wind_dir;
//
//  private float lat, lon, temp_f, temp_c;
     st.put( "name", s.getNAME() );
     st.put( "url", s.getXML_URL() );
     st.put( "weather", s.getWEATHER());
     st.put( "wind_dir", s.getWIND_DIR());
     
     st.put( "lat", s.getLAT());
     st.put( "lon", s.getLON());
     st.put( "temp_c",s.getTEMPC() );
     st.put( "temp_f", s.getTEMPF());
     

   stList.put( st );
     
     
   }
    println( stList ); 
    String [] temp = new String [3];
    temp[0] = "var data = ";
    temp[1] = stList.toString();
    temp[2] = ";";
saveStrings(filename,temp);
println("wrote "+ filename+" to disk: ");
  }
}

