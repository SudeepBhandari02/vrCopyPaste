import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import {router} from "expo-router";

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
      <TouchableOpacity className={"px-6 py-2 bg-cyan-400 my-4"} onPress={()=>router.push("/threeDScan")}>
          <Text>3D object</Text>
      </TouchableOpacity>
        <TouchableOpacity className={"px-6 py-2 bg-emerald-400 my-4"} onPress={()=>router.push("/twoDScan")}>
          <Text>2D object</Text>
      </TouchableOpacity>
        <TouchableOpacity className={"px-6 py-2 bg-amber-400 my-4"} onPress={()=>router.push("/OCRScan")}>
          <Text>Scan Text</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home