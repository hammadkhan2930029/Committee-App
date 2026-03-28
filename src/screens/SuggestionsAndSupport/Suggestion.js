import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../../constant/appImages';
import { AppColors } from '../../constant/appColors';
import { useNavigation } from '@react-navigation/native';

export const SuggestionScreen = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const handleSubmit = () => {
    if (!subject || !message) {
      alert('Please fill all fields');
      return;
    }

    alert('Suggestion submitted ✅');
    setSubject('');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <ScrollView>
        {/* TOP ORANGE HEADER */}
        <ImageBackground
          source={AppImages.Rectangle}
          style={styles.header}
          resizeMode="cover"
        >
          <View style={styles.headerContent}>
            <View style={styles.headingAndArrow}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Icon name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.heading}>Send Suggestion 💡</Text>
            </View>
            <View>
              <Text style={styles.subHeading}>Share your ideas with us</Text>
            </View>
          </View>
        </ImageBackground>

        {/* FORM CARD */}
        <View contentContainerStyle={styles.formContainer}>
          <View style={styles.card}>
            {/* Subject */}
            <View style={styles.inputBox}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                value={subject}
                onChangeText={setSubject}
                placeholder="Enter subject"
                style={styles.input}
                placeholderTextColor="#999"
              />
            </View>

            {/* Message */}
            <View style={styles.inputBox}>
              <Text style={styles.label}>Message</Text>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Write your suggestion..."
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={5}
                placeholderTextColor="#999"
              />
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit Suggestion</Text>
            </TouchableOpacity>
          </View>
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

  header: {
    height: '200@vs',
    // justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  headerContent: {
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'flex-start',
    gap: 10,
    paddingTop: 20
  },
  headingAndArrow: {
    flexDirection: 'row',
    alignItems: 'center'

  },

  backBtn: {
    marginRight: 10,
    padding: 5,
  },

  heading: {
    color: '#fff',
    fontSize: '22@ms',
    fontWeight: '600',
  },

  subHeading: {
    color: '#fff',
    fontSize: '14@ms',
    marginTop: 5,
    marginLeft: 30,
    opacity: 0.9,
  },

  formContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
   
  },

  card: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    alignSelf:'center'
  },

  inputBox: {
    marginBottom: 15,
  },

  label: {
    marginBottom: 6,
    color: '#555',
    fontSize: '13@ms',
  },

  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: AppColors.primary,
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '15@ms',
  },
});