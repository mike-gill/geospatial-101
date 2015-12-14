There are 3 files for testing the implementation of the OSTN02 Transformation and OSGM02 Geoid model.  These files should be used in conjunction with the document - Transformations and the OSGM02 User Guide.

Each file is comma delimited and the first row is a header containing field descriptions.

OSTN02_OSGM02Tests_In.txt;
Contains the ETRS89 Earth centred cartesian coordinates (XYZ) of 44 points around GB.  There is at least one point in each GB geoid patch.
There are 4 special points.
Outside#1 and Outside#2 have coordinates that put them right on the edge of, but just outside, the boundary polygon (i.e. 3 nodes of the relevant transformation grid square have values and the 4th is zero).  #1 is off the west coast of Anglesey and #2 is off the mouth of the Firth of Forth.  These points should return the outside polygon error.
The points Ork_Main(Ork) and Ork_Main(Main) test the boundary between the Mainland and Orkney geoid patches.  For these two points the transformation grid squares that they fall in have unequal and non zero flag values at their corners, i.e. 3 nodes could be flag 7 (Orkney) and the other one flag 1 (Mainland).  The transformation software should assign the most appropriate flag which can be assumed to be the flag from the node nearest the point.  Based on this assumption, Ork_Main(Ork) should return  flag 7 and Ork_Main(Main) should return flag 1.

OSTN02_OSGM02Tests_Out.txt;
Contains all the various coordinates for each point from each stage of the transformation.

OSTN02_OSGM02Tests_InternalData.txt;
Contains the internal values calculated for each point as part of the transformation process.