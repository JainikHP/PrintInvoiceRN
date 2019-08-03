import { Page } from "../src/components";
import React, { Component } from "react";
import { createPDF } from "../lib/createPDF";
import { Alert, Dimensions, TextInput, Button, StyleSheet } from "react-native";
import * as Print from 'expo-print';

export default class Invoice extends Component {
  static navigationOptions = {
    title: "Invoice"
  };
  props: PropsType;

  constructor() {
    super();
    this.state = {
      values: {}
    };
  }

  componentDidMount() {
    this.getPdfSource().then(pdfSource =>
      this.setState({
        pdfSource,
        values: { guest: "", date: "" },
        showPdf: false
      })
    );
  }

  componentDidUpdate() {
    this.getPdfSource();
  }

  getPdfSource = async () => {
    const file = await createPDF(this.state.values);
    const pdfSource = {
      uri: file.uri
    };
    return pdfSource;
  };

  refreshPdf = () => {
    //this.setState({ showPdf: true });
    Print.printAsync({ uri: file.uri }).catch(error =>
      Alert.alert(error.message)
    );
  };

  render() {
    const { pdfSource, showPdf } = this.state;
    return (
      <Page>
        <TextInput
          style={styles.textInput}
          onChangeText={text =>
            this.setState({
              values: { ...this.state.values, guest: text },
              showPdf: false
            })
          }
          value={this.state.values.guest}
          placeholder="Who is your guest?"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={date =>
            this.setState({
              values: { ...this.state.values, date: date },
              showPdf: false
            })
          }
          value={this.state.values.date}
          placeholder="When is it?"
        />
        <Button title={"Download"} onPress={() => Print.printAsync({ 
          uri: pdfSource.uri }).catch(error => Alert.alert(error.message))} />
        {/* {showPdf && (
          <Pdf
            style={styles.pdf}
            source={pdfSource}
            onError={error => Alert.alert(`${error}`)}
          />
        )} */}
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  textInput: { height: 40, borderColor: "gray", borderWidth: 1, margin: 8 },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    alignSelf: "center"
  }
});

type PropsType = {
  navigation: any
};