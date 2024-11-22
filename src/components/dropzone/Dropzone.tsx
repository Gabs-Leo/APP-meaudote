import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CustomModal } from "../modal/Modal";

interface DropzoneProps {
  children: React.ReactNode;
  postUrl: string;
  options?: AxiosRequestConfig;
  then: () => void;
}

export const Dropzone = (props: DropzoneProps) => {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post(
          props.postUrl,
          formData,
          props.options || {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )
        .then(() => {
          props.then();
        })
        .catch((error) => {
          let errorMsg:string = error.response.data.errors[0];
          errorMsg = errorMsg.replace("file is not allowed, the allowed extensions are", "não é um tipo válido, os tipos de arquivos permitidos são:");
          
          errorMsg = errorMsg.replace("Image size of", "O tamanho da imagem de");
          errorMsg = errorMsg.replace("is higher than the max resolution of", "é maior que o tamanho máximo de");
          setErrorMessage(errorMsg);
          setErrorModalOpen(true);
        });
    },
    [props],
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (<>
    <div style={{ cursor: `pointer` }} {...getRootProps()}>
      <input {...getInputProps()} />
      {props.children}
    </div>
    <CustomModal width={400} onClose={() => setErrorModalOpen(false)} title="Erro!" open={errorModalOpen}>
      {errorMessage}
    </CustomModal>
  </>
  );
};
