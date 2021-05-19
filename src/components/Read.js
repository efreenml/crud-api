import React from 'react';
import { Card, Title, Paragraph, Text, Button } from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import { map } from "lodash";


export default function Read({uri}) {
    const getData = () => {
        return fetch(uri+"/usuarios")
          .then((response) => response.json())
          .then((json) => {
            return json.data;
          })
          .catch((error) => {
            console.error(error);
          });
      };
    //data = getData();
      data = [
        {
            name: "efren",
            apPaterno: "mtz",
            apMaterno: "lms",
            email: "mocmail@gmail.com",
            id: "1"
        },
        {
            name: "didier",
            apPaterno: "gmz",
            apMaterno: "lms",
            email: "mocmail2@gmail.com",
            id: "2"
        }
      ]

      const deleteUser = (id) => {
        /*fetch(uri+"/usuarios/"+id, {
            method: 'DELETE',
              });*/
              console.log("usuario:", id);  
      }

        return (
        <View>
            <Text>Hola</Text>
            {map(data, (oso, value) => (
                <Card key = {oso.id}>
                    <Card.Content>
                    <Title>{oso.name}</Title>
                    <Paragraph> {oso.apPaterno} </Paragraph>
                    <Paragraph> {oso.apMaterno} </Paragraph>
                    <Paragraph> {oso.email} </Paragraph>
                    <Button 
                        icon="account-multiple-minus" 
                        mode="contained" 
                        onPress={() => deleteUser(oso.id)}
                        style = {styles.delete}
                    >
                    Delete</Button>
                    </Card.Content>
                </Card>
        ))}
            <Text>adio</Text>
        </View>
        );
    }
const styles = StyleSheet.create({
    delete: {
        backgroundColor: "red"
    }
})