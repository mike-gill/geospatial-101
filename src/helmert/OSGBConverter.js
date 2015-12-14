
function ProjUtil() {
}
ProjUtil.deg2rad = function(deg) {
    return (deg * Math.PI) / 180.0;
}
ProjUtil.rad2deg = function(rad) {
    return rad * (180.0 / Math.PI);
}
ProjUtil.dms2dd = function(d, m, s) {
    return d + (m / 60.0) + (s / 3600.0);
}
ProjUtil.dd2dms = function(dd) {
    var deg = parseInt(dd);
    var min = (dd - deg) * 60;
    var minWhole = parseInt(min);
    var sec = (min - minWhole) * 60;
    
    return [deg, minWhole, sec];
}
ProjUtil.dms2rad = function(d, m, s) {
    return Util.degToRad(dmsTodd(d, m, s));
}


//--------------
function Spheroid(a, b) {
    this.a = a;
    this.b = b;
    this.e2 = this.gete2();
    this.cartesian2llTol = 0.0000000001; // Tolerane for iterative lat calc
}

Spheroid.prototype.getn = function() { 
    return (this.a - this.b) / (this.a + this.b);
}

Spheroid.prototype.gete2 = function() { 
    return (Math.pow(this.a, 2) - Math.pow(this.b, 2)) / Math.pow(this.a, 2);
}

Spheroid.prototype.ll2cartesian = function(latDeg, lonDeg, H) {
    var lat = ProjUtil.deg2rad(latDeg);
    var lon = ProjUtil.deg2rad(lonDeg);
    var v = this.calcv(lat);
    var x = (v + H) * Math.cos(lat) * Math.cos(lon);
    var y = (v + H) * Math.cos(lat) * Math.sin(lon);
    var z = (((1 - this.e2) * v) + H) * Math.sin(lat);
    
    return [x, y, z];
}

Spheroid.prototype.cartesian2ll = function(x, y, z) { 
    var lon = Math.atan(y / (x * 1.0));
    var p = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var lat = Math.atan(z / (p * (1 - this.e2)));
    
    var v, lat1
    do {
        lat1 = lat;
        v = this.calcv(lat1);
        lat = Math.atan((z + (this.e2 * v * Math.sin(lat1))) / p);
    } while(Math.abs(lat - lat1) > this.cartesian2llTol);
    
    var H = (p / Math.cos(lat)) - v;
    return [ProjUtil.rad2deg(lat), ProjUtil.rad2deg(lon), H];
}

Spheroid.prototype.calcv = function(lat) { 
    return this.a / Math.sqrt(1 - (this.e2 * Math.pow(Math.sin(lat), 2)));
}

Spheroid.AIRY1830 = new Spheroid(6377563.396, 6356256.910);
Spheroid.AIRY1830_MOD = new Spheroid(6377563.396, 6356256.910);
Spheroid.GRS80 = new Spheroid(6378137.000, 6356752.3141);


//--------------
function HelmertTransform(tx, ty, tz, sppm, secrx, secry, secrz) {
    this.tx = tx;
    this.ty = ty;
    this.tz = tz;
    this.sppm = sppm;    // in parts per million
    this.s = sppm / 1000000.0;
    this.secrx = secrx;  // in seconds
    this.secry = secry;
    this.secrz = secrz;
    this.rx = ProjUtil.deg2rad(secrx / 3600.0);
    this.ry = ProjUtil.deg2rad(secry / 3600.0);
    this.rz = ProjUtil.deg2rad(secrz / 3600.0);
}

HelmertTransform.prototype.transform = function(x, y, z) {
    var Bx = this.tx + (((1 + this.s) * x) + (-1.0 * this.rz * y) + (this.ry * z));
    var By = this.ty + ((this.rz * x) + ((1 + this.s) * y) + (-1.0 * this.rx * z));
    var Bz = this.tz + ((-1.0 * this.ry * x) + (this.rx * y) + ((1 + this.s) * z));
    return [Bx, By, Bz];
}

HelmertTransform.WGS84ToOSGB36 = 
    new HelmertTransform(-446.448, 125.157, -542.060, 20.4894, -0.1502, -0.2470, -0.8421);
HelmertTransform.OSGB36ToWGS84 = 
    new HelmertTransform(446.448, -125.157, 542.060, -20.4894, 0.1502, 0.2470, 0.8421);

