require 'rgeo'
require 'ffi-geos'

class TestWktParse
  def convert()
    puts "Geos supported:  #{RGeo::Geos.supported?}"
    parser = RGeo::WKRep::WKTParser.new(nil, :support_ewkt => true)
    point = parser.parse('SRID=4326;Point(-122.1 47.3)')
    puts point
    puts "Intersects?  #{point.intersects?(point)}"
  end
end

class GeomUtils
  def normalize()
    factory = RGeo::Geos.factory(:native_interface => :ffi)
    poly = factory.parse_wkt("POLYGON((0 0,1 0,1 1,0 1,0 0))")
    poly_lowlevel = poly.fg_geom
    norm_lowlevel = poly_lowlevel.normalize()
    normalized = factory.wrap_fg_geom(norm_lowlevel)
    puts normalized
  end

  def normalize_geometry(geom)
    factory = RGeo::Geos.factory(:native_interface => :ffi)
    geom_norm_lowlevel = geom.fg_geom.normalize()
    return factory.wrap_fg_geom(geom_norm_lowlevel)
  end

  def compare_geometries(geomstr1, geomstr2)
    factory = RGeo::Geos.factory(:native_interface => :ffi)
    geom1 = factory.parse_wkt(geomstr1)
    geom2 = factory.parse_wkt(geomstr2)
    geom1_norm = normalize_geometry(geom1)
    puts geom1_norm
    geom2_norm = normalize_geometry(geom2)
    puts geom2_norm
    return geom1_norm == geom2_norm
  end

  def geom_from_wkt(geomstr)
    factory = RGeo::Geos.factory(:native_interface => :ffi)
    return factory.parse_wkt(geomstr)
  end

  def normalized_geom_from_wkt(geomstr)
    geom = geom_from_wkt(geomstr)
    return normalize_geometry(geom)
  end
end

class GeometryListComparer
  attr_reader :added
  attr_reader :removed
  def initialize()
    @added = []
    @removed = []
  end

  def find_differences(actual, expected)
    @added = expected - actual
    @removed = actual - expected
    return @added.length + @removed.length
  end
end

#t = TestWktParse.new
#t.convert()
#t2 = TestNormalize.new
#t2.normalize()

geom_utils = GeomUtils.new
geomstr1 = "POLYGON((0.0 0.0, 1.0 0.0, 1.0 1.0, 0.0 1.0, 0.0 0.0))"
geomstr2 = "POLYGON((0.0 0.0, 0.0 1.0, 1.0 1.0, 1.0 0.0, 0.0 0.0))"
geomstr3 = "POLYGON((0.0 0.0, 0.0 2.0, 1.0 1.0, 1.0 0.0, 0.0 0.0))"
geomstr4 = "POLYGON((0.0 0.0, 0.0 1.0, 1.0 1.0, 2.0 0.0, 0.0 0.0))"
puts "Equal?  #{geom_utils.compare_geometries(geomstr1, geomstr2)}"

geomlist1 = [geom_utils.normalized_geom_from_wkt(geomstr1), geom_utils.normalized_geom_from_wkt(geomstr2), geom_utils.normalized_geom_from_wkt(geomstr1), geom_utils.normalized_geom_from_wkt(geomstr3)]
geomlist2 = [geom_utils.normalized_geom_from_wkt(geomstr2), geom_utils.normalized_geom_from_wkt(geomstr2), geom_utils.normalized_geom_from_wkt(geomstr1), geom_utils.normalized_geom_from_wkt(geomstr4)]
glc = GeometryListComparer.new
puts "Diffs:  #{glc.find_differences(geomlist1, geomlist2)}"
puts "Added: #{glc.added}"
puts "Removed: #{glc.removed}"