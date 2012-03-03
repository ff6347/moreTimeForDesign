#IMPORTANT README
#placeOnWorldMap.js
this script "placeOnWorldMap.js" builds a map and places data on it  
right now it can build  
- the capitols of the world  
- 2000 weather stations from nort america  
- nuclear test sites from 1945 till 2006  
nuclear testsites is the most implemeted one  
  
##requirements in short  
this is tested in InDesign CS5  
some of the view settings may not work in CS 4 - everything else should  
remove out function reset_activeView(page) if you use CS4  

 **these are the databases the code works with:**  
[https://raw.github.com/fabiantheblind/world.geo.json/master/countries.geo.json](https://raw.github.com/fabiantheblind/world.geo.json/master/countries.geo.json)  
[https://raw.github.com/fabiantheblind/moreTimeForDesign/javascript/indesign/jsonfiles/World_nuclear_test_sites.json](https://raw.github.com/fabiantheblind/moreTimeForDesign/javascript/indesign/jsonfiles/World_nuclear_test_sites.json)  
**this is the image used:**  
[https://github.com/fabiantheblind/moreTimeForDesign/raw/javascript/indesign/radiation_warning.bmp](https://github.com/fabiantheblind/moreTimeForDesign/raw/javascript/indesign/radiation_warning.bmp)  
**without them there is no map and so on**  
**for convinence you can load zipped packages from here:**   
 here: [https://github.com/fabiantheblind/moreTimeForDesign/zipball/javascript](https://github.com/fabiantheblind/moreTimeForDesign/zipball/javascript)  
 and here: [https://github.com/fabiantheblind/world.geo.json/zipball/master](https://github.com/fabiantheblind/world.geo.json/zipball/master) 
     
the folder structure is like this (Mac):  
in (folder) Applications in (folder) InDesign CS5+ in (folder) Scripts in (folder) Scripts Panel in (folder) moreTimeForDesign  
      
in (folder) indesign (file) placeOnWorldMap.js  
in (folder) indesign (file) radiation_warning.bmp
in (folder) indesign in (folder) jsonfiles (file) World_nuclear_test_sites.json  
in (folder) indesign in (folder) world.geo.json (file) countries.geo.json  
  
**and this is the used font DejaVu:**  
[http://dejavu-fonts.org/wiki/Main_Page](http://dejavu-fonts.org/wiki/Main_Page)

so if you load the zipped packages you just have to:   
- rename folder the "faibantheblind-world.geo.json-********"" to world.geo.json  
- drop it next to the scriptfile  
- install the fonts  
  
be aware of the folder structure  

fabiantheblind 2012 03 03  