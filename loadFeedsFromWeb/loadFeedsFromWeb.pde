import org.json.*;

// This program loads weather data from weather.gov via xml
// und putss out JSON for use in Extendscript 

// Copyright (C) 2012 Fabian "fabiantheblind" Morón Zirfas
// http://www.the-moron.net
// http://fabiantheblind.info/
// info [at] the - moron . net

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see http://www.gnu.org/licenses/

// dependencies Processgin JSON LIB
// by agoransson
// https://github.com/agoransson/JSON-processing


StationsManager manager;
void setup() {
  size(200, 200);
  manager = new StationsManager(this);
  manager.init();
  manager.writeToFile("stations.json");
 
}

