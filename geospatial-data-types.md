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

### World files
Non-GIS formats need a 'world file' to provide a geographic context for the image.  Here is an example world file:

```
100.000000000000000
0.000000000000000
0.000000000000000
-100.000000000000000
50.000000000000000
1299950.000000000000000
```


