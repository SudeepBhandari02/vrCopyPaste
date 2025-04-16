import {Tabs} from "expo-router"

const TabLayout = ( ) =>{
    return(
        <Tabs>
            <Tabs.Screen name="home" options={{title: 'Home'}} />
            <Tabs.Screen name="saved" options={{title: 'Saved'}} />
        </Tabs>
    )
}

export default TabLayout;