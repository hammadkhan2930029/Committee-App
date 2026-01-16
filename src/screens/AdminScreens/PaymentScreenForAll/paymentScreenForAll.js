import React, { useState } from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { AppIcons } from '../../../constant/appIcons';
import { date } from 'yup';
import { useNavigation } from '@react-navigation/native';

const summaryData = [
  {
    id: 1,
    title: 'Total Collected',
    value: 'PKR 150,000',
    subtitle: 'All payments included',
    type: 'collected',
  },
  {
    id: 2,
    title: 'Pending Amount',
    value: 'PKR 25,000',
    subtitle: 'Awaiting payments',
    type: 'pending',
  },
  {
    id: 3,
    title: 'Paid',
    value: '35 Payments',
    subtitle: 'Successfully received',
    type: 'paid',
  },
];

const demoData = [
  {
    id: 1,
    name: 'Bilal Ahmed',
    phone: '+92 301 5566778',
    fund: 'Family Fund BC',
    amount: '5,000 PKR',
    date: 'Jan 2025',
    status: 'Paid',
  },
  {
    id: 2,
    name: 'Ali Khan',
    phone: '+92 312 9876543',
    fund: 'ABC Group BC',
    amount: '4,000 PKR',
    date: 'Feb 2025',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Usman Raza',
    phone: '+92 333 4455667',
    fund: 'Office BC',
    amount: '6,500 PKR',
    date: 'Mar 2025',
    status: 'Paid',
  },
  {
    id: 4,
    name: 'Ahmed Hassan',
    phone: '+92 300 1122334',
    fund: 'Friends BC',
    amount: '3,000 PKR',
    date: 'Apr 2025',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Hamza Ali',
    phone: '+92 321 7788990',
    fund: 'Monthly BC',
    amount: '7,000 PKR',
    date: 'May 2025',
    status: 'Paid',
  },
  {
    id: 6,
    name: 'Saad Khan',
    phone: '+92 345 6677889',
    fund: 'Home BC',
    amount: '2,500 PKR',
    date: 'Jun 2025',
    status: 'Pending',
  },
  {
    id: 7,
    name: 'Fahad Malik',
    phone: '+92 334 5566778',
    fund: 'Business BC',
    amount: '8,000 PKR',
    date: 'Jul 2025',
    status: 'Overdue',
  },
  {
    id: 8,
    name: 'Zeeshan Ahmed',
    phone: '+92 310 9988776',
    fund: 'Community BC',
    amount: '4,500 PKR',
    date: 'Aug 2025',
    status: 'Pending',
  },
  {
    id: 9,
    name: 'Awais Rafiq',
    phone: '+92 322 3344556',
    fund: 'Event BC',
    amount: '6,000 PKR',
    date: 'Sep 2025',
    status: 'Overdue',
  },
  {
    id: 10,
    name: 'Imran Shah',
    phone: '+92 311 2233445',
    fund: 'Savings BC',
    amount: '5,500 PKR',
    date: 'Oct 2025',
    status: 'Pending',
  },
];

