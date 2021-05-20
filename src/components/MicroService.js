import React, { useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import { useHistory } from 'react-router';

export default function MicroService({uri, setUri}) {
    const [text, setText] = useState(null);
    const history = useHistory();
    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
                <Image
                style={styles.logo}
                    source={require('../../assets/logoESCOM.png')}
                />
            </View>
            <View style={{  marginTop: 80 }}>
                <TextInput
                label = "http://"
                placeholder ="127.0.0.1:8080"
                style = {styles.input}
                value = {text}
                onChangeText={t => setText(t)}
                />
                {uri != null && <Text>Configurada: {uri} </Text>}
                <Button 
                icon="content-save" 
                mode="contained" 
                onPress={() => {
                    if (text!=null && text != "") {
                        let fullUrl = "http://" + text;
                        setUri(fullUrl);
                        history.push("/usuarios");
                    }
                }
                }
                style={styles.button}
                >
                Guardar
                </Button>
            </View>
            
        </>
    )
}

const styles = StyleSheet.create({
    input: {
      marginTop: 20
    },
    button: {
        marginTop: 60
    },
    logo: {
      height: 220,
      width:240,
      resizeMode: 'center',
    },
})