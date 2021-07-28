import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IDBFolder, IDBImage } from "../../../../../../utils/lib/intefaces";
import { getDate, getDecodedBase64, isOnlyNumber } from "../../../../../../utils/lib/config";
import { DELETE, GET } from "../../../../../../utils/lib/http";
import Template from "../../../../../../Components/Template";
import Modal from "../../../../../../Components/Modal";
import Error from "../../../../../../Components/Error";

const Delete = () => {
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [returnURL, setReturnURL] = useState<string>("");
  const [folder, setFolder] = useState<IDBFolder>();
  const [image, setImage] = useState<IDBImage>();

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { id, imageId } = router.query;

    if (isOnlyNumber(id as string)) {
      setError(`Sorry! Folder with id "${id}" can not exist!`);
      setReturnURL("/dashboard");
      return;
    }

    if (isOnlyNumber(imageId as string)) {
      setError(`Sorry! Image with id "${imageId}" can not exist!`);
      setReturnURL(`/folder/${id}`);
      return;
    }

    const fetchImage = async () => {
      const { code, message, data } = await GET<IDBImage>(`folder/${id}/image/${imageId}`);

      if (code === 200) {
        setError("");
        setImage(data);
      } else {
        setError(message);
        setReturnURL(`/dashboard`);
      }
    };

    const fetchFolder = async () => {
      const { code, message, data } = await GET<IDBFolder>(`folder/${id}`);

      if (code === 200) {
        setFolder(data);
        setReturnURL(`/folder/${id}/image/${imageId}`);
        return;
      }

      setReturnURL(`/dashboard`);
      setError(message);
    };

    fetchImage();
    fetchFolder();
  }, [router.isReady]);

  const deleteFolder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { code, message } = await DELETE(`folder/${router.query.id}/image/${router.query.imageId}`);
    setReturnURL(`/folder/${router.query.id}`);

    code === 200 ? setCloseModal(true) : setError(message);
  };

  return (
    <>
      <Template title="Delete Image" hideBreak={true} customBgColor={folder?.color} />
      <Modal returnURL={returnURL} shouldCloseModal={closeModal}>
        <>
          {!error && image && folder && (
            <form className="modal-inner-main" onSubmit={deleteFolder}>
              <h3>Delete Image</h3>
              <div className="delete-modal-container">
                <div className="center">
                  <p>Are you sure you want to delete the following image?</p>

                  <h4>
                    {image?.title && (
                      <>
                        {image.title} <span className="from">from</span> &nbsp;
                      </>
                    )}
                    <FontAwesomeIcon className="icon" icon={faFolder} style={{ color: folder?.color }} />
                    <span className="folder-name">{folder?.name}</span>
                  </h4>
                  <img src={getDecodedBase64(image?.src as string)} alt="Image to be deleted" className="deleted-img" />

                  <small>Created on {getDate(folder?.createdat as Date)}</small>
                </div>

                <div className="modal-actions">
                  <button type="button" onClick={() => setCloseModal(true)}>
                    Close
                  </button>

                  <button type="submit" className="delete-btn">
                    Delete Image
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
