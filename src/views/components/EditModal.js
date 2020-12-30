import React, {useEffect, useState} from "react";
import { Modal, Container, Row, Col, Button } from "react-bootstrap";

import EditForm from "./edit-form";
import useFetch from "../../core/useFetch";

const cardUserDataModel = {
  id: 0,
  email: '',
  name: '',
  phone: '',
  surname: ''
}

const EditModal = ({selectedRow, onRefreshPage, ...restProps}) => {
  const { get } = useFetch("code");
  const [ codeType, setCodeType ] = useState('DESC')

  const [codeData, setCodeData] = useState([])
  const [selectedCode, setSelectedCode] = useState('')
  const { put } = useFetch(`card`);
  const [values, setValues] = useState({
    firstAttachedPerson: cardUserDataModel,
    owner: cardUserDataModel,
    secondAttachedPerson: cardUserDataModel
  })

  useEffect(() => {

    get(`?attached=false&page=0&size=10&sort=type,${codeType}`).then((data) => {
      setCodeData(data.content)
    })
  }, [codeType]);

  useEffect(() => {
    const { pink, ...selectedData } = selectedRow;
    if(selectedRow) {
      setValues({...selectedData})
    }
  }, [selectedRow]);


  const editCard = () => {
    put(selectedRow.pin, values).then(resp => {
      console.log(resp, 'resp')
      restProps.onHide();
      onRefreshPage()
    })
  };

  return (
    <Modal
      {...restProps}
      size="lg"
      aria-labelledby="contained-modal-title"
      dialogClassName="edit-modal"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">
          <h5 className="title text-white">Edit Profile</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          Object.values(values).length && (
              <EditForm
                  values={values}
                  codeType={codeType}
                  setCodeType={setCodeType}
                  codeData={codeData}
                  handleSave={editCard}
                  handleChange={setValues}
                  selectedCode={selectedCode}
                  setSelectedCode={setSelectedCode}
              />
          )
        }
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
