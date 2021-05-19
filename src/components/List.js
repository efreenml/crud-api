import React, { useEffect, useState } from "react";
import {
  Card,
  Title,
  Button,
  Colors,
  Subheading,
} from "react-native-paper";
import { useHistory } from "react-router-dom";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { map } from "lodash";
import { showToast } from "./helpers";

export default function List({ uri, setUser }) {
  const [data, setData] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await fetch(uri + "/usuarios");
      let json = await res.json();
      setData(json);
    } catch (error) {
      return [];
    }
  };
  const deleteUser = async (id) => {
      try {
        let result = await fetch(uri + "/usuarios/" + id, {
            method: "DELETE"
        });
        let payload = await result.json();
        if (result.status != 200 && payload['error']) {
            showToast(payload['error']);
        } else {
            showToast("Usuario eliminado con éxito");
            getData();
        }
      } catch(error) {
        showToast("Hubo un error. Intente nuevamente");
      }
  };
  const routeChangeUpdate = (usr) => {
    let path = `/update`;
    setUser(usr);
    history.push(path);
  };
  const routeChangeCreate = () => {
    let path = `/create`;
    history.push(path);
  };
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.w20}>
          <Button
            icon="update"
            color={Colors.grey600}
            mode="text"
            onPress={() => getData()}
          ></Button>
        </View>
        <View style={styles.w60}>
          <Title>Administrar usuarios</Title>
        </View>
        <View style={styles.w20}>
          <Button
            icon="account-plus"
            color={Colors.lightGreen700}
            mode="outlined"
            onPress={() => routeChangeCreate()}
          ></Button>
        </View>
        
      </View>
      <ScrollView style={{ maxHeight: 680 }}>
        {map(data, (oso) => {
          return (
            <Card key={oso.id} style={styles.card}>
              <Card.Content>
                <Subheading>Nombre: <Text style={styles.focus}>{oso.nombre}</Text></Subheading>
                <Subheading>Primer apellido:  <Text style={styles.focus}>{oso.apPaterno}</Text> </Subheading>
                <Subheading>Segundo apellido:  <Text style={styles.focus}>{oso.apMaterno}</Text></Subheading>
                <Subheading>Correo electrónico:  <Text style={styles.focus}>{oso.email}</Text></Subheading>
                {oso.rol && 
                  <Subheading>Rol: <Text style={styles.focus2}>{oso.rol.descripcion}</Text> </Subheading>
                }
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.button_1}>
                    <Button
                      icon="account-edit"
                      mode="outlined"
                      compact="true"
                      onPress={() => {
                        routeChangeUpdate(oso);
                      }}
                      color="blue"
                    >
                      Editar
                    </Button>
                  </View>
                  <View style={styles.button_1}>
                    <Button
                      icon="account-minus"
                      mode="outlined"
                      compact="true"
                      onPress={() => deleteUser(oso.id)}
                      color="red"
                    >
                      Borrar
                    </Button>
                  </View>
                </View>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },
  delete: {
    backgroundColor: "red",
  },
  edit: {
    backgroundColor: "blue",
  },
  button_1: {
    width: "50%",
  },
  w60: {
    width: "60%",
  },
  w20: {
    width: "20%",
  },
  focus: {
    color: Colors.grey700,
    fontSize: 16
  },
  focus2: {
    color: Colors.orange700,
    fontSize: 16
  }
});
