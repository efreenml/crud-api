import React, { useState, useEffect } from "react";
import { Appbar, Button, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View } from "react-native";

import { NativeRouter, Route, Link } from "react-router-native";
import Create from "./src/components/Create";
import List from './src/components/List';
import Microservice from './src/components/MicroService';
import Update from './src/components/Update';
import {firebaseApp} from "./src/utils/firebase";
import * as firebase from "firebase";



function Topic({ match }) {
  return <Text style={styles.topic}>{match.params.topicId}</Text>;
}

function Topics({ match }) {
  return (
    <View>
      <Text style={styles.header}>Topics</Text>
      <View>
        <Link
          to={`${match.url}/rendering`}
          style={styles.subNavItem}
          underlayColor="#f0f4f7"
        >
          <Text>Rendering with React</Text>
        </Link>
        <Link
          to={`${match.url}/components`}
          style={styles.subNavItem}
          underlayColor="#f0f4f7"
        >
          <Text>Components</Text>
        </Link>
        <Link
          to={`${match.url}/props-v-state`}
          style={styles.subNavItem}
          underlayColor="#f0f4f7"
        >
          <Text>Props v. State</Text>
        </Link>
      </View>

      <Route path={`${match.url}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.url}
        render={() => <Text style={styles.topic}>Please select a topic.</Text>}
      />
    </View>
  );
}

function App() {
  const [uri, setUri] = useState(null);
  const [user, setUser] = useState({});
  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Demo microservicios"/>
      </Appbar.Header>
      <NativeRouter>
        <View style={styles.container}>
          <View style={styles.nav}>
            <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
              <Button
                icon="cog"
              >
                Config
              </Button>
            </Link>
            {uri != null &&(
              <>
              <Link to="/usuarios" underlayColor="#f0f4f7" style={styles.navItem}>
              <Button
                icon="account-multiple"
              >
                Usuarios
              </Button>
              </Link>
              </>
            )}
          </View>

          <Route exact path="/" component={() => <Microservice uri={uri} setUri={setUri} />} style={styles.center} />
          <Route path="/create" component={() => <Create uri={uri} />}/>
          <Route path="/usuarios" component={() => <List uri={uri} setUser={setUser} />} />
          <Route path="/update" component={() => <Update uri={uri} user={user} />} />
        </View>
      </NativeRouter>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  centar: {
    justifyContent:'center',
    alignItems: "center"
  },
  container: {
    marginTop: 25,
    padding: 10
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
});

export default App;