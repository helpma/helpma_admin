import * as React from 'react';
import PersonalInformationCard from './components/personal-information-card';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {navigate} from '../../../hooks/navigation';
import {useGetPersonalInformationList} from '../../../hooks/api/personal-information';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {LoadMoreButton} from '../../../components';
import {DEFAULT_PAGE_SIZE} from '../../../constant';
import {UserPersonalInformation} from '../../../types';
import {useDebounce} from '../../../hooks/debounce';
import useOnFocusNavigation from '../../../hooks/navigation/focus';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const PersonalInfoScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<UserPersonalInformation[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const query = useDebounce<string>(
    searchQuery,
    800,
    useCallback(() => {
      if (searchQuery) {
        setPage(0);
      }
    }, [searchQuery]),
  );

  const {data: apiData, reFetch, isLoading} = useGetPersonalInformationList(
    useMemo(
      () => ({
        pageSize: DEFAULT_PAGE_SIZE,
        page,
        query,
      }),
      [page, query],
    ),
  );

  const [totalData, setTotalData] = useState<number>(0);

  useEffect(() => {
    if (!!apiData && !!apiData.list?.length) {
      setData(prevState => {
        if (page == 0) {
          return apiData.list;
        } else {
          if (prevState[0].id !== apiData.list[0].id) {
            return [...prevState, ...apiData.list];
          } else {
            return prevState;
          }
        }
      });
    }
  }, [apiData, page]);

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

  useOnFocusNavigation(navigation, reFetch);

  useEffect(() => {
      reFetch()
  }, [query])
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cari Pasien..."
        style={styles.input}
        onChangeText={setSearchQuery}
      />

      {isLoading ? <ActivityIndicator /> : <><FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigate('PersonalInfoDetailScreen', {
                userId: item.id,
              });
            }}>
            <PersonalInformationCard data={item} />
          </TouchableOpacity>
        )} />

      {isLoadMore && <LoadMoreButton onPress={onNextPage} />}</>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 48
  },
  // TODO: move this as common component
  input: {
    backgroundColor: 'white',
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
});

export default PersonalInfoScreen;
