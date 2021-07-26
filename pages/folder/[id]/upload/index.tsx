import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import Modal from "../../../../Components/Modal";
import Template from "../../../../Components/Template";

const index = () => {
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const router = useRouter();

  const uploadImg = async (event: FormEvent<HTMLFormElement>) => {};

  return (
    <>
      <Template title="Upload Image" />
      <Modal returnURL={`/folder/${router.query.id}`} shouldCloseModal={closeModal}>
        <form className="modal-inner-main" onSubmit={uploadImg}>
          <h3>Create New Folder</h3>
          <div className="create-modal-container">
            <div className="actions">
              <button type="button" onClick={() => setCloseModal(true)}>
                Close
              </button>
              <button type="submit" disabled={true}>
                Save Folder
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default index;
