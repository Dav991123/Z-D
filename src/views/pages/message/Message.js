import React, {useEffect, useState} from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import useFetch from "../../../core/useFetch";
import './Message.scss';

const Message = () => {
    const [loading, setLoading] = useState(false);
    const [editMessage, setEditMessage] = useState(false);
    const [messageData, setMessageData] = useState([]);
    const [isOpen, setIsOpen] = useState(null);
    const { get } = useFetch(`message`);

    useEffect(() => {
        setLoading(true)
        get().then(data => {
            setLoading(false)
            setMessageData(data)
        })
    }, []);

    if(loading) {
        return (
            <div>
                Loading....
            </div>
        )
    }
    const toggle = (id) => {
        setIsOpen(id)
    }
    return (
        <div className="content">
           <div className={'message-content'}>
               {
                   messageData.map(item => {
                       return (
                           <div key={item.id}>
                               <div className={'message-button-content'}>
                                   <Button
                                       outline
                                       color="success"
                                       onClick={() => {
                                           toggle(item.id)

                                           if(item.id === isOpen) {
                                               toggle(null)
                                           }
                                       }} style={{ marginBottom: '1rem' }}
                                       className={'search-content-button'}
                                   >
                                       <span>
                                          {item.subject}
                                       </span>

                                       {/*icon-minimal-down*/}
                                       {/*icon-minimal-up*/}
                                       <span className={'message-button-icon'}>
                                           <i className={`tim-icons  ${isOpen === item.id ? 'icon-minimal-down': 'icon-minimal-up'}`} />
                                       </span>
                                   </Button>

                                   <Button size="sm" onClick={() => setEditMessage(item.id)}>
                                       <i className={"tim-icons icon-pencil"} />
                                   </Button>
                               </div>

                               <Collapse isOpen={isOpen === item.id}>
                                   <Card>
                                       <CardBody>
                                           <p className={'message-content'}>
                                               {
                                                   item.content
                                               }
                                           </p>
                                       </CardBody>
                                   </Card>
                               </Collapse>
                           </div>
                       )
                   })
               }
           </div>
        </div>
    )
};

export default Message;