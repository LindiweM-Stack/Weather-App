import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet} from "react-native";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



const DateTime = () => {
  const [date, setDate] = useState('')
   const [time, setTime] = useState('')

   useEffect (() => {
     setInterval(() => {
       const time = new Date();
       const month = time.getMonth();
       const date = time.getDate();
       const day = time.getDay();
       const hour = time.getHours();
       const hoursin12HrFormat = hour >= 13 ? hour %12: hour
       const minutes = time.getMinutes();
       const ampm = hour >=12 ? 'PM' : 'AM'

       setTime((hoursin12HrFormat < 10? '0'
       +hoursin12HrFormat : hoursin12HrFormat) + ':' + (minutes < 10?
       '0'+minutes: minutes)+ ' ' +ampm)

       setDate(days[day] + ', '+date+ ' ' +months[month])
     }, 1000);
   }, [])

  return (
    <View style={styles.container}>
     <View>
      <View>
       <Text style={styles.time}>{time}</Text>
      </View>
       <View>
       <Text style={styles.date}>{date}</Text>
      </View>
     </View>
     <View></View>
    </View>
  )
}


const styles =StyleSheet.create({
    container:{
      flexDirection: 'row',
      flex:1,
      alignItems: 'center',
      width: '100%',
      height: 100,
      justifyContent: "center",
    },

    time:{
      fontSize: 35,
      color: 'white',
      marginBottom: 1,
      alignItems: 'center',
      fontWeight: 500,

      
    }, 

    date:{
      fontSize: 26,
      color: 'white',
      justifyContent: 'center',
      fontWeight: 500,
    
    },
     


})




export default DateTime;