import React, { Component } from 'react';
import SpeechRecognition from 'react-speech-recognition';
import { Table, Col, Button, Form, Row, Pagination, Glyphicon } from 'react-bootstrap';

class Dictaphone extends Component {
  constructor(props) {
    console.log(props);
    debugger;
    super(props)
    this.state = {
      transcript: this.props.transcript,
      resetTranscript: this.props.resetTranscript,
      browserSupportsSpeechRecognition: this.props.browserSupportsSpeechRecognition,
      isBrowserSupport: false,
    }

  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState({
      transcript: nextProps.transcript,
      resetTranscript: nextProps.resetTranscript,
      browserSupportsSpeechRecognition: nextProps.browserSupportsSpeechRecognition,
    });
  }
  render() {
    if (!this.state.browserSupportsSpeechRecognition) {
      return <h5>Browser not supports voice recognition.</h5>
    }
    return (
      <div>
        {/* <span>{this.state.transcript}</span> */}
        <input type="text" name="transcript" value={this.state.transcript} ></input> &nbsp;
        <button onClick={() => this.props.data.onChangeLinkName(this.state.transcript, this.state.browserSupportsSpeechRecognition)}>Clik to search</button>
        <Button variant="link" onClick={this.state.resetTranscript}>Clear</Button>
        {/* <a href="" onClick={this.state.resetTranscript}>Clear</a> */}
      </div>
    )
  }

}

export default SpeechRecognition(Dictaphone)