export const Payments = () => {
  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState('All');
  console.log('status check :', selectedStatus);

  const filterData =
    selectedStatus === 'All'
      ? demoData
      : demoData.filter(item => item.status === selectedStatus);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />

      <ScrollView style={styles.scrollView}>
        <View>
          <ImageBackground
            source={AppImages.Rectangle2}
            style={styles.RectangleImg}
          >
            <View style={styles.main}>
              <View style={styles.TopView}>
                <View style={styles.backAndText}>
                  <TouchableOpacity>
                    <Image
                      source={AppIcons.arrowBack}
                      style={styles.arrowBack}
                    />
                  </TouchableOpacity>
                  <Text style={styles.h1}>Payments</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AdminProfile')}
                >
                  <Image
                    source={AppImages.profileAvatar}
                    style={styles.avatar}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>Monitor all committee payments </Text>
                <Text style={styles.h4}>and pending amounts.</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.horizontalCards}>
          <FlatList
            data={summaryData}
            horizontal
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            renderItem={({ item }) => (
              <View style={styles.summaryCard}>
                <View style={styles.cardHeader}>
                  <Image
                    source={
                      item.type === 'collected'
                        ? AppIcons.dollarbagPrimary
                        : item.type === 'pending'
                        ? AppIcons.sandWatchPrimary
                        : AppIcons.checkMarkPrimary
                    }
                    style={styles.cardIcon}
                  />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
                <Text style={styles.cardValue}>{item.value}</Text>

                {/* Subtitle */}
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
            )}
          />
        </View>
        <View>
          <FlatList
            data={['All', 'Paid', 'Pending', 'Overdue']}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              const isSelected = selectedStatus === item;
              return (
                <TouchableOpacity
                  style={[
                    styles.statusList,
                    isSelected && styles.activeStatusList,
                  ]}
                  onPress={() => setSelectedStatus(item)}
                >
                  <View style={styles.statusView}>
                    <Text
                      style={[
                        styles.status,
                        isSelected && styles.activeStatusText,
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View>
          <FlatList
            data={filterData}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cards}
                onPress={() =>
                  navigation.navigate('PaymentDetails', { item: item })
                }
              >
                <View style={styles.left}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.fund}>{item.fund}</Text>

                  <View style={styles.amountView}>
                    <Text style={styles.amount}>Amount :</Text>
                    <Text style={styles.amount2}>{item.amount}</Text>
                  </View>
                </View>
                <View style={styles.right}>
                  <View
                    style={[
                      item.status === 'Paid'
                        ? styles.paid
                        : item.status === 'Pending'
                        ? styles.pending
                        : item.status === 'Overdue'
                        ? styles.overDue
                        : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.CardStatus,
                        {
                          color:
                            item.status === 'Overdue'
                              ? AppColors.bodyText
                              : AppColors.title,
                        },
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.date}>{''}</Text>
                  </View>
                  <View style={styles.dateView}>
                    <Text style={styles.date}>Date :</Text>

                    <Text style={styles.date2}>{item.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scrollView: {
    marginBottom: 65,
  },
  arrowBack: {
    width: 28,
    height: 28,
  },
  RectangleImg: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  TopView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    alignSelf: 'center',
    width: '100%',
    padding: 15,
    marginTop: 20,
  },
  backAndText: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
  },
  h1: {
    fontSize: moderateScale(24),
    color: AppColors.title,
    fontWeight: '600',
    paddingLeft: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    elevation: 5,
  },
  textView: {
    padding: 10,
  },

  h4: {
    color: AppColors.title,
    fontSize: moderateScale(16),
    opacity: 0.9,
    padding: 3,
  },
  //---------------------------------
  // horizontalCards: {
  //   marginTop: -40,
  // },
  summaryCard: {
    width: 200,
    height: 130,
    backgroundColor: AppColors.background,
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeader: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 28,
    resizeMode: 'contain',
  },
  cardTitle: {
    color: AppColors.blackText,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  cardValue: {
    color: AppColors.link,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  cardSubtitle: {
    color: AppColors.bodyText,
    fontSize: moderateScale(14),
  },
  //----------------------------------
  statusList: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    margin: 10,
  },

  activeStatusList: {
    backgroundColor: AppColors.primary,
  },

  status: {
    color: AppColors.blackText,
    fontSize: moderateScale(18),
    fontWeight: '500',
  },

  activeStatusText: {
    color: '#fff',
  },
  //--------------------------------------

  cards: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: AppColors.background,
    margin: 10,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  name: {
    fontSize: moderateScale(16),
    color: AppColors.bodyText,
    padding: 5,
  },

  fund: {
    fontSize: moderateScale(16),
    color: AppColors.bodyText,
    padding: 5,
  },
  amount: {
    fontSize: moderateScale(16),
    color: AppColors.bodyText,
    padding: 5,
  },
  amount2: {
    fontSize: moderateScale(16),
    color: AppColors.link,
    padding: 5,
  },
  amountView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  right: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  paid: {
    backgroundColor: 'green',

    borderRadius: 25,
    width: 100,
    elevation: 3,
  },
  pending: {
    backgroundColor: 'orange',
    borderRadius: 25,
    width: 100,
    elevation: 3,
  },
  overDue: {
    backgroundColor: AppColors.cardLight,
    borderRadius: 25,
    width: 100,
    elevation: 3,
  },
  CardStatus: {
    fontSize: moderateScale(16),
    padding: 5,
    textAlign: 'center',
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: moderateScale(16),
    color: AppColors.bodyText,
    padding: 5,
  },
  date2: {
    fontSize: moderateScale(16),
    color: AppColors.link,
    padding: 5,
  },
});
