# Geospatial Web Services
Main types:

## Web Map Service (WMS)
* Image dynamically generated on each request
* Good description in [Geoserver WMS doc](http://docs.geoserver.org/stable/en/user/services/wms/reference.html
* Easy to add to QGIS map, eg:

[British Geological Survey WMS Services](http://www.bgs.ac.uk/data/services/digmap50wms.html)
1:50k Geology:  https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer?

Example GetMap request: https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer?REQUEST=GetMap&VERSION=1.3.0&LAYERS=BGS.50k.Bedrock&STYLES=default&FORMAT=image/gif&CRS=EPSG:27700&BBOX=400000,400000,405200,405200&WIDTH=450&HEIGHT=450

Example GetFeatureInfo request: https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer?version=1.3.0&request=GetFeatureInfo&format=image/png&layers=BGS.50k.Bedrock&query_layers=BGS.50k.Bedrock&info_format=text/html&i=200&j=400&radius=0&crs=EPSG:27700&BBOX=400000,400000,405200,405200&WIDTH=450&HEIGHT=450&styles=default

## Web Map Tile Service (WMTS)
* Serves cached tiles
* Much more performant than WMS
* Client cannot control rendering
* [Wikipedia article](https://en.wikipedia.org/wiki/Web_Map_Tile_Service)

## Web Feature Service (WFS)
* Serves geometries and associated attributes as features.
* Allows querying using spatial relationships
* See [Geoserver docs](http://docs.geoserver.org/latest/en/user/services/wfs/) for a good description
* WFS-T is an extension to allow transactional inserts and updates.
	* see [hack day project for offline editing](https://github.com/mike-gill/openlayers-offline) as an example of this.



