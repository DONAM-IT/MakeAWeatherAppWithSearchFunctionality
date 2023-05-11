import {View, Image, Text, ImageBackground, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {deviceHeight, deviceWidth} from './Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_KEY} from './Constants';
import axios from 'react-native-axios';
import {useNavigation} from '@react-navigation/native';

export default function Details(props) {
  const {name} = props.route.params;
  console.log('name', name);
  const [data, setData] = useState();

  const navigation = useNavigation(); // sử dụng hook useNavigation để truy cập được hàm replace
  useEffect(() => {
    // axios
    //   //   .get(
    //   //     `https://api.openweathermap.org/data/2.5/weather?q=vietnam&appid=90b3c6abab507e9e11c3481d158d5e4e`,
    //   //   )
    //   .get(
    //     `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`,
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`,
    )
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(res => setData(res))
      .catch(error => {
        console.error(error);

        Alert.alert(
          'Error Title',
          'An error occurred while fetching weather data.',
          [
            // {
            //   text: 'Cancel',
            //   onPress: () => navigation.replace('Home'),
            //   style: 'cancel',
            // },
            {
              text: 'OK',
              onPress: () => navigation.replace('Home'), // Thay thế màn hình hiện tại bằng Home
            },
          ],
        );
      });
  }, [name, navigation]);

  const Data = ({title, value}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{color: 'gray', fontSize: 22}}>{title}</Text>
      <Text style={{color: 'white', fontSize: 22}}>{value}</Text>
    </View>
  );

  return (
    <View>
      {/* <Text style={{fontSize: 22}}>{name}</Text> */}
      <ImageBackground
        source={require('../assets/images/image1.jpg')}
        style={{height: deviceHeight, width: deviceWidth}}
        imageStyle={{opacity: 0.6, backgroundColor: 'black'}}
      />
      <View
        style={{
          position: 'absolute',
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: deviceWidth - 20,
          }}>
          <Icon name="menu" size={46} color="white" />
          <Image
            source={require('../assets/images/user.jpg')}
            style={{height: 46, width: 46, borderRadius: 50}}
          />
        </View>
        {data ? (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              height: deviceHeight - 100,
            }}>
            <View>
              <Text style={{color: 'white', fontSize: 40}}>{name}</Text>
              <Text style={{fontSize: 22, color: 'white', textAlign: 'center'}}>
                {data['weather'][0]['main']}
              </Text>
            </View>

            <Text style={{color: 'white', fontSize: 64}}>
              {(data['main']['temp'] - 273).toFixed(2)}&deg; C
            </Text>
            <View>
              <Text style={{color: 'white', fontSize: 22, marginBottom: 16}}>
                Weather Details
              </Text>
              <View style={{width: deviceWidth - 60}}>
                <Data value={data['wind']['speed']} title="Wind" />
                <Data value={data['main']['pressure']} title="Pressure" />
                <Data value={`${data['main']['humidity']}%`} title="Humidity" />
                <Data value={data['visibility']} title="Visiblity" />
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}
