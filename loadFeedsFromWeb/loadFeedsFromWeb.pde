XMLElement xml;

void setup() {
  size(200, 200);
  xml = new XMLElement(this, "http://www.weather.gov/xml/current_obs/index.xml");
  int numSites = xml.getChildCount();
  for (int i = 0; i < numSites; i++) {
        XMLElement kid = xml.getChild(i);

  println(kid.getName());
  }
}
