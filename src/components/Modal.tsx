import { useState } from "react";

import styles from "../styles/modal.module.css";
import buttonstyle from "../styles/button.module.css";
import Formulario from "./Form";

function Modal(): any {

  const [modal, setModal] = useState<Boolean>(false);

  return (
    <>
      <div className="modal-container">
        {modal && (
          <div className={styles.modal}>
            <div onClick={() => setModal(!modal)} className={styles.overlay}></div>
            <div className={styles.modal_content}>
              <div className={styles.modal_wrapper}>
                <div className={styles.modal_header}>
                </div>
                <div className={styles.modal_body}>
                  <div className="modal-body-info">
                    <Formulario />
                  </div>

                </div>
              </div>
              <button className={styles.close_modal} onClick={() => setModal(!modal)}>
                CLOSE
              </button>
            </div>
          </div>

        )}
      </div>
      <div className={buttonstyle.button}>
        <button onClick={() => setModal(!modal)}>Agregar</button>

      </div>

    </>
  );
}

export default Modal;