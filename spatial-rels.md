# Spatial relationships quiz

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
