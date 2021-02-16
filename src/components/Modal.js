import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function (props) {
    const { show } = props;
    const [close, setClose] = useState(false);

    return (
        <Modal
            show={show}
            animation={false}
            backdrop="static"
            keyboard={false}
            dialogClassName="alertDialog"
        >
            <Modal.Body className="">
                <div className="modal-close" onClick={props.close}>
                    <i className="fa fa-close" />
                </div>
                {props.children}
            </Modal.Body>
        </Modal>
    )
}