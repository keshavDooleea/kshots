import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Error from "../../../../Components/Error";
import Modal from "../../../../Components/Modal";
import Template from "../../../../Components/Template";
import { getBase64, getDecodedBase64, isOnlyNumber } from "../../../../utils/lib/config";
import { GET, POST, PUT } from "../../../../utils/lib/http";
import { IDBImage } from "../../../../utils/lib/intefaces";

interface IFolderColor {
  color: string;
}

const Upload = () => {
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [initialImage, setTnitialImage] = useState<IDBImage>(); // to compare for /edit
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [src, setSrc] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    document.body.addEventListener("paste", handlePasteEvent);
    return () => document.body.removeEventListener("paste", handlePasteEvent);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;

    const { id, imageId } = router.query;

    if (isOnlyNumber(id as string)) {
      setError(`Sorry! Folder with id "${id}" can not exist!`);
      return;
    }

    const fetchColor = async () => {
      const response = await GET<IFolderColor>(`folder/${id}/color`);

      if ((response.code as number) === 200) {
        setColor((response.data as IFolderColor).color);
      }
    };

    const fetchImage = async () => {
      const { code, message, data } = await GET<IDBImage>(`folder/${id}/image/${imageId}`);

      if (code === 200) {
        setError("");
        setSrc(getDecodedBase64(data?.src as string));
        setTitle(data?.title as string);
        setDescription(data?.description as string);
        setTnitialImage(data);
      } else {
        setError(message);
      }
    };

    if (imageId) {
      setIsEdit(true);

      if (isOnlyNumber(imageId as string)) {
        setError(`Sorry! Image with id "${imageId}" can not exist!`);
        return;
      }

      fetchImage();
    }

    fetchColor();
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

  // compare image before updating
  const hasImageBeenUpdated = (finalImage: IDBImage) => finalImage.title !== initialImage?.title || finalImage.description !== initialImage?.description || finalImage.src !== getDecodedBase64((initialImage as IDBImage).src);

  const uploadImg = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!src) return;

    const finalImage: IDBImage = {} as IDBImage;
    finalImage.description = description;
    finalImage.folderid = parseInt(router.query.id as string);
    finalImage.src = src;
    finalImage.title = title;

    if (isEdit && !hasImageBeenUpdated(finalImage)) {
      console.log("Image needs to be different in order to update");
      return;
    }

    const { code, message } = isEdit ? await PUT(`folder/${router.query.id}/image/${router.query.imageId}`, finalImage) : await POST("image", finalImage);
    code === 200 ? setCloseModal(true) : setError(message);
  };

  return (
    <>
      <Template title="Upload Image" hideBreak={true} customBgColor={color} />
      <Modal returnURL={isEdit ? `/folder/${router.query.id}/image/${router.query.imageId}` : `/folder/${router.query.id}`} shouldCloseModal={closeModal}>
        <>
          {!error && color && (
            <form className="modal-inner-main" onSubmit={uploadImg}>
              <h3>{isEdit ? "Edit Image" : "Upload Image"}</h3>
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
                    <input type="text" id="title" maxLength={30} placeholder="Optional" onChange={(e) => setTitle(e.target.value)} value={title} />
                  </div>

                  <div>
                    <label htmlFor="desc">Description</label>
                    <textarea id="desc" placeholder="Write something related to your screenshot (Optional)" onChange={(e) => setDescription(e.target.value)} value={description} />
                  </div>
                </main>
                <div className="modal-actions">
                  <button type="button" onClick={() => setCloseModal(true)}>
                    Close
                  </button>
                  <button type="button" disabled={!src} onClick={() => setSrc("")}>
                    Clear Image
                  </button>
                  <button type="submit" disabled={!src}>
                    {isEdit ? "Update Image" : "Save Image"}
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

export default Upload;
