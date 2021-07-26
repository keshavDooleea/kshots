import Modal from "../../../Components/Modal";
import { COLORS } from "../../../utils/lib/config";
import { FormEvent, useState } from "react";
import Folder from "../../../Components/Folder";
import { POST } from "../../../utils/lib/http";
import { IFolder } from "../../../utils/lib/intefaces";
import { useRouter } from "next/router";
import Colors from "../../../Components/Colors";
import Template from "../../../Components/Template";

export default function Create() {
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);
  const [folderName, setFolderName] = useState<string>("");
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const [isLock, setIsLock] = useState<boolean>(false);
  const router = useRouter();

  //   useAuthRedirect();

  const saveFolder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (folderName.length === 0) return;

    const folder: IFolder = {
      name: folderName,
      color: selectedColor,
      islock: isLock,
    };

    const { code, message } = await POST("folder", folder);
    if (code === 200) router.push("/dashboard");

    if (code === 500) {
      console.log(message);
    }
  };

  return (
    <>
      <Template title="Create Folder" />
      <Modal returnURL="/dashboard" shouldCloseModal={closeModal}>
        <form className="modal-inner-main" onSubmit={saveFolder}>
          <h3>Create New Folder</h3>
          <div className="create-modal-container">
            <Colors selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
            <main>
              <Folder color={selectedColor}>
                <input type="text" maxLength={20} onChange={(e) => setFolderName(e.target.value)} placeholder="Name Your Folder" spellCheck="false" />
                <div className="folder-lock">
                  <p>Lock Folder</p>
                  <div>
                    <input type="checkbox" id="lockFolderCheckbox" onChange={() => setIsLock(!isLock)} />
                    <label htmlFor="lockFolderCheckbox" id="lockFolderLabel" data-checked="Yes" data-unchecked="No" data-color={selectedColor}></label>
                  </div>
                </div>
              </Folder>
            </main>
            <div className="actions">
              <button type="button" onClick={() => setCloseModal(true)}>
                Close
              </button>
              <button type="submit" disabled={folderName.length === 0}>
                Save Folder
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
