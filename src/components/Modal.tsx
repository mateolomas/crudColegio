import { ReactChildren, ReactComponentElement, ReactElement, useState } from "react";

import styles from "../styles/modal.module.css";
import buttonstyle from "../styles/button.module.css";


interface ModalProps {
  children: ReactElement
  isOpenModal: boolean
  handleModalClose: () => void
}

function Modal({children, isOpenModal, handleModalClose}: ModalProps) {

  
  
  return (
    <>
      <div className="modal-container">
        {isOpenModal && (
          <div className={styles.modal}>
            <div onClick={handleModalClose} className={styles.overlay}></div>
            <div className={styles.modal_content}>
              <div className={styles.modal_wrapper}>
                <div className={styles.modal_header}>
                </div>
                <div className={styles.modal_body}>
                  <div className="modal-body-info">
                    {children}
                  </div>
                </div>
              </div>
              <button className={styles.close_modal} onClick={handleModalClose}>
                CLOSE
              </button>
            </div>
          </div>

        )}
      </div>
      
    </>
  );
}

export default Modal;