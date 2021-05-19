import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

export default function MicroService({setUri}) {
    const [text, setText] = useState(null);
    return (
        <>
            <TextInput
                label = "Microservice route"
                style = {styles.input}
                value = {text}
                onChangeText={text => setText(text)}

            />
            <Button 
            icon="content-save" 
            mode="contained" 
            onPress={() => setUri(text)}
            style={styles.button}
            >
            Save
            </Button>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
      marginTop: 20
    },
    button: {
        marginTop: 15
    }
})