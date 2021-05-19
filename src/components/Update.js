import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { map, isEmpty } from 'lodash';
import  { Redirect } from 'react-router-dom'

export default function Update({uri, user}) {

    const [valid, setValid] = useState(false)

    const [name, setName] = useState(user.name);
    const [apellido1, setApellido1] = useState(user.apPaterno);
    const [apellido2, setApellido2] = useState(user.apMaterno);
    const [email, setEmail] = useState(user.email);
    const save = () => {
        fetch(uri+"/usuarios", {
                method: 'PUT',
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
                });
    }

    return (
        <>
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

            {!isEmpty(user) ?  <Button 
            icon="content-save" 
            mode="contained" 
            onPress={() => save()}
            style={styles.button}
            >
            update
            </Button> 
             : <Text style = {styles.text}>Seleccionar usuario a editar</Text>
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