import React, { Component } from 'react';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import LocalDB from './actions/LocalDB';

class AddLocation extends Component {
    constructor(props) {
        super(props);
        if (props!== undefined && props.location.state) {
            const data = props.location.state;
            this.state = data;
        } else {
            this.state = {
                locationName:'',
                suite: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
                phoneNumber: '',
                appointment: '',
                timeZone: '',
                edit: false
            }
        }
    }

    componentDidMount = () => {
        LocalDB.init();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleTimeZone = (e) => {
        this.setState({
            timeZone: e
        });
    }

    handleStateChange = selectedOption => {
        this.setState({
            state: selectedOption
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { edit, ...rest } = this.state;
        if (edit) {
            LocalDB.edit(rest)
            .then( (res) => {
            this.props.history.push('/');
            });
        }
        LocalDB.create(rest)
        .then( (res) => {
          this.props.history.push('/');
        });

    }

    render() {
        const {
            locationName, 
            suite,
            address1,
            address2,
            city,
            state,
            zip,
            phoneNumber,
            appointment,
            timeZone
        } = this.state;
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            <Form>
                <Form.Row>
                    <Form.Group  controlId="formGridLocation">
                    <Form.Label>Location Name</Form.Label>
                    <Form.Control name='locationName' type="text" placeholder="Location"  value={locationName} onChange={this.handleChange} required/>
                    </Form.Group>

                    <Form.Group  controlId="formGridSuite">
                    <Form.Label>Suite No.</Form.Label>
                    <Form.Control name='suite' type="text" value={suite} onChange={this.handleChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control name='address1' type="text" value={address1} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control name='address2' type="text" value={address2} onChange={this.handleChange} />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group  controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control name='city' type="text" value={city} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group  controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control name='state' type="text" value={state} onChange={this.handleChange}>
                        {/* {this.getStates}
                        <option>dsvsvs</option> */}
                    </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group  controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control name='zip' type="text" value={zip} onChange={this.handleChange} />
                    </Form.Group>               

                    <Form.Group  controlId="formGridPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control name='phoneNumber' type="text" value={phoneNumber} onChange={this.handleChange} />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group  controlId="formGridTimeZone">
                        <Form.Label>Time Zone</Form.Label>
                        <TimezonePicker
                            absolute      = {false}
                            value = {timeZone}
                            placeholder   = "Select timezone..."
                            onChange      = {this.handleTimeZone}
                        />
                        </Form.Group>

                        <Form.Group  controlId="formGridAppointment">
                        <Form.Label>Appointment Pool</Form.Label>
                        <Form.Control name='appointment' type="text" value={appointment} onChange={this.handleChange} />
                    </Form.Group>
                </Form.Row>

  <Button variant="primary" type="submit" onClick={this.handleSubmit}>
    Submit
  </Button>
</Form>
</div>
</div>
        )
    }
}

export default withRouter(AddLocation);