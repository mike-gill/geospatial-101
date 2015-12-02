# Geospatial data types

## Raster v Vector
### Raster data
* cell based
* appropriate at a specific resolution

### Vector data
* points, lines, areas defined by XY(Z) coordinates
* less resolution dependent

See [the Wikipedia article of GIS formats](https://en.wikipedia.org/wiki/GIS_file_formats) for a comparison of raster and vector.

## Raster
### Raster data types
Cell values can represent:
* Colour
  * RGB
  ![](./images/raster-data-type-pixels.jpg)
  * Paletted (eg 8 bit GIF, PNG)
*Continuous values
*Discrete thematic values

### Raster formats
Normal image formats, eg:
  * Tiff
  * Jpeg
  * Jpeg2000
  * PNG
  * GIF  etc
  
GIS formats, eg:
  * GeoTIFF
  * ESRI ASCII grid
  * GMLJP2
  * ERDAS ECW
  * LizardTech MrSID

###Georeferencing Rasters
Any 'GIS' raster formats have georeferencing information in-built into the header of the file (eg GeoTIFF).

```
set GDAL_DATA=C:\Program Files\QGIS Wien\share\gdal
set PATH="C:\Program Files\QGIS Wien\bin";%PATH%

gdalinfo "vmdras\SU00.tif"
```
```
Driver: GTiff/GeoTIFF
Files: vmdras\SU00.tif
Size is 4000, 4000
Coordinate System is:
LOCAL_CS["OSGB 1936 / British National Grid",
    GEOGCS["OSGB 1936",
        DATUM["unknown",
            SPHEROID["unretrievable - using WGS84",6378137,298.257223563],
            TOWGS84[446.448,-125.157,542.06,0.15,0.247,0.842,-20.489]],
        PRIMEM["Greenwich",0],
        UNIT["degree",0.0174532925199433]],
    AUTHORITY["EPSG","27700"],
    UNIT["metre",1]]
Origin = (400000.000000000000000,110000.000000000000000)
Pixel Size = (2.500000000000000,-2.500000000000000)
Metadata:
  AREA_OR_POINT=Area
  TIFFTAG_COPYRIGHT=Ordnance Survey. © Crown copyright and database right 2014
  TIFFTAG_IMAGEDESCRIPTION=OS VectorMap® District - Full colour raster - TILE SU00
  TIFFTAG_RESOLUTIONUNIT=2 (pixels/inch)
  TIFFTAG_XRESOLUTION=254
  TIFFTAG_YRESOLUTION=254
Image Structure Metadata:
  COMPRESSION=LZW
  INTERLEAVE=BAND
Corner Coordinates:
Upper Left  (  400000.000,  110000.000)
Lower Left  (  400000.000,  100000.000)
Upper Right (  410000.000,  110000.000)
Lower Right (  410000.000,  100000.000)
Center      (  405000.000,  105000.000)
Band 1 Block=4000x32 Type=Byte, ColorInterp=Palette
  Color Table (RGB with 256 entries)
    0: 101,98,98,255
    1: 113,113,113,255
    2: 115,113,113,255
    3: 126,124,124,255
```


#### World files
Non-GIS formats need a 'world file' to provide a geographic context for the image.  Here is an example world file:

```
100.000000000000000
0.000000000000000
0.000000000000000
-100.000000000000000
50.000000000000000
1299950.000000000000000
```
See [the Wikipedia article](https://en.wikipedia.org/wiki/World_file) for a detailed explanation, or [ESRI's briefer explanation](http://desktop.arcgis.com/en/desktop/latest/manage-data/raster-and-images/world-files-for-raster-datasets.htm).

