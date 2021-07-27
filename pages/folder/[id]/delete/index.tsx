import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import Error from "../../../../Components/Error";
import Modal from "../../../../Components/Modal";
import Template from "../../../../Components/Template";
import { getDate, isOnlyNumber } from "../../../../utils/lib/config";
import { DELETE, GET } from "../../../../utils/lib/http";
import { IDBFolder } from "../../../../utils/lib/intefaces";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Delete = () => {
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [returnURL, setReturnURL] = useState<string>("");
  const [folder, setFolder] = useState<IDBFolder>();

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const id = router.query.id as string;

    if (isOnlyNumber(id as string)) {
      setError("Sorry, folder id can only be an integer!");
      return;
    }

    const fetchColor = async () => {
      const { code, message, data } = await GET<IDBFolder>(`folder/${id}`);

      if (code === 200) {
        setFolder(data);
        setReturnURL(`/folder/${id}`);
        return;
      }

      setReturnURL(`/dashboard`);
      setError(message);
    };

    fetchColor();
  }, [router.isReady]);

  const deleteFolder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { code, message } = await DELETE(`folder/${router.query.id}`);

    if (code === 200) {
      setReturnURL(`/dashboard`);
      setCloseModal(true);
      return;
    }

    setError(message);
  };

  return (
    <>
      <Template title="Delete Folder" hideBreak={true} customBgColor={folder?.color} />
      <Modal returnURL={returnURL} shouldCloseModal={closeModal}>
        <>
          {!error && folder && (
            <form className="modal-inner-main" onSubmit={deleteFolder}>
              <h3>Delete Folder</h3>
              <div className="delete-modal-container">
                <div className="center">
                  <p>Are you sure you want to delete the following folder?</p>

                  <div className="center">
                    <h4>
                      <FontAwesomeIcon className="icon" icon={faFolder} style={{ color: folder?.color }} />
                      <span>{folder?.name}</span>
                    </h4>
                    <small>Created on {getDate(folder?.createdat as Date)}</small>
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" onClick={() => setCloseModal(true)}>
                    Close
                  </button>

                  <button type="submit" className="delete-btn">
                    Delete Folder
                  </button>
                </div>
              </div>
            </form>
          )}

          {error && <Error message={error} returnURL={returnURL} />}
        </>
      </Modal>
    </>
  );
};

export default Delete;
