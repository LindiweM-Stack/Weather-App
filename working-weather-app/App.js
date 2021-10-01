import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import DateTime from './components/DateTime';
import Icon from 'react-native-vector-icons/AntDesign';



const Dev_Height = Dimensions.get('window').height;
const Dev_Width = Dimensions.get('window').width;




export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Kimberley",
      data: [],
      icon: "",
      city_display: "",
      desc: "",
      main: "",
      humidity: "",
      pressure: "",
      visisbility: "",
    }

    this.fetch_weather()
  }

  fetch_weather = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q="+this.state.city+"&appid=a2cfddcd700f3afa2cc558daca3e390d"
    )
      .then((responce) => responce.json())
      .then((json) => {
        this.setState({ data: json });
        this.setState({ temp: (json.main.temp - 273.15).toFixed(2) + ' C' });
        this.setState({ desc : json.weather[0].description});
        this.setState({ city_display: json.name });
        this.setState({ icon: json.weather[0].icon });
        this.setState({ main: json.weather[0].main });
        this.setState({ humidity: json.main.humidity + ' %' });
        this.setState({ pressure: json.main.pressure + ' hpa' });
        this.setState({
          visibility: (json.visibility/1000).toFixed(2) + ' km',
        });
      })
      .catch((error) => console.error(error));
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{
            uri: 'https://images.pexels.com/photos/4611748/pexels-photo-4611748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          style={styles.Image_Background_style}>
          <View style={styles.Search_Box_View}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#FFF"
              style={styles.Search_Box}
              onChangeText={(text)=>this.setState({ city: text })}
            />

            <TouchableOpacity style={styles.button_touch} onPress={this.fetch_weather}>
              <Icon name="search1" size={20} color="FFF" />
            </TouchableOpacity>
          </View>
            <DateTime />
          <View style={styles.Weather_Box_Main}>
            <View style={styles.Weather_Holder_View}>
              <Image source={{uri: "http://openweathermap.org/img/wn/10d@2x.png"}} style={styles.Weather_Image}/>
              <View>
                <Text style={styles.temperature_text}>{this.state.temp}</Text>
                <Text style={styles.city_text}>{this.state.city_display}</Text>
              </View>
            </View>
          </View>
       
          <View style={styles.Info_Box_View}>
            <View style={styles.Info_Holder_View}>
            <Text style={styles.Main_Weather_Text}>{this.state.main}</Text>
            <Text style={styles.description_text}>{this.state.desc}</Text>
            <Text style={styles.humidity_text}>{this.state.humidity}</Text>
            <Text style={styles.other_text}>{this.state.pressure}</Text>
            <Text style={styles.other_text}>{this.state.visibility}</Text>
            
            </View>
          
          </View>
         

        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dev_Height,
    width: Dev_Width,
  },

  Image_Background_style: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

 
    Search_Box_View:{
      height: "20%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      borderRadius: "24",
    },

    Search_Box: {
      height: "25%",
      width: "80%",
      borderColor: "#FFF",
      borderRadius: "24",
      borderWidth: 1,
      color: "#FFF",
      paddingHorizontal: 15,

},
  button_touch: {
    marginLeft: '5%',
    height: '35%',
    width: '8%',
    justifyContent: 'center',
    alignItems: 'center',

  },

  Weather_Box_Main: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  Weather_Holder_View: {
    height: '80%',
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },

  Weather_Image: {
    height: '80%',
    width: '50%',
  },

  temperature_text: {
    fontSize: 25,
    color: 'black',
    marginLeft: '-10%',
    fontWeight: 700,
  },

  city_text: {
    fontSize: 16,
    color: 'black',
    marginLeft: '10%',
    marginTop: '1%',
    fontWeight: 700,
  },

  Info_Holder_View:{
    height: "80%",
    width: "90%",
    backgroundColor: "#18181B99",
    borderRadius: 15,
  },

  Info_Box_View:{
    height: "45%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  Main_Weather_Text:{
    fontSize: 28,
    color: "white",
    marginLeft: "8%",
    marginTop: "8%",
    fontWeight: 400,
  },

  description_text:{
    fontSize: 20,
    color: "white",
    marginLeft: "8%",
    marginTop: "5%",
    fontWeight: 700,
  },

 humidity_text:{
   fontSize: 18,
   color: "white",
   marginLeft: "8%",
   marginTop: "8%",
   fontWeight: 600,
 },

 other_text:{
   fontSize: 18,
   color: "white",
   marginLeft: "8%",
   marginTop: "2%",
   fontWeight: 600,
 },


});