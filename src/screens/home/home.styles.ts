import { StyleSheet } from "react-native";
import { isLargeScreen, normalize } from "../../components/tools/responsive";

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    shopContainer:{ flex: 1, 
        flexDirection: "row", 
        flexWrap: "wrap",
        alignItems:'flex-start',
        justifyContent:'center' 
},
    shopItem:{
        margin: 10,
        width: '30%' ,
        borderWidth:3,
        borderRadius:15,
        overflow:'hidden'
      }

})

export default styles