import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Error from "../../../../Components/Error";
import Modal from "../../../../Components/Modal";
import Template from "../../../../Components/Template";
import { getBase64, isOnlyNumber } from "../../../../utils/lib/config";
import { POST } from "../../../../utils/lib/http";
import { IDBImage } from "../../../../utils/lib/intefaces";

const index = () => {
  const [session, setSession] = useSession();
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [src, setSrc] = useState<string>("");

  let canUpload: boolean = true;

  const router = useRouter();

  useEffect(() => {
    document.body.addEventListener("paste", handlePasteEvent);

    return () => document.body.removeEventListener("paste", handlePasteEvent);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;

    const id = router.query.id as string;

    if (isOnlyNumber(id as string)) {
      setError("Sorry, folder id can only be an integer!");
      return;
    }
  }, [router.isReady]);

  // ctrl + v
  const handlePasteEvent = async (event: ClipboardEvent) => {
    const dataTransfer = event.clipboardData as DataTransfer;

    if (dataTransfer.files.length) {
      const fileImg = dataTransfer.files[0];

      const base64 = (await getBase64(fileImg)) as string;
      setSrc(base64);
    }
  };

  // input file upload
  const handleInputEvent = async (event: ChangeEvent<HTMLInputElement>) => {
    let { files } = event.target as HTMLInputElement;
    files = files as FileList;

    const base64 = (await getBase64(files[0])) as string;
    setSrc(base64);
  };

  const uploadImg = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!src) return;

    const image: IDBImage = {} as IDBImage;
    image.description = description;
    image.folderid = parseInt(router.query.id as string);
    image.src = src;
    image.title = title;

    const { code, message } = await POST("image", image);

    if (code === 200) {
      setCloseModal(true);
      return;
    }

    if (code === 500) {
      setError(message);
    }
  };

  return (
    <>
      <Template title="Upload Image" />
      <Modal returnURL={`/folder/${router.query.id}`} shouldCloseModal={closeModal}>
        <>
          {!error && (
            <form className="modal-inner-main" onSubmit={uploadImg}>
              <h3>Upload Image</h3>
              <div className="upload-image-modal-container">
                <div className="image-container">
                  {src ? (
                    <img src={src} alt="Screenshot image" />
                  ) : (
                    <div className="image-main">
                      <button type="button">
                        <label>
                          Upload image
                          <input type="file" style={{ display: "none" }} onChange={handleInputEvent} />
                        </label>
                      </button>
                      <small>or</small>
                      <p>Ctrl + V to paste screenshot</p>
                    </div>
                  )}
                </div>
                <main>
                  <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" maxLength={30} placeholder="Optional" onChange={(e) => setTitle(e.target.value)} />
                  </div>

                  <div>
                    <label htmlFor="desc">Description</label>
                    <textarea id="desc" placeholder="Write something related to your screenshot (Optional)" onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </main>
                <div className="modal-actions">
                  <button type="button" onClick={() => setCloseModal(true)}>
                    Close
                  </button>
                  <button type="submit" disabled={!src} onClick={() => setSrc("")}>
                    Clear Image
                  </button>
                  <button type="submit" disabled={!src}>
                    Save Image
                  </button>
                </div>
              </div>
            </form>
          )}

          {error && <Error message={error} returnURL={`/folder/${router.query.id}`} />}
        </>
      </Modal>
    </>
  );
};

export default index;
