import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement( '#root' );

const ModalBox = ( props ) =>
{
    return (
        <div>
            <Modal
                isOpen={ props.isOpen }
                shouldCloseOnEsc={ false }
                shouldCloseOnOverlayClick={ false }
                style={
                    {
                        overlay: {
                            background: 'grey'
                        },
                        content: {
                            width: '50%',
                            height: '50%',
                            top: '25%',
                            left: '25%'
                        }
                    }
                }
            >
                <h1 className="ModalHeader">{ props.h1Text }</h1>
                <form>
                    <div>
                        <label for={ props.minInputId } className="ModalLabel">{ props.minLabel }</label>
                        <input className="ModalInput" type="number" id={ props.minInputId }></input>
                        <br></br>
                        <br></br>
                        <label for={ props.maxInputId } className="ModalLabel">{ props.maxLabel }</label>
                        <input className="ModalInput" type="number" id={ props.maxInputId } ></input>

                    </div>
                </form>
                <br></br>
                <div>
                    <button className="ModalButton" onClick={ props.Submit }>Submit</button>
                    <button className="ModalButton" onClick={ props.Close }>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default ModalBox;