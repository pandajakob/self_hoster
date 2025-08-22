import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import { Loader } from "./loader";

interface FileStats {
  name: string;
  dateCreated: string;
  size: number;
}

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<FileStats>>([]);


  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      if (e.target.files[0].name !== "index.html") {
        console.log("Not html file!!!");
      }
      setFile(e.target.files[0]);
    }
  }
  async function getFiles() {
    try {
      const response = await fetch("/files");
      if (!response.ok && response.status != 400) {
        alert(`Error getting all files: ${response.status}`);
        return;
      }
      if (response.status == 400 ) {
        return;
      }
      
      let data = await response.json();

      setUploadedFiles(data);

    } catch(error) {
      alert(error);
    }
  }

  async function handleFileUpload(e: FormEvent<HTMLFormElement>) {
    if (!file) return;
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    if (!formData) return;
    setIsLoading(true);
    try {
      const response = await fetch("/files/upload", {
        method: "post",
        body: formData,
      });
      if (!response.ok) {
        console.log("error");
        alert(`Error uploading file: ${response.statusText}`);
        return;
      }
      let data = await response.json();
      console.log(data);
      await getFiles();

    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
      getFiles()
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <article>
        <input type="file" name="file" onChange={handleFileChange} />
        {file && (
          <form onSubmit={handleFileUpload}>
            <h2> {file.name}</h2>
            <p> Name: {file.name}</p>
            <p> Size: {file.size}</p>
            <p> Type: {file.type}</p>
            <input type="submit" value="upload" />
          </form>
        )}
      </article>
      <h2> Uploaded files: </h2>

      {Array.from(uploadedFiles).map((file, i) => (
        <article>
          <strong>
            <p key={i}>{file.name}</p>
          </strong>
          <p key={i}>{file.size} bytes </p>
        </article>
      ))}
    </div>
  );
}
