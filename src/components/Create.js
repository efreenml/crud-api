import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
export default function Create({uri}) {

    const [name, setName] = useState("");
    const [apellido1, setApellido1] = useState("");
    const [apellido2, setApellido2] = useState("");
    const [email, setEmail] = useState("");
    const [valid, setValid] = useState(false);
    const save = () => {
        console.log(name.trim(), apellido1.trim(), apellido2.trim(), email.trim());
    }



    const createFetch = () => {
        fetch(uri+"/usuarios", {
      method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: name.trim(),
            apPaterno: apellido1.trim(),
            apMaterno: apellido2.trim(),
            email: email.trim(),
        })
        }).then((response) => {
            setValid(true);
            setTimeout(() => {
                setValid(false);
            }, 5000);
        });
    }

    return (
        <>
        <Text>URL: {uri}</Text>
            <TextInput
                label = "name"
                style = {styles.input}
                value = {name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                label = "last name"
                style = {styles.input}
                value = {apellido1}
                onChangeText={text => setApellido1(text)}
            />
            <TextInput
                label = "last name"
                style = {styles.input}
                value = {apellido2}
                onChangeText={text => setApellido2(text)}
            />
            <TextInput
                label = "email"
                style = {styles.input}
                value = {email}
                onChangeText={text => setEmail(text)}
            />

            {uri ?  <Button 
            icon="content-save" 
            mode="contained" 
            onPress={() => save()}
            style={styles.button}
            >
            Save
            </Button> 
             : <Text style = {styles.text}>Ingrese url para avanzar</Text>
            }
            {valid ? <Text style = {styles.success} >Datos guardados</Text> : <Text></Text>}
        </>
    )
}

const styles = StyleSheet.create({
    input: {
      marginTop: 20
    },
    button: {
        marginTop: 15
    },
    text: {
        marginTop:20,
        textAlign:'center'
    },
    success: {
        marginTop:20,
        textAlign:'center',
        backgroundColor: "green"
    }
})