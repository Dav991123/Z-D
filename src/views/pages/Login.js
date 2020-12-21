import React, { useContext, useState, useEffect } from "react";
import classnames from "classnames";
import AdminContext from '../../context/adminContext';
import { useForm } from '../../Hooks/useForm';
import { withRouter, Redirect } from 'react-router-dom';
import Loading from '../../components/loading';
import { authLogin } from '../../authLogin/auth';
import useSessionStorage from '../../core/useSessionStorage';

import './login.css';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

const Login = ({history}) => {
  const [credentials] = useSessionStorage('userData');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { values, handleChange } = useForm(
    {
      login: '',
      password: ''
    },
    {}
  )

  const [inputFocus, setInputFocus] = useState('')
  const { dispatch } = useContext(AdminContext);
 
  useEffect(() => {
    document.body.classList.toggle("login-page");
  }, [])

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await authLogin(values);
    if(response.ok) {
      dispatch({
        type: 'SET_IS_AUTH',
        payload: true
      })

      if(credentials){
        history.push('/admin/dashboard')
      }

      window.sessionStorage.setItem('userData', JSON.stringify(values));
    }else {
      setIsLoading(false);
      setError('Wrong Login Password')
    }
  };

    return (
      <>
        <div className="content login-content">
          <Container>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form className="form">
                <Card className="card-login card-white">
                  <CardHeader>
                    <img
                      alt="..."
                      src={require("assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h1">Log in</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": inputFocus === 'login',
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Login"
                        type="text"
                        name={'login'}
                        onFocus={(e) => {
                          setInputFocus('login')
                        }}
                        onBlur={(e) => {
                          setInputFocus('')
                        }}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": inputFocus === 'password'
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        onFocus={(e) => {
                          setInputFocus('password')
                        }}
                        onBlur={(e) => {
                          setInputFocus('')
                        }}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <div className={'login-error-message'}>
                      <span>{error}</span>
                    </div>
                  </CardBody>
                  {
                    isLoading ? (
                      <Loading />
                    ): (
                      <CardFooter>
                      <Button
                        block
                        className="mb-3"
                        color="primary"
                        onClick={handleLogin}
                        size="lg"
                      >
                        Login
                      </Button>
                    </CardFooter>
                    )
                  }
         
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      </>
    );
  }


export default withRouter(Login);
