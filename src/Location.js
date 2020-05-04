import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LocalDB from './actions/LocalDB';
import { Button, Table } from 'react-bootstrap';
import Pagination from "react-js-pagination";

class Location extends Component {
    constructor(props){
        super(props);
        this.state = {
          locations: [],
          pageData: [],
          totalItem: 0,
          activePage: 1,
          perPage: 1
        }
    }

    componentDidMount = () => {
        const { activePage, perPage } = this.state;
        LocalDB.init()
        .then( () => {
          LocalDB.getAll()
          .then( (res) => {
            this.setState( { locations: res, totalItem: res.length }, () => {
                this.setPageData(activePage, perPage);
            });
          });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { activePage, perPage } = this.state;
        if (prevState.activePage !== activePage) {
            this.setPageData(activePage, perPage);
        }
    }

    setPageData = (currentPage, itemsPerPage) => {
        const { locations, pageData } = this.state;
        let count = currentPage * itemsPerPage;
        let data = locations.slice(currentPage - 1, count);
        this.setState({ pageData: data });
    }


    handlePageChange = (pageNumber) => {
        this.setState({activePage: pageNumber});          
    }
    
    deleteLocation = (id) => {
        LocalDB.deleteLocation( id)
        .then( (success) => {
        this.removeLocation( id);
        });
    };

    removeLocation = (id) => {
        this.setState( { locations: this.state.locations.filter( item => item.id !== id ), pageData: this.state.pageData.filter( item => item.id !== id )});
    };

    addLocation = () => {
        this.props.history.push('/add-Location');
    };

    locs = () => {
        return this.state.pageData.map((location) => {
            const { id, locationName, address2, phoneNumber } = location;
            return (
                <tr key={id}>
                   <td>{locationName}</td>
                   <td>{address2}</td>
                   <td>{phoneNumber}</td>
                   <td><Button variant="primary" size="sm" type="submit" onClick={e => this.props.history.push('/add-Location', { edit: true, ...location})}>Edit</Button>
                   <Button className="float-right" variant="primary" size="sm" type="submit" onClick={e => this.deleteLocation(id)}>Delete</Button></td>
                </tr>
             )
        })
    };

    render() {
        const { locations } = this.state;
        let data;
            if(locations.length === 0) {
                data = <div>
                There is no location added right now
            </div>
            } else {
                let { totalItem, perPage, activePage } = this.state
                // data = <h1>dcdsvsdvsdv</h1>
                data = <>
              <Table bordered hover size="sm">
                <thead>
                  <tr>
                    {/* <th></th> */}
                    <th>Locatoin Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {this.locs()}
                </tbody>
              </Table>
              <Pagination
                activePage={activePage}
                itemsCountPerPage={perPage}
                totalItemsCount={totalItem}
                onChange={this.handlePageChange}
              />
              </>
            }
        return(
            <div>
                    <h3>Locations</h3>
                    <Button className="float-right" variant="primary" size="sm" type="submit" onClick={this.addLocation}>Add Location</Button>
                    {data}
            </div>
        )
    }
}

export default withRouter(Location);