//--------------
function ProjTM(sph, Fo, No, Eo, oLatDegs, oLonDegs) {
    this.sph = sph;
    this.Fo = Fo;
    this.No = No;
    this.Eo = Eo;
    this.oLatDegs = oLatDegs;
    this.oLonDegs = oLonDegs;
    this.oLatRads = ProjUtil.deg2rad(oLatDegs);
    this.oLonRads = ProjUtil.deg2rad(oLonDegs);
}
    
ProjTM.prototype.ll2tm = function(latDeg, lonDeg) {
    var lat = ProjUtil.deg2rad(latDeg);
    var lon = ProjUtil.deg2rad(lonDeg);
    var e2 = this.sph.gete2();
    var n = this.sph.getn();

    var TT1 = 1.0 - (e2 * Math.pow(Math.sin(lat), 2.0));
    var v = this.calcv(lat);
    var p = this.calcp(lat);
    var C2n2 = this.calcC2n2(v, p);
    var M = this.calcM(lat);
    var I = M + this.No;
    
    var sinLat = Math.sin(lat);
    var cosLat = Math.cos(lat);
    var tanLat = Math.tan(lat);
    var II = (v / 2.0) * sinLat * cosLat;
    var III = (v / 24.0) * sinLat * Math.pow(cosLat, 3) *
        (5 - Math.pow(tanLat, 2) + (9.0 * C2n2));
    var IIIA = (v / 720.0) * 
        sinLat * 
        Math.pow(cosLat, 5) *
        (61.0 - (58.0 * Math.pow(tanLat, 2)) + Math.pow(tanLat, 4));
    var IV = v * cosLat;
    var V = (v / 6.0) * Math.pow(cosLat, 3) *
        ((v / p) - Math.pow(tanLat, 2));
    var VI = (v / 120.0) * Math.pow(cosLat, 5) * (
            5.0 - 
            (18.0 * Math.pow(tanLat, 2)) + 
            Math.pow(tanLat, 4) +
            (14.0 * C2n2) -
            (58.0 * Math.pow(tanLat, 2) * C2n2)
        );
    var oLon = this.oLonRads;
    var N = I + (II * Math.pow(lon - oLon, 2)) + 
        (III * Math.pow(lon - oLon, 4)) + 
        (IIIA * Math.pow(lon - oLon, 6));
    var E = this.Eo + (IV * (lon - oLon)) + 
        (V * Math.pow(lon - oLon, 3)) + 
        (VI * Math.pow(lon - oLon, 5));
              
    return [E, N];       
    
}

ProjTM.prototype.calcM = function(lat) {
    var n = this.sph.getn();
    var latdiff = lat - this.oLatRads;
    var latsum = lat + this.oLatRads;
    var n2 = Math.pow(n, 2);
    var n3 = Math.pow(n, 3);
    var CC1 = (1.0 + n + ((5.0 / 4.0) * n2) + ((5.0 / 4.0) * n3)) * latdiff;
    var CC2 = ((3.0 * n) + (3.0 * n2) + ((21.0 / 8.0) * n3)) *
              Math.sin(latdiff) * Math.cos(latsum);
    var CC3 = (((15.0 / 8.0) * n2) + ((15.0 / 8.0) * n3)) *
              Math.sin(2.0 * (latdiff)) *
              Math.cos(2.0 * (latsum));
    var CC4 = (35.0 / 24.0) * n3 * 
              Math.sin(3.0 * (latdiff)) *
              Math.cos(3.0 * (latsum));
    return this.sph.b * this.Fo * (CC1 - CC2 + CC3 - CC4);
}

ProjTM.prototype.calcv = function(lat) {
    var TT1 = 1.0 - (this.sph.gete2() * Math.pow(Math.sin(lat), 2.0));
    return this.sph.a * this.Fo * Math.pow(TT1, -0.5);
}

ProjTM.prototype.calcp = function(lat) {
    var e2 = this.sph.gete2();
    var TT1 = 1.0 - (e2 * Math.pow(Math.sin(lat), 2.0));
    return this.sph.a * this.Fo * (1.0 - e2) * Math.pow(TT1, -1.5);
}

ProjTM.prototype.calcC2n2 = function(v, p) {
    return (v / p) - 1.0;
}

ProjTM.prototype.tm2ll = function(E, N) {
    var cLat = ((N - this.No) / (this.sph.a * this.Fo)) + this.oLatRads;
    var M = this.calcM(cLat);
    
    while (Math.abs(N - this.No - M) >= 0.0001) {
        cLat = ((N - this.No - M) / (this.sph.a * this.Fo)) + cLat
        M = this.calcM(cLat);
    }
    
    var v = this.calcv(cLat);
    var p = this.calcp(cLat);
    var C2n2 = this.calcC2n2(v, p);
    var cLatTan = Math.tan(cLat);
    var cLatTan2 = Math.pow(cLatTan, 2);
    var VII = cLatTan / (2.0 * p * v);
    var VIII = (cLatTan / (24 * p * Math.pow(v, 3))) *
        (5 + (3 * cLatTan2) + C2n2 - (9 * cLatTan2 * C2n2));
    var IX = (cLatTan / (720 * p * Math.pow(v, 5))) *
        (61 + (90 * cLatTan2) + (45 * Math.pow(cLatTan, 4)));
    var cLatSec = 1.0 / Math.cos(cLat);
    var X = cLatSec / v;
    var XI = (cLatSec / (6 * Math.pow(v, 3))) * 
        ((v / p) + (2 * cLatTan2));
    var XII = (cLatSec / (120 * Math.pow(v, 5))) *
        (5 + (28 * cLatTan2) + (24 * Math.pow(cLatTan, 4)));
    var XIIA = (cLatSec / (5040 * Math.pow(v, 7))) * (
            61 + (662 * cLatTan2) + (1320 * Math.pow(cLatTan, 4)) + 
            (720 * Math.pow(cLatTan, 6))
        );
    lat = cLat - (VII * Math.pow(E - this.Eo, 2)) + 
        (VIII * Math.pow(E - this.Eo, 4)) -
        (IX * Math.pow(E - this.Eo, 6));
    lon = this.oLonRads + (X * (E - this.Eo)) -
        (XI * Math.pow(E - this.Eo, 3)) +
        (XII * Math.pow(E - this.Eo, 5)) -
        (XIIA * Math.pow(E - this.Eo, 7));
    
    return [ProjUtil.rad2deg(lat), ProjUtil.rad2deg(lon)];
}

ProjTM.BRITISH_NATIONAL_GRID = new ProjTM(
    Spheroid.AIRY1830, 
    0.9996012717,
    -100000.0,
    400000.0,
    49.0,
    -2.0);
ProjTM.IRISH_NATIONAL_GRID = new ProjTM(
    Spheroid.AIRY1830_MOD, 
    1.000035,
    250000.0,
    200000.0,
    53.5,
    -8.0);
    

//----------------------------------
/*
var degla = ProjUtil.dms2dd(52.0, 39.0, 27.2531);
var deglo = ProjUtil.dms2dd(1.0, 43.0, 4.5177);

var proj = ProjTM.BRITISH_NATIONAL_GRID;
var coords = proj.ll2tm(degla, deglo);
alert(coords);

var E = 651409.903;
var N = 313177.270;

var ll = proj.tm2ll(E, N);
alert(ProjUtil.dd2dms(ll[0]) + ", " + ProjUtil.dd2dms(ll[1]));
 */

/*
var degla = ProjUtil.dms2dd(52.0, 39.0, 27.2531);
var deglo = ProjUtil.dms2dd(1.0, 43.0, 4.5177);
H = 24.700;

alert(Spheroid.AIRY1830.ll2cartesian(degla, deglo, H));

var x = 3874938.849;
var y = 116218.624;
var z = 5047168.208;

var llh = Spheroid.AIRY1830.cartesian2ll(x, y, z);
alert(ProjUtil.dd2dms(llh[0]) + ", " + ProjUtil.dd2dms(llh[1]) + ", " + llh[2]);
 
*/
// WGS84 to OSGB36 Helmert test
var degla = 52.658007833;
var deglo = 1.716073973;
var xyz = Spheroid.GRS80.ll2cartesian(degla, deglo, 0);
var txyz = HelmertTransform.WGS84ToOSGB36.transform(xyz[0], xyz[1], xyz[2]);
var llosgb = Spheroid.AIRY1830.cartesian2ll(txyz[0], txyz[1], txyz[2]);
var en = ProjTM.BRITISH_NATIONAL_GRID.ll2tm(llosgb[0], llosgb[1]);
alert(en);

// OSGB36 to WGS84 Helmert test
var e = 651411.2213319866;
var n = 313180.5961760492;
var ll = ProjTM.BRITISH_NATIONAL_GRID.tm2ll(e, n);
var xyz = Spheroid.AIRY1830.ll2cartesian(ll[0], ll[1], 0);
var txyz = HelmertTransform.OSGB36ToWGS84.transform(xyz[0], xyz[1], xyz[2]);
var llwgs84 = Spheroid.GRS80.cartesian2ll(txyz[0], txyz[1], txyz[2]);
alert(llwgs84);

