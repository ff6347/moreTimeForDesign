
class Station {

  private String name, xml_url, weather, wind_dir;

  private float lat, lon, temp_f, temp_c;

  // constructor
  public Station () {
  }

  public Station (String name, String xmlurl, float lat, float lon) {
    this.name = name;
    this.xml_url = xmlurl;
    this.lat = lat;
    this.lon = lon;
  }
  // SETTER
  public void setNAME(String n) {
    this.name = n;
  }
  public void setXML_URL(String url) {
    this.xml_url = url;
  }

  public void setWIND_DIR(String n) {
    this.wind_dir = n;
  }
  public void setWEATHER(String w) {
    this.weather = w;
  }
  public void setLAT(float l) {
    this.lat = l;
  }
  public void setLON(float l) {
    this.lon = l;
  }
  public void setTEMPC(float l) {
    this.temp_c = l;
  }
  public void setTEMPF(float l) {
    this.temp_f = l;
  }

  // GETTER
  public String getNAME() {
    return name;
  }

  public String getXML_URL() {
    return xml_url;
  }
  public String getWIND_DIR() {
    return wind_dir;
  }

  public String getWEATHER() {
    return weather;
  }

  public float getTEMPF() {
    return temp_f;
  }

  public float getTEMPC() {
    return temp_c;
  }

  public float getLAT() {
    return lat;
  }

  public float getLON() {
    return lon;
  }
}


