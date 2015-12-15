# Testing geospatial data
The normal approach when testing a geospatial application is:

* Insert geometries (and attributes) into source data store (file or database) - ie - put source data store into a known state.
* Run application.
* Compare geometries (and attributes) in target store with an expected output.

The basic approach is the same as for any data testing - 'geospatial is not special'.  But there are a few challenges which makes the task harder:

* How to store source geometries?
	* What format to use?
	* How to create / maintain these geometries?
	* How to insert them into the source database?
* How to compare output geometries?
	* When is a geometry equal to another geometry?
		* If a polygon has the same vertices as another polygon, but the start vertex is different, are they different?
		* If coordinates are stored with different precision, but the vertices are the same when rounded?
		* If polygon rings have a different orientation?
	* String representations of geometries (eg WKT) are not always the same
		* LINESTRING(0 0,1 1) versus LINESTRING (0 0, 1 1) (spaces)
		* POINT Z (1 1 3) versus POINT(1 1 3)
		
## Example test approach
### Storing source / expected data
* we have used CSV files which mirror database tables
	* geometry field contains WKT
	* files can be viewed directly in QGIS, easily read by FME
	* easy to create **exact** geometric shapes (topology, area, length)
	* easy to load
	* easy to maintain - no special software
	* database agnostic
	* can export csv from 'real' data sources
	
### Data comparison
* for anything but basic comparison, avoid comparing strings eg WKT
* we have used [Java Topology Suite](http://tsusiatsoftware.net/jts/main.html) features for comparison
	* allows normalisation of geometries
	* allows rounding of coordinates
	* GeoTools can directly import / export JTS features to / from Oracle (and other sources)
	* allows other spatial comparisons
	* in-built 'equals' method which will do spatial comparison of geometries.  See [FeatureListComparer.java](src/data-test/FeatureListComparer.java) for an example of how easy comparison is.

### Ruby
* Ruby has RGeo bindings for the GEOS C++ library, which implements JTS.
* See [test-rgeo-geos.rb](src/data-test/test-rgeo-geos.rb) for an example of normalising a geometry, and comparing lists of geometries. Example output from that script:
```
C:\>test-rgeo-geos.rb
POLYGON ((0.0 0.0, 0.0 1.0, 1.0 1.0, 1.0 0.0, 0.0 0.0))
POLYGON ((0.0 0.0, 0.0 1.0, 1.0 1.0, 1.0 0.0, 0.0 0.0))
Equal?  true
Diffs:  2
Added: [#<RGeo::Geos::FFIPolygonImpl:0x1658670 "POLYGON ((0.0 0.0, 0.0 1.0, 1.0 1.0, 2.0 0.0, 0.0 0.0))">]
Removed: [#<RGeo::Geos::FFIPolygonImpl:0x16a1df8 "POLYGON ((0.0 0.0, 0.0 2.0, 1.0 1.0, 1.0 0.0, 0.0 0.0))">]
```

#### How to install RGeo with GEOS support (Windows)
* Download & install OSGeo4W (32-bit) from: https://trac.osgeo.org/osgeo4w/
* Advanced Install > Install from Internet (accept all other defaults)
* Select the GEOS geometry library (Bin checkbox; accept other defaults)
* Create environment variable called GEOS_LIBRARY_PATH and set equal to: "C:\OSGeo4W\bin\geos_c.dll"
```
# If installed
gem uninstall rgeo & gem uninstall ffi-geos

# ffi-geos has to be installed before rgeo
gem install ffi-geos

gem install rgeo
```

To test:

```
C:\Ruby193\bin>irb
irb(main):001:0> require 'rgeo'
=> true
irb(main):002:0> RGeo::Geos.supported?
=> true
irb(main):003:0> exit
```
Both statements should return "true"

## Other options
### FME 
* FME is very good for comparisons (Change Detector transformer)
* It is well suited to real world data testing (bulk load, bulk comparison)

### Spatialite
Could load data into Spatialite tables, then use queries to compare



		