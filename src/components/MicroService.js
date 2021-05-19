import React, { useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import { useHistory } from 'react-router';

export default function MicroService({uri, setUri}) {
    const [text, setText] = useState(null);
    const history = useHistory();
    return (
        <>
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
                let fullUrl = "http://" + text;
                setUri(fullUrl);
                history.push("/usuarios");
            }
            }
            style={styles.button}
            >
            Guardar
            </Button>
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
})