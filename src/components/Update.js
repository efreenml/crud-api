import React, { useEffect, useState } from 'react';
import {StyleSheet } from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {  isEmpty } from 'lodash';
import  { useHistory } from 'react-router-dom';
import {showToast} from "./helpers";
import DropDown from 'react-native-paper-dropdown';

export default function Update({uri, user}) {
    const history = useHistory();
    const [nombre, setName] = useState(user.nombre);
    const [apellido1, setApellido1] = useState(user.apPaterno);
    const [apellido2, setApellido2] = useState(user.apMaterno);
    const [email, setEmail] = useState(user.email);
    const [roles, setRoles] = useState([]);
    const [selectedRol, setSelectedRol] = useState(null);
    const [showDropDown, setShowDropDown] = useState(false);
    useEffect(() => {
        if (user.rol) {
            setSelectedRol(user.rol.id);
        }
        getRoles();
    }, []);
    const getRoles = async () => {
        try {
            let res = await fetch(uri + "/roles");
            let json = await res.json();
            let roles = json.map(rol => {
                return {
                    label: rol.descripcion,
                    value: rol.id
                }
            })
            setRoles(roles);
        } catch (error) {
            return [];
        }
    };
    const save = async () => {
        try {
            await fetch(`${uri}/usuarios/${user.id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre.trim(),
                    apPaterno: apellido1.trim(),
                    apMaterno: apellido2.trim(),
                    email: email.trim(),
                    rol: selectedRol != null? {
                        id: selectedRol
                    } 
                    : null,
                })
            });
            showToast("Éxito actualizando usuario");
            let path = `/usuarios`;
            history.replace(path);
        } catch(error) {
            showToast("Hubo un error. Intente más tarde")
        }
    }

    return (
        <>
            <TextInput
                label = "Nombre"
                style = {styles.input}
                value = {nombre}
                onChangeText={text => setName(text)}
            />
            <TextInput
                label = "Primer apellido"
                style = {styles.input}
                value = {apellido1}
                onChangeText={text => setApellido1(text)}
            />
            <TextInput
                label = "Segundo apellido"
                style = {styles.input}
                value = {apellido2}
                onChangeText={text => setApellido2(text)}
            />
            <TextInput
                label = "Correo electrónico"
                style = {styles.input}
                value = {email}
                onChangeText={text => setEmail(text)}
            />

            <DropDown
                label={'Rol'}
                mode={'outlined'}
                value={selectedRol}
                setValue={(selected) => {
                    setSelectedRol(selected);
                }
                }
                list={roles}
                visible={showDropDown}
                showDropDown={() =>  setShowDropDown(true)}
                onDismiss={() =>  setShowDropDown(false)}
                inputProps={{
                    right:  <TextInput.Icon  name={'menu-down'}  />,
                }}

                />
            <Button 
            icon="content-save" 
            mode="contained" 
            onPress={() => save()}
            style={styles.button}
            >
            Actualizar
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