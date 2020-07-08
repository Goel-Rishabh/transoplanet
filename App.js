/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView,StyleSheet,Button,TouchableHighlight,TouchableOpacity,Image,ImageBackground,FlatList,View,Text,StatusBar,Dimensions} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {updateImage} from './app/redux/actions'
import Icon from 'react-native-vector-icons/AntDesign';

export class App extends React.Component {
    
    constructor(props){
        super(props)
    }

    componentDidMount(){

        const arr = [
            imageObj(1,'Bridge',require('./app/assets/1.jpeg')),
            imageObj(2,'Sunrise',require('./app/assets/2.jpeg')),
            imageObj(3,'Mountains',require('./app/assets/3.jpeg')),
            imageObj(4,'Clouds',require('./app/assets/4.jpeg')),
            imageObj(5,'Lilies',require('./app/assets/5.jpeg')),
            imageObj(6,'Solar Eclipse',require('./app/assets/6.jpeg')),
            imageObj(7,'Moon',require('./app/assets/7.jpeg')),
            imageObj(8,'Black Hole',require('./app/assets/8.jpeg')),
            imageObj(9,'Greenery',require('./app/assets/9.jpeg')),
            imageObj(10,'Monk',require('./app/assets/10.jpeg'))
        ]

        this.props.updateImage(arr)
    }

    toggleFav=(data)=>{
        let newData = this.props.AllImage
        Object.entries(this.props.AllImage).forEach(([key,value])=>{
            if(value.id==data.id){
                newData[key].fav=!newData[key].fav
            }
        })
        this.props.updateImage(newData)
    }

    renderItem=(props)=>{
        return(
            <View style={styles.galleryContainer}>
                <Image style={styles.imageAll} source={props.data.image} />  
                <TouchableOpacity onPress={()=>{this.toggleFav(props.data)}} style={styles.favButton} >
                    {
                        props.data.fav ? 
                        <Icon name="heart" color='red' size={25} />
                        :
                        <Icon name="hearto" size={25} />

                    }
                </TouchableOpacity>
                <Text style={styles.labelText}>{props.data.title}</Text>  
            </View>
        )
    }

    renderFav=(props)=>{
        if(props.data.fav){
            return(
                <View style={styles.favContainer}>
                    <Image source={props.data.image} style={styles.imageFav} />
                    <Text style={styles.labelText}>{props.data.title}</Text>  
                </View>
            ) 
        }else{
            return null
        }
    }
        
    render(){
        return(
            <View style={styles.Container}>
                <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "transparent" translucent = {true}/>
                
                <View>

                    <Text style={styles.heading}>FAVORITE  IMAGES</Text>
                    
                    <FlatList
                        horizontal={true}
                        data={this.props.AllImage}
                        renderItem={({item}) => <this.renderFav data={item}/>}
                    />
                    

                </View>


                <Text style={styles.heading}>ALL  IMAGES</Text>
                <FlatList
                    numColumns={2}
                    data={this.props.AllImage}
                    renderItem={({item}) => <this.renderItem data={item}/>}
                />
            </View>
        )
    }

}

const mapStateToProps = state => ({
    AllImage: state.reducer.AllImage,
})

const mapDispatchToProps = dispatch => ({
    updateImage: bindActionCreators(updateImage, dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(App)

const imageObj = (id,title,image) => ({id,title,image,fav:false}) 

const DeviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    Container:{
        paddingTop:StatusBar.currentHeight,
        flex:1,
        backgroundColor:'#F6F6F6',
        flexDirection:'column',
        alignItems:'stretch'
    },
    imageAll:{
        width:DeviceWidth*4/9,
        height:DeviceWidth*4/9,
        borderRadius:10,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    favButton:{
        position:'absolute',
        top:20,
        right:20
    },
    labelText:{
        position:'absolute',
        bottom:10,
        left:10,
        right:10,
        textAlign:'center',
        textAlignVertical:'center',
        color:'white',
        width:DeviceWidth*4/9,
        backgroundColor:'grey',
        backfaceVisibility:'visible',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        height:40,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    heading:{
        fontSize:18,
        margin:10,
        marginLeft:30,
        alignSelf:'flex-start'
    },
    imageFav:{
        width:DeviceWidth*4/9,
        height:DeviceWidth*4/9,
        borderRadius:10
    },
    galleryContainer:{
        padding:10,
        borderRadius:10
    },
    favContainer:{
        padding:10
    }
})