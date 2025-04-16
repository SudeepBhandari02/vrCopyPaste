import { Text, SafeAreaView} from 'react-native'
import React from 'react'
import ARTextScene from "../../components/ArTextScene";
import MyCamera from "../../components/MyCamera";

const threeDScan = () => {
  return (
          <ARTextScene scannedText="hello there"/>
        // <MyCamera/>
    
  )
}

export default threeDScan