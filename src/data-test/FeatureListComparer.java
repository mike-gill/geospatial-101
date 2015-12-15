/**
 * 
 */
package uk.co.ordnancesurvey.genie.test.datatools.comparison;

import java.util.ArrayList;
import java.util.List;

import org.opengis.feature.Feature;
import org.opengis.feature.simple.SimpleFeature;

/**
 * Compares two lists of features and finds the differences.
 * @author mgill
 *
 */
public class FeatureListComparer {
	
	private List<SimpleFeature> added = new ArrayList<SimpleFeature>();
	private List<SimpleFeature> removed = new ArrayList<SimpleFeature>();
	
	/**
	 * Compares two lists of features and calculates the differences.
	 * 
	 * @param actual
	 *            list of features to be tested.
	 * @param expected
	 *            list of features expected to be in the 'actual' list.
	 * @return the number of different features.
	 */
	public long findDifferences(List<SimpleFeature> actual,
			List<SimpleFeature> expected) {
		added = difference(expected, actual);
		removed = difference(actual, expected);
		return added.size() + removed.size();
	}
	
	/**
	 * Returns (list1 - list2). If list1 has a duplicate object and the same
	 * object is in list2, only one of the duplicate objects will be removed
	 * from list1. Note - cannot use the Collection method removeAll() as this
	 * does not respect duplicates.
	 * 
	 * @param list1
	 *            the list of features from which list2 will be subtracted.
	 * @param list2
	 *            the list of features that will be subtracted from list1
	 * @return a list of the differences
	 */
	public List<SimpleFeature> difference(List<SimpleFeature> list1,
			List<SimpleFeature> list2) {
		List<SimpleFeature> list1Copy = new ArrayList<SimpleFeature>(list1);

		for (Feature s : list2) {
			list1Copy.remove(s);
		}

		return list1Copy;
	}

	public List<SimpleFeature> getAdded() {
		return added;
	}

	public List<SimpleFeature> getRemoved() {
		return removed;
	}
}
