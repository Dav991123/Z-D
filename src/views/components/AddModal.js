import React, {useEffect, useState} from 'react';
import { Modal, Container, Row, Col, Button} from "react-bootstrap";
import useFetch from '../../core/useFetch';
import EditForm from "./edit-form";
import useQuery from "../../Hooks/useQuery";
const cardUserDataModel = {
    id: '',
    email: '',
    name: '',
    phone: '',
    surname: ''
}

//  asc desc
// type = sort

const AddModal = ({onRefreshPage, ...restProps}) => {
    const { get } = useFetch("code");
    const [codeData, setCodeData] = useState([]);
    const [ codeType, setCodeType ] = useState('DESC')
    const [selectedCode, setSelectedCode] = useState('')
    const { post } = useFetch(`card/${selectedCode.value}`);

    const [values, setValues] = useState({
        firstAttachedPerson: cardUserDataModel,
        owner: cardUserDataModel,
        secondAttachedPerson: cardUserDataModel
    })


    const addCard = () => {
        post(values).then(resp => {
            restProps.onHide();
            onRefreshPage();
        })
    }

    useEffect(() => {
        get(`?attached=false&page=0&size=10&sort=type,${codeType}`).then((data) => {
            setCodeData(data.content)
        })
    }, [codeType]);

    console.log(codeType)

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
                    <h5 className="title text-white">ADD CARD</h5>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
               
                <EditForm
                    values={values}
                    codeType={codeType}
                    setCodeType={setCodeType}
                    codeData={codeData}
                    handleSave={addCard}
                    handleChange={setValues}
                    selectedCode={selectedCode}
                    setSelectedCode={setSelectedCode}
                />
            </Modal.Body>
        </Modal>
    )
};

export default AddModal;