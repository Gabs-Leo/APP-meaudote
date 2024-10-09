import axios, { AxiosRequestConfig } from "axios";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  children: React.ReactNode;
  postUrl: string;
  options?: AxiosRequestConfig;
  then: () => void;
}

export const Dropzone = (props: DropzoneProps) => {
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
          console.log("success");

          props.then();
        })
        .catch((i) => {
          console.log(i);
        });
    },
    [props],
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div style={{ cursor: `pointer` }} {...getRootProps()}>
      <input {...getInputProps()} />
      {props.children}
    </div>
  );
};
