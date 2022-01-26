import React, { Component } from 'react';
import { Container, Spinner, Table } from 'reactstrap';
import Image from 'next/image';
import Router from 'next/router';
import axios from 'axios';

class PlayerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      person: 'null',
    };
  }

  async componentDidMount() {
    const { id } = Router.query;
    axios
      .get(`https://api-kel3.herokuapp.com/infoPlayer/${id}`)
      .then((res) => {
        this.setState({ person: res.data, loading: false });
      });
  }

  render() {
    const { loading, person } = this.state;
    return (
      <div className="search-container">
        <Container className="p-4">
          <div>
            {loading || !person ? (
              <Spinner color="dark" className="mx-auto d-block">
                Loading...
              </Spinner>
            ) : (
              <div>
                <h1 className="text-center">
                  Profile And Score
                  {' '}
                  {person.username}
                </h1>
                <div className="d-flex justify-content-center m-4">

                  <Image
                    src={!person.url ? 'https://res.cloudinary.com/dkqxlkrj5/image/upload/v1643038776/profil_image/profilnull_weqlng.png' : person.url}
                    className="img-fluid rounded"
                    width={200}
                    height={200}
                  />
                </div>
                <Table borderless responsive striped size="sm">
                  <tbody>
                    <tr>
                      <th className="th-lg">Username</th>
                      <td>
                        :
                        {person.username}
                      </td>
                    </tr>
                    <tr>
                      <th>Nama</th>
                      <td>
                        :
                        {person.nama}
                      </td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>
                        :
                        {person.email}
                      </td>
                    </tr>
                    <tr>
                      <th>Umur</th>
                      <td>
                        :
                        {person.umur}
                      </td>
                    </tr>
                    <tr>
                      <th>Score</th>
                      <td>
                        :
                        {person.score}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}
          </div>

        </Container>
      </div>
    );
  }
}

export default PlayerInfo;
