
class Station {

private String name;
private String xml_url;
private float lat;
private float lon;

// constructor
public Station (){
}

public Station (String name,String xmlurl,float lat, float lon){
this.name = name;
this.xml_url = xmlurl;
this.lat = lat;
this.lon = lon;
  
}

public void setNAME(String n){
this.name = n;
}
public void setXML_URL(String url){
this.xml_url = url;
}
public void setLAT(float l){
this.lat = l;
}
public void setLON(float l){
this.lon = l;
}
public String getNAME(){
return name;
}

public String getXML_URL(){
return xml_url;
}

public float getLAT(){
return lat;
}

public float getLON(){
return lon;
}


}
