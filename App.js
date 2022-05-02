import React, {useEffect} from 'react';
import {Text, TextInput, View, StyleSheet, Alert, FlatList, KeyboardAvoidingView} from "react-native";
import {ListItem, Button} from "react-native-elements";
import {db} from './firebase'

const App = () => {
    const [data, setData] = React.useState([]);
    const [text, setText] = React.useState('');
    const addData = async () => {
        if (text.length > 0) {
            await db.collection('Tareas').add({
                nombre: text
            })
            setText('')
        } else {
            Alert.alert('Error', 'Debes ingresar una tarea')
        }
    }
    useEffect(async () => {
        await db.collection('Tareas').onSnapshot(querySnapshot => {
            const data = []
            querySnapshot.forEach(doc => {
                data.push({
                    id: doc.id,
                    nombre: doc.data().nombre
                })
            })
            setData(data)
        })
    }, [])
    console.log(data)
    const borrar = async (id) => {
        await db.collection('Tareas').doc(id).delete()
    }
    const renderItem = ({item}) => {
        return (
            <View>
                <Text style={styles.titleStyle}>{item.nombre}</Text>
                <Button title="Borrar" onPress={() => borrar(item.id)}/>
            </View>
        )
    }
    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <View style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                    <Text style={styles.logoText}>To do list</Text>
                    <TextInput
                        placeholder="Agregar tarea"
                        onChangeText={(text) => setText(text)}
                        value={text}
                        style={styles.loginFormTextInput}
                        multiline={true}
                    />
                    <Button
                        title="Añadir tarea"
                        onPress={() => {
                            addData()
                        }}
                        buttonStyle={styles.loginButton}
                    />

                    <View>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}

                        />
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};
export default App;

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: "center"
    },
    loginScreenContainer: {
        flex: 1,
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: "center",
    },
    loginFormView: {
        flex: 1,
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#eaeaea",
        backgroundColor: "#fafafa",
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    loginButton: {
        backgroundColor: "#00a680",
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        width: 350,
        alignItems: "center"
    },
    fbLoginButton: {
        height: 45,
        marginTop: 10,
        backgroundColor: 'transparent',
    },   titleStyle: {
        fontSize: 20,
        fontWeight: '800',
    },

});
