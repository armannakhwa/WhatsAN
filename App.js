import React, { Component,useState} from 'react';
import { Text, View, StyleSheet,ActivityIndicator,StatusBar,BackHandler,  PermissionsAndroid, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Card } from 'react-native-paper';
import OneSignal from 'react-native-onesignal';

const ActivityIndicatorElement = () => {
  return (
    <View style={{

      flex: 1,
      position: 'absolute',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    }}>
      <ActivityIndicator color="#009688" size="large" />
    </View>
  );
};





export default class App extends Component {


    constructor(props) {
      super(props);
      this.WEBVIEW_REF = React.createRef();
      
      this.state = {
      visible:false
      };
     
      
    }
  
  
    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

//********************************************************start notification */

//OneSignal Init Code
OneSignal.setAppId("5cdebd2b-e57e-4b29-ad9c-712c50fc33c8");


//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log("notification: ", notification);
  const data = notification.additionalData
  console.log("additionalData: ", data);
 console.log(notification.smallIcon);

  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);
});

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log("OneSignal: notification opened:", notification);
});


//********************************************************End notification */
//Alert.alert("Hii");

const proceed = () => {
console.log('You can use the Camera');
};

const getcamera = async () => {
  // We need to ask permission for Android only
  if (Platform.OS === 'android') {
    // Calling the permission function
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Permission Granted
      proceed();
    } else {
      // Permission Denied
      alert('CAMERA Permission Denied');
    }
  } else {
    proceed();
  }

    }
    getcamera();


    //end of mount
    }




    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
  
    handleBackButton = ()=>{
      this.WEBVIEW_REF.current.goBack();
      return true;
    }
  
    onNavigationStateChange(navState) {
      this.setState({
        canGoBack: navState.canGoBack
      });
    }
  
  

    



    render(){
  return (

    
    <View
    style={{
      flex:1,
      width:'100%',
      height:'100%',
    }}
    >
    <StatusBar  backgroundColor="#005e54" />

    <WebView
        originWhitelist={['*']}
        source={{ uri: 'https://arman1.herokuapp.com/index.php'}}  

        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        ref={this.WEBVIEW_REF}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        onLoadStart={() => this.setState({ visible: true})}
        onLoad={() => this.setState({ visible: false})}
        allowsInlineMediaPlayback={true}
    />
         {this.state.visible ? <ActivityIndicatorElement /> :false}
      </View>
     
     
     
  );

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5FCFF',
      flex: 1,
    },
    activityIndicatorStyle: {
      flex: 1,
      position: 'absolute',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    },
  });
  
    }

    
}