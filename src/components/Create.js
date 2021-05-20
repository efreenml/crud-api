import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Avatar } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { useHistory } from 'react-router';
import { showToast } from './helpers';
export default function Create({uri}) {
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState("");
    const [apellido1, setApellido1] = useState("");
    const [apellido2, setApellido2] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roles, setRoles] = useState([]);
    const [selectedRol, setSelectedRol] = useState(null);
    const [showDropDown, setShowDropDown] = useState(false);
    const history = useHistory();
    useEffect(() => {
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


    const createFetch = async () => {
        setLoading(true);
        try {
            let fetchPromise = fetch(uri+"/usuarios", {
                method: 'POST',
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
                    password
                }),
            });
            const delay = (timeout, error) => new Promise((resolve, reject) => setTimeout(() => reject(error), timeout));
            let result = await Promise.race([
                fetchPromise,
                delay(3 * 1000, 'Timeout Error')
            ]);
            let body = await result.json();
            if(result.status !=200) {
                showToast(body.error);
                setLoading(false);
            } else {
                showToast("Éxito creando usuario");

                setLoading(false);
                history.replace("/usuarios");
            }
        } catch(error) {
            showToast("Hubo un error. Intente más tarde o verifique la url");
            setLoading(false);
        }
        
    }

    return (
        <>
            {loading?
            (<Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>Cargando</Text>):
            (<>
            <TextInput
                label = "Nombre"
                style = {styles.input}
                value = {nombre}
                onChangeText={text => setNombre(text)}
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
            <TextInput secureTextEntry={true} 
                label = "Contraseña"
                style = {styles.input}
                value = {password}
                onChangeText={text => setPassword(text)}
            />
            
            <Button 
                icon="content-save" 
                mode="contained" 
                onPress={() => createFetch()}
                style={styles.button}
                >
                Guardar
            </Button>
            
            <Button 
                icon="cancel" 
                mode="outlined" 
                onPress={() => history.replace("/usuarios")}
                style={styles.button}
                >
                Cancelar
            </Button>
            </>
            )}
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