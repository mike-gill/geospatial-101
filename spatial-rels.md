# Spatial relationships quiz

A quick quiz to gauge the understanding of spatial relationships.  The relationships can be tested using the Java Topology Suite Test Builder tool.  JTS can be downloaded from [http://sourceforge.net/projects/jts-topo-suite/](http://sourceforge.net/projects/jts-topo-suite/).  Extract the zip, then run bin\testbuilder.bat.

The section after the quiz explains how to understand the relationships using the DE-9IM model.

## Two adjacent polygons
```
A:  POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))  
B:  POLYGON ((10 0, 20 0, 20 10, 10 10, 10 0))
```
Disjoint?  
Intersects?  
Touches?  
Crosses?  
Overlaps?  
B Within A?  
A Covers B?  

## Two overlapping polygons
```
A:  POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))  
B:  POLYGON ((8 0, 18 0, 18 10, 8 10, 8 0))
```
Disjoint?  
Intersects?  
Touches?  
Crosses?  
Overlaps?  
B Within A?  
A Covers B?  

## Polygon inside another polygon, edges overlap
```
A:  POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))  
B:  POLYGON ((2 2, 10 2, 10 8, 2 8, 2 2))
```
Disjoint?  
Intersects?  
Touches?  
Crosses?  
Overlaps?  
B Within A?  
A Covers B?  

## Line meets edge of polygon
```
A:  POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))  
B:  LINESTRING (20 10, 10 5)
```
Disjoint?  
Intersects?  
Touches?  
Crosses?  
Overlaps?  
B Within A?  
A Covers B?  

## Line on boundary of polygon
```
A:  POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))  
B:  LINESTRING (10 2, 10 8)
```
Disjoint?  
Intersects?  
Touches?  
Crosses?  
Overlaps?  
B Within A?  
A Covers B?  

## Line cuts through polygon
```
A:  POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))  
B:  LINESTRING (5 5, 15 5)
```
Disjoint?  
Intersects?  
Touches?  
Crosses?  
Overlaps?  
B Within A?  
A Covers B?  

# Answers
## Two adjacent polygons
```
A:  POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))  
B:  POLYGON ((10 0, 20 0, 20 10, 10 10, 10 0))
```
Disjoint?	**F**  
Intersects?	**T**  
Touches?	**T**  
Crosses?	**F**  
Overlaps?	**F**  
B Within A?	**F**  
A Covers B?	**F**  

## Two overlapping polygons
```
A:  POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))  
B:  POLYGON ((8 0, 18 0, 18 10, 8 10, 8 0))
```
Disjoint?	**F**  
Intersects? **T**  
Touches?    **F**  
Crosses?    **F**  
Overlaps?   **T**  
B Within A?	**F**  
A Covers B?	**F**  

## Polygon inside another polygon, edges overlap
```
A:  POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))  
B:  POLYGON ((2 2, 10 2, 10 8, 2 8, 2 2))
```
Disjoint?	**F**  
Intersects? **T**  
Touches?    **F**  
Crosses?    **F**  
Overlaps?   **F**  
B Within A?	**T**  
A Covers B? **T**  


## Line meets edge of polygon
```
A:  POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))  
B:  LINESTRING (20 10, 10 5)
```
Disjoint?	**F**  
Intersects? **T**  
Touches?    **T**  
Crosses?    **F**  
Overlaps?   **F**  
B Within A?	**F**  
A Covers B?	**F**  

## Line on boundary of polygon
```
A:  POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))  
B:  LINESTRING (10 2, 10 8)
```
Disjoint?	**F**  
Intersects? **T**  
Touches?    **T**  
Crosses?    **F**  
Overlaps?   **F**  
B Within A? **F**  
A Covers B? **T**  

## Line cuts through polygon
```
A:  POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))  
B:  LINESTRING (5 5, 15 5)
```
Disjoint?	**F**  
Intersects? **T**  
Touches?    **F**  
Crosses?    **T**  
Overlaps?   **F**  
B Within A? **F**  
A Covers B? **F**  

# DE-9IM
* See [Wikipedia article on DE-9IM](https://en.wikipedia.org/wiki/DE-9IM).
* Most geospatial software allows you to specify your own matrix.  For example, outputting polygons for a tiled product:

|               | Interior | Boundary | Exterior |
| ------------- |:--------:|:--------:| --------:|
| Interior      | T        | *        | *        |
| Boundary      | *        | *        | *        |
| Exterior      | *        | *        | *        |

or:  T********

* Beware - some software has its own interpretation of the spatial predicates
	* eg [Oracle spatial predicates](http://docs.oracle.com/cd/B19306_01/appdev.102/b14255/sdo_intro.htm#i880253) - own implementation of COVERS:
		* "COVERS -- The interior of one object is completely contained in the interior or the boundary of the other object **and their boundaries intersect**."
		* This also impacts the opposite COVEREDBY
		* 1Spatial also use this interpretation.



