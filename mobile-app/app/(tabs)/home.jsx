import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import {router} from "expo-router";

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
      <TouchableOpacity onPress={()=>router.push("/threeDScan")}>
          <Text>3D object</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home