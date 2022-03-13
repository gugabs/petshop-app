import { useCallback, useState } from 'react';
import { LinksFunction } from 'remix';

import componentStyle from '~/components/createSchedule/ImageDropzone/style.css';

import { useDropzone } from 'react-dropzone';

import { BsFillCameraFill } from 'react-icons/bs';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: componentStyle,
    },
  ];
};

export function ImageDropzone(props: any) {
  const { onImageUpload } = props;

  const [selectedImageURL, setSelectedImageURL] = useState<string>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const image: File = acceptedFiles[0];

    const imageURL: string = URL.createObjectURL(image);

    onImageUpload(image);
    setSelectedImageURL(imageURL);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={`dropzone ${selectedImageURL && 'selected'}`} {...getRootProps()}>
      <input {...getInputProps()} />
      {selectedImageURL
        ? renderSelectedImage()
        : isDragActive
        ? renderDropTip()
        : renderDropzoneDescription()}
    </div>
  );

  function renderSelectedImage() {
    return (
      <>
        <img src={selectedImageURL} alt="" />
        <div className="image-cover"></div>
      </>
    );
  }

  function renderDropTip() {
    return <p>Já pode soltar!</p>;
  }

  function renderDropzoneDescription() {
    return (
      <div className="dropzone-description">
        <span>
          <BsFillCameraFill />
        </span>
        <p>Solte uma imagem aqui ou clique para selecioná-la</p>
      </div>
    );
  }
}
