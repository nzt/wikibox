import React, { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { faFile, faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface EditProps extends RouteComponentProps<{ filename: string }> {}
interface EditState {
  filename: string;
  source: string;
  username: string;
  password: string;
}
export default class Edit extends Component<EditProps, EditState> {
  constructor(props: EditProps) {
    super(props);
    this.state = {
      filename: "",
      source: "",
      username: "",
      password: ""
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilenameChange = this.handleFilenameChange.bind(this);
  }
  async handleFilenameChange(event: ChangeEvent<HTMLInputElement>) {
    const filename = event.target.value;
    this.setState({
      filename
    });
  }
  handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    const username = event.target.value;
    this.setState({
      username
    });
  }
  handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    this.setState({
      password
    });
  }
  handleSourceChange(event: ChangeEvent<HTMLInputElement>) {
    const source = event.target.value;
    this.setState({
      source
    });
  }
  async handleSubmit() {
    await fetch(`./${this.state.filename}`, {
      method: "PUT",
      body: JSON.stringify(this.state)
    });
    this.props.history.push(`/page/${this.state.filename}`);
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <FontAwesomeIcon icon={faFile} />
            </InputGroupAddon>
            <Input value={this.state.filename} onChange={this.handleFilenameChange} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            onChange={this.handleSourceChange}
            value={this.state.source}
          />
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <FontAwesomeIcon icon={faUser} />
            </InputGroupAddon>
            <Input
              onChange={this.handleUsernameChange}
              value={this.state.username}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <FontAwesomeIcon icon={faKey} />
            </InputGroupAddon>
            <Input
              type="password"
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Input type="submit" />
        </FormGroup>
      </Form>
    );
  }
}