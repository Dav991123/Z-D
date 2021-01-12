import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Label
} from "reactstrap";
import Select  from 'react-select'


const EditForm = ({values, codeType, setCodeType, codeData, handleChange, handleSave, selectedCode, setSelectedCode}) => {
  const { firstAttachedPerson, owner, secondAttachedPerson } = values;

  const transformData = (data) => {
       return data.map(code => {
         return ({
            value: code.pin,
            label: `${code.type} - ${code.pin} activeMonths "${code.activeMonths}"`
         })
       })
  };

  return (
    <>
      <Container>


        <Row>
          <Col>
            <Card className="card-edit-modal">
              <CardHeader>
                <CardTitle tag="h4">User Info</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onChange={e => {
                  setCodeType(e.target.value)
                }}>
             <FormGroup check inline className="form-check-radio">
                        <Label check>
                          <Input
                              defaultValue="DESC"
                              id="exampleRadios3"
                              name="DESC"
                              type="radio"
                              checked={codeType === 'DESC'}
                          />
                          <span className="form-check-sign" />
                          GOLD
                        </Label>
                  </FormGroup>

                   <FormGroup check inline className="form-check-radio">
                        <Label check>
                          <Input
                              defaultValue="asc"
                              id="exampleRadios3"
                              name="asc"
                              type="radio"
                              checked={codeType === 'asc'}
                          />
                          <span className="form-check-sign" />
                          BLACK
                        </Label>
                  </FormGroup> 
                </Form>
                  
                <Form >
{/* 
                  <Row>
                    <Col>
                      <Select
                          className="react-select info"
                          classNamePrefix="react-select"
                          placeholder="Code"
                          name="multipleSelect"
                          closeMenuOnSelect={false}
                          value={selectedCode}
                          onChange={(value) => setSelectedCode(value)}
                          options={transformData(codeData)}
                      />
                    </Col>
                  </Row> */}
                  <Row>
                    <Col>
                      <label>Name</label>
                      <FormGroup>
                        <Input
                          type="text"
                          value={firstAttachedPerson.name}
                          onChange={e => {
                            handleChange({
                              ...values,
                              firstAttachedPerson: {
                                ...firstAttachedPerson,
                                name: e.target.value
                              },
                            })
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <label>Surname</label>
                      <FormGroup>
                        <Input
                            type="text"
                            value={firstAttachedPerson.surname}
                            onChange={e => {
                              handleChange({
                                ...values,
                                firstAttachedPerson: {
                                  ...firstAttachedPerson,
                                  surname: e.target.value
                                },
                              })
                            }}
                        />
                      </FormGroup>
                    </Col>

                    {/*<Col>*/}
                    {/*  <label>ID</label>*/}
                    {/*  <FormGroup>*/}
                    {/*    <Input*/}
                    {/*        type="number"*/}
                    {/*        value={firstAttachedPerson.id}*/}
                    {/*        onChange={e => {*/}
                    {/*          handleChange({*/}
                    {/*            ...values,*/}
                    {/*            firstAttachedPerson: {*/}
                    {/*              ...firstAttachedPerson,*/}
                    {/*              id: +e.target.value*/}
                    {/*            },*/}
                    {/*          })*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*  </FormGroup>*/}
                    {/*</Col>*/}
                  </Row>
                  <Row>
                    <Col>
                      <label>Phone number</label>
                      <FormGroup>
                        <Input
                           type="number"
                           value={firstAttachedPerson.phone}
                           onChange={e => {
                             handleChange({
                               ...values,
                               firstAttachedPerson: {
                                 ...firstAttachedPerson,
                                 phone: +e.target.value
                               },
                             })
                           }}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <label>Email</label>
                      <FormGroup>
                        <Input
                            type="email"
                            value={firstAttachedPerson.email}
                             onChange={e => {
                              handleChange({
                                ...values,
                                firstAttachedPerson: {
                                  ...firstAttachedPerson,
                                  email: e.target.value
                                },
                              })
                            }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    {/*OWNER */}
                    <Col>
                    <CardTitle>SubUser 1 OWNER</CardTitle>
                      <label>Name</label>
                      <FormGroup>
                        <Input
                            type="text"
                            value={owner.name}
                            onChange={e => {
                              handleChange({
                                ...values,
                                owner: {
                                  ...owner,
                                  name: e.target.value
                                },
                              })
                            }}
                        />
                      </FormGroup>
                      <label>Surname</label>
                      <FormGroup>
                        <Input
                            type="text"
                            value={owner.surname}
                            onChange={e => {
                              handleChange({
                                ...values,
                                owner: {
                                  ...owner,
                                  surname: e.target.value
                                },
                              })
                            }}
                        />
                      </FormGroup>

                      <label>Phone</label>
                      <FormGroup>
                        <Input
                            type="number"
                            value={owner.phone}
                            onChange={e => {
                              handleChange({
                                ...values,
                                owner: {
                                  ...owner,
                                  phone: +e.target.value
                                },
                              })
                            }}
                        />
                      </FormGroup>

                      <label>Email</label>
                      <FormGroup>
                        <Input
                            type="email"
                            value={owner.email}
                            onChange={e => {
                              handleChange({
                                ...values,
                                owner: {
                                  ...owner,
                                  email: e.target.value
                                },
                              })
                            }}
                        />
                      </FormGroup>

                      {/*<label>ID</label>*/}
                      {/*<FormGroup>*/}
                      {/*  <Input*/}
                      {/*      type="number"*/}
                      {/*      value={owner.id}*/}
                      {/*      onChange={e => {*/}
                      {/*        handleChange({*/}
                      {/*          ...values,*/}
                      {/*          owner: {*/}
                      {/*            ...owner,*/}
                      {/*            id: +e.target.value*/}
                      {/*          },*/}
                      {/*        })*/}
                      {/*      }}*/}
                      {/*  />*/}
                      {/*</FormGroup>*/}
                    </Col>

                    <Col>
                    <CardTitle>SubUser 1 SECOND ATTACHED PERSON</CardTitle>
                      <label>Name</label>
                      <FormGroup>
                        <Input
                            type="text"
                            value={secondAttachedPerson.name}
                            onChange={e => {
                              handleChange({
                                ...values,
                                secondAttachedPerson: {
                                  ...secondAttachedPerson,
                                  name: e.target.value
                                },
                              })
                            }}
                        />
                      </FormGroup>

                      <label>Surname</label>
                      <FormGroup>
                        <Input
                            type="text"
                            value={secondAttachedPerson.surname}
                            onChange={e => {
                              handleChange({
                                ...values,
                                secondAttachedPerson: {
                                  ...secondAttachedPerson,
                                  surname: e.target.value
                                },
                              })
                            }}
                        />
                      </FormGroup>

                      <label>Phone</label>
                      <FormGroup>
                        <Input
                            type="number"
                            value={secondAttachedPerson.phone}
                            onChange={e => {
                              handleChange({
                                ...values,
                                secondAttachedPerson: {
                                  ...secondAttachedPerson,
                                  phone: +e.target.value
                                },
                              })
                            }}
                        />
                      </FormGroup>

                      <label>Email</label>
                      <FormGroup>
                        <Input
                            type="email"
                            value={secondAttachedPerson.email}
                            onChange={e => {
                              handleChange({
                                ...values,
                                secondAttachedPerson: {
                                  ...secondAttachedPerson,
                                  email: e.target.value
                                },
                              })
                            }}
                        />
                      </FormGroup>

                      {/*<label>ID</label>*/}
                      {/*<FormGroup>*/}
                      {/*  <Input*/}
                      {/*      type="email"*/}
                      {/*      value={secondAttachedPerson.id}*/}
                      {/*      onChange={e => {*/}
                      {/*        handleChange({*/}
                      {/*          ...values,*/}
                      {/*          secondAttachedPerson: {*/}
                      {/*            ...secondAttachedPerson,*/}
                      {/*            id: +e.target.value*/}
                      {/*          },*/}
                      {/*        })*/}
                      {/*      }}*/}
                      {/*  />*/}
                      {/*</FormGroup>*/}
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                    className="btn-fill"
                    color="primary"
                    type="submit" onClick={handleSave}
                >
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditForm;
