import * as React from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {navigate} from '../../../hooks/navigation';
import PregnancyCheckCard from './components/pregnancy-check-card';
import {useGetPregnancyCheckList} from '../../../hooks/api/pregnancy-check';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {UserPregnancyCheckSummary} from '../../../types';
import {useDebounce} from '../../../hooks/debounce';
import {DEFAULT_PAGE_SIZE} from '../../../constant';
import {LoadMoreButton} from '../../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useOnFocusNavigation from '../../../hooks/navigation/focus';

const PregnancyCheckScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<UserPregnancyCheckSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const query = useDebounce<string>(
    searchQuery,
    800,
    useCallback(() => {
      if (searchQuery) {
        setPage(0);
        setData([]);
      }
    }, [searchQuery]),
  );

  const {data: apiData, reFetch} = useGetPregnancyCheckList(
    useMemo(
      () => ({
        pageSize: DEFAULT_PAGE_SIZE,
        page,
        query,
      }),
      [page, query],
    ),
  );

  useOnFocusNavigation(navigation, reFetch);

  const [totalData, setTotalData] = useState<number>(0);

  useEffect(() => {
    if (!!apiData && !!apiData.list?.length) {
      setData(prevState => {
        if (!prevState.length) {
          return apiData.list;
        } else {
          console.log(prevState[0].user.id, apiData.list[0].user.id);
          if (prevState[0].user.id !== apiData.list[0].user.id) {
            return [...prevState, ...apiData.list];
          } else {
            return prevState;
          }
        }
      });
    }
  }, [apiData]);

  useEffect(() => {
    if (!!apiData && apiData?.total > 0) {
      setTotalData(apiData.total);
    }
  }, [apiData]);

  const isLoadMore = useMemo<boolean>(() => {
    return data.length > 0 && data.length < totalData;
  }, [data, totalData]);

  const onNextPage = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  // TODO: refetch on back to this page

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cari Pasien..."
        style={styles.input}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigate('PregnancyCheckDetailScreen', {
                userId: item.user.id,
              });
            }}>
            <PregnancyCheckCard data={item} />
          </TouchableOpacity>
        )}
      />

      {isLoadMore && <LoadMoreButton onPress={onNextPage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    paddingBottom: 100,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
});

export default PregnancyCheckScreen;
