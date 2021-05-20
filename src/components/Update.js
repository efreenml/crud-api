import React, { useEffect, useState } from 'react';
import {StyleSheet, TouchableOpacity, View } from 'react-native';
import {Text, TextInput, Button, Avatar} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {  isEmpty } from 'lodash';
import  { useHistory } from 'react-router-dom';
import {showToast} from "./helpers";
import DropDown from 'react-native-paper-dropdown';
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


export default function Update({uri, user}) {
    const history = useHistory();
    const [nombre, setName] = useState(user.nombre);
    const [apellido1, setApellido1] = useState(user.apPaterno);
    const [apellido2, setApellido2] = useState(user.apMaterno);
    const [email, setEmail] = useState(user.email);
    const [selectedImage, setSelectedImage] = useState(null);
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

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        const resultPCamera = resultPermission.permissions.mediaLibrary.status;
        if(resultPCamera == "denied") {
            showToast("Debe aceptar los permisos de galería");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 4]
            });
            if (result.cancelled) {
                showToast("No se seleccionó una imagen");
            } else {
                uploadImage(result.uri).then((f) => {
                    user.urlAvatar = `avatar/${user.id}`;
                    showToast("Imagen cargada con éxito");
                })
            }
        }
    }
    const uploadImage = async(uri) => {
        const response = await  fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`avatar/${user.id}`);
        return ref.put(blob);
    }
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
                    urlAvatar: user.urlAvatar != null? user.urlAvatar : null,
                    rol: selectedRol != null? {
                        id: selectedRol
                    } : null
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
            {selectedImage? (
                <Avatar.Image
                size={48} 
                    source={{
                        uri: selectedImage,
                    }}
                />
            ): (
                <TouchableOpacity
                    onPress={() => {
                        changeAvatar();
                    }}
                >
                    <View>
                            <Avatar.Icon size={48} icon="camera"
                            />
                            <Text>Seleccione</Text>
                    </View>
                </TouchableOpacity>
            )}
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
            
            <Button 
                icon="content-save" 
                mode="outlined" 
                onPress={() => history.replace("/usuarios")}
                style={styles.button}
                >
                Cancelar
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