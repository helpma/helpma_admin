import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SHADOWED_STYLE, THEME} from '../../constant';
import {useGetPreviousPregnancyCheckResult} from '../../hooks/api';
import {calculateImt, categorizeImtAndGetRecommendedWeight} from './util';

interface ImtInformationProps {
  weight?: number;
  height?: number;
  currWeight?: number;
  pregnancyCheckId: string;
}

const ImtInformation: React.FC<ImtInformationProps> = ({
  weight,
  height,
  pregnancyCheckId,
  currWeight,
}) => {
  const {data} = useGetPreviousPregnancyCheckResult(
    React.useMemo(() => pregnancyCheckId, [pregnancyCheckId]),
  );
  const imt = React.useMemo(
    () => calculateImt(weight, height),
    [weight, height],
  );

  const prevImt = React.useMemo(() => {
    if (!!data) {
      return calculateImt(data.weight, data.height);
    }

    return 0;
  }, [data]);

  const imtCategoryResult = React.useMemo(
    () => categorizeImtAndGetRecommendedWeight(imt),
    [imt],
  );

  const prevImtCategoryResult = React.useMemo(
    () => categorizeImtAndGetRecommendedWeight(prevImt),
    [prevImt],
  );

  const prevImtCategoryResultStatus = React.useMemo(() => {
    if (!currWeight || !prevImtCategoryResult.category) {
      return null;
    }

    const weightChange = currWeight - (data?.weight || 0);
    const changeInfo = `${weightChange} kg (${prevImtCategoryResult.recommendedWeight[0]} - ${prevImtCategoryResult.recommendedWeight[1]})`;

    if (
      weightChange < prevImtCategoryResult.recommendedWeight[0] ||
      weightChange > prevImtCategoryResult.recommendedWeight[1]
    ) {
      return `Diluar range yang dianjurkan sebelumnya: ${changeInfo}`;
    } else {
      return `Sesuai anjuran: ${changeInfo}`;
    }
  }, [prevImtCategoryResult, currWeight, data]);

  if (!weight || !height) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.infoLabel}>IMT</Text>
        <Text style={styles.value}>{imt.toFixed(2)}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.infoLabel}>Kategori IMT</Text>
        <Text style={styles.value}>{imtCategoryResult.category}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.infoLabel}>
          Anjuran Perubahan Berat Badan Selanjutnya
        </Text>
        <Text style={styles.value}>
          {imtCategoryResult.recommendedWeight[0]} -{' '}
          {imtCategoryResult.recommendedWeight[1]} kg
        </Text>
      </View>
      {!!data && (
        <View style={styles.rowContainer}>
          <Text style={styles.infoLabel}>
            Perubahan Berat Badan dari Sebelumnya
          </Text>
          <Text style={styles.value}>{prevImtCategoryResultStatus}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: 6,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
    ...SHADOWED_STYLE,
  },
  infoLabel: {
    ...THEME.title,
    fontSize: 11,
    maxWidth: 150,
  },
  value: {
    ...THEME.body,
    fontSize: 11,
    maxWidth: 160,
  },
});

export default ImtInformation;
