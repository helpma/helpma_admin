import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PRIMARY_COLOR, SHADOWED_STYLE, THEME} from '../../constant';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useGetPersonalInformationDetail} from '../../hooks/api/personal-information';
import {calculateAge, formatLocalDate} from '../../util';
import MapView, {Marker} from 'react-native-maps';

const PersonalInfoDetailScreen: React.FC<NativeStackScreenProps<any>> = ({
  route,
}: NativeStackScreenProps<any>) => {
  const {userId}: any = route.params;
  const {data, isLoading} = useGetPersonalInformationDetail(userId);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={
              data?.profilePict
                ? {uri: data?.profilePict}
                : require('../../images/Portrait_Placeholder.png')
            }
            style={styles.profilePict}
          />
        </View>
        <View style={styles.bioContainer}>
          <Text style={styles.infoLabel}>Nama</Text>
          <Text style={styles.bio}>{data?.fullName}</Text>

          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.bio}>{data?.email}</Text>

          <Text style={styles.infoLabel}>No. HP</Text>
          <Text style={styles.bio}>{data?.phoneNumber || '-'}</Text>

          <Text style={styles.infoLabel}>Tempat,Tanggal Lahir</Text>
          <Text style={styles.bio}>
            {data?.placeOfBirth || '-'}
            {data?.dateOfBirth && `, ${formatLocalDate(data?.dateOfBirth)}`}
          </Text>

          <Text style={styles.infoLabel}>HPHT</Text>
          <Text style={styles.bio}>
            {data?.hpht ? formatLocalDate(data?.hpht) : '-'}
          </Text>

          <Text style={styles.infoLabel}>Taksiran Tanggal Persalinan</Text>
          <Text style={styles.bio}>
            {data?.estimatedLaborDate
              ? formatLocalDate(data?.estimatedLaborDate)
              : '-'}
          </Text>
        </View>
        <View style={styles.bioContainer}>
          <Text style={styles.infoLabel}>Alamat</Text>
          <Text style={styles.bio}>{data?.address || '-'}</Text>
          {data?.addressLatitude && data?.addressLongitude && (
            <MapView
              style={{width: '100%', height: 250}}
              region={{
                latitude: data?.addressLatitude,
                longitude: data?.addressLongitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}
              zoomEnabled={true}
              zoomTapEnabled={true}
              zoomControlEnabled={true}>
              <Marker
                coordinate={{
                  latitude: data?.addressLatitude,
                  longitude: data?.addressLongitude,
                }}
                title={'Alamat Pasien'}
              />
            </MapView>
          )}
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Berat Badan</Text>
            <Text style={styles.infoValue}>
              {data?.weight ? `${data?.weight} kg` : '-'}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Tinggi Badan</Text>
            <Text style={styles.infoValue}>
              {data?.height ? `${data?.height} cm` : '-'}
            </Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Golongan Darah</Text>
            <Text style={styles.infoValue}>{data?.bloodType || '-'}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Umur</Text>
            <Text style={styles.infoValue}>
              {data?.dateOfBirth
                ? `${calculateAge(data?.dateOfBirth)} thn`
                : '-'}
            </Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Varitas</Text>
            <Text style={styles.infoValue}>{data?.varitas || '-'}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Jumlah Anak</Text>
            <Text style={styles.infoValue}>{data?.childAmount || '-'}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const profileDataContainer = {
  backgroundColor: 'white',
  paddingHorizontal: 16,
  paddingVertical: 8,
  marginHorizontal: 8,
  borderRadius: 8,
  ...SHADOWED_STYLE,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePict: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 12,
  },
  bioContainer: {
    ...profileDataContainer,
    marginBottom: 12,
  },
  infoContainer: {
    ...profileDataContainer,
    flex: 1,
  },
  infoLabel: {
    ...THEME.title,
    color: PRIMARY_COLOR,
    fontSize: 12,
  },
  infoValue: {
    ...THEME.body,
    fontSize: 28,
  },
  bio: {
    ...THEME.body,
    fontSize: 14,
  },
});
export default PersonalInfoDetailScreen;
