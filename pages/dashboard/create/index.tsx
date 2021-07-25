import { useSession } from "next-auth/client";
import useAuthRedirect from "../../../utils/hooks/authRedirect";
import Dashboard from "..";
import Modal from "../../../Components/Modal";
import { COLORS } from "../../../utils/lib/config";
import { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Folder from "../../../Components/Folder";

export default function Create() {
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);
  const [folderName, setFolderName] = useState<string>("");
  const [closeModal, setCloseModal] = useState<boolean>(false);

  //   useAuthRedirect();

  return (
    <>
      <Dashboard title="Create Folder"></Dashboard>
      <Modal returnURL="/dashboard" shouldCloseModal={closeModal}>
        <div className="modal-inner-main">
          <h3>Create New Folder</h3>
          <div className="create-modal-container">
            <div className="color-container">
              {COLORS.map((color, index) => (
                <div key={index} style={{ backgroundColor: color }} className="color-main" onClick={() => setSelectedColor(color)}>
                  {selectedColor === color && <FontAwesomeIcon icon={faCheck} className="color-check" />}
                  {selectedColor === color && <div className="color-selected" style={{ borderColor: color }} />}
                </div>
              ))}
            </div>
            <main>
              <input type="text" maxLength={20} onChange={(e) => setFolderName(e.target.value)} placeholder="Name Your Folder" spellCheck="false" />
              <Folder color={selectedColor}></Folder>
            </main>
            <div className="actions">
              <button onClick={() => setCloseModal(true)}>Close</button>
              <button>Save Folder</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
