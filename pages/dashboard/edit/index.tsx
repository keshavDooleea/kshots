import Modal from "../../../Components/Modal";
import { FormEvent, useEffect, useState } from "react";
import Folder from "../../../Components/Folder";
import { GET, PUT } from "../../../utils/lib/http";
import { IDBFolder } from "../../../utils/lib/intefaces";
import { useRouter } from "next/router";
import Colors from "../../../Components/Colors";
import Error from "../../../Components/Error";
import { isOnlyNumber } from "../../../utils/lib/config";
import Template from "../../../Components/Template";

export default function Edit() {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [closeModal, setCloseModal] = useState<boolean>(false);

  const [initialFolder, setInitialFolder] = useState<IDBFolder>();
  const [folder, setFolder] = useState<IDBFolder>();

  const router = useRouter();

  //   useAuthRedirect();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;

    const fetchFolder = async () => {
      if (isOnlyNumber(id as string)) {
        setError("Sorry, id parameter can only be an integer!");
        return;
      }

      const response = await GET(`folder/${id}`);

      if (response.code === 404) {
        setError("Sadly, this folder does not exist!");
        return;
      }

      if (response.code === 500) {
        setError("An error occured while fetching data");
        return;
      }

      if (response.code === 200) {
        setInitialFolder(response.data as IDBFolder);
        setFolder(response.data as IDBFolder);

        return;
      }
    };

    fetchFolder();
  }, [router.isReady]);

  useEffect(() => {
    if (folder) {
      setFolder({ ...folder, color: selectedColor } as IDBFolder);
    }
  }, [selectedColor, setSelectedColor]);

  const hasFolderBeenUpdated = (): boolean => {
    return folder?.color !== initialFolder?.color || folder?.islock !== initialFolder?.islock || folder?.name !== initialFolder?.name;
  };

  const saveEditFolder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (folder?.name.length === 0) return;

    let updatedFolder: IDBFolder = folder as IDBFolder;

    if (!hasFolderBeenUpdated()) {
      console.log("Please update a value");
      return;
    }

    if (folder?.color !== initialFolder?.color) {
      updatedFolder.color = folder?.color as string;
    }

    if (folder?.name !== initialFolder?.name) {
      updatedFolder.name = folder?.name as string;
    }

    if (folder?.islock !== initialFolder?.islock) {
      updatedFolder.islock = folder?.islock as boolean;
    }

    const { code, message } = await PUT(`folder/${updatedFolder.id}`, updatedFolder);

    if (code === 200) router.push("/dashboard");

    if (code === 500) {
      setError(message);
    }
  };

  return (
    <>
      <Template title="Edit Folder" />
      <Modal returnURL="/dashboard" shouldCloseModal={closeModal}>
        <>
          {folder && !error && (
            <form className="modal-inner-main" onSubmit={saveEditFolder}>
              <h3>Edit Folder</h3>
              <div className="create-modal-container">
                <Colors selectedColor={folder?.color as string} setSelectedColor={setSelectedColor} />
                <main>
                  <Folder color={folder?.color as string}>
                    <input type="text" maxLength={20} onChange={(e) => setFolder({ ...folder, name: e.target.value } as IDBFolder)} placeholder="Name Your Folder" spellCheck="false" value={folder?.name} />
                    <div className="folder-lock">
                      <p>Lock Folder</p>
                      <div>
                        <input type="checkbox" id="lockFolderCheckbox" checked={folder.islock} onChange={() => setFolder({ ...folder, islock: !folder?.islock } as IDBFolder)} />
                        <label htmlFor="lockFolderCheckbox" id="lockFolderLabel" data-checked="Yes" data-unchecked="No"></label>
                      </div>
                    </div>
                  </Folder>
                </main>
                <div className="actions">
                  <button type="button" onClick={() => setCloseModal(true)}>
                    Close
                  </button>
                  <button type="submit" disabled={folder?.name.length === 0}>
                    Update Folder
                  </button>
                </div>
              </div>
            </form>
          )}

          {error && <Error message={error} returnURL="/dashboard" />}
        </>
      </Modal>
    </>
  );
}
