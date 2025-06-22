import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import { Loader } from "./loader";

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("File updated:", file);
  }, [file]);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      if (e.target.files[0].name !== "index.html") {
        console.log("Not html file!!!");
      }
      setFile(e.target.files[0]);
    }
  }

  async function handleFileUpload(e: FormEvent<HTMLFormElement>) {
    
    if (!file) return;
    e.preventDefault();
    const formData = new FormData();
    if (!formData) return;
    setIsLoading(true)
    try {
      let response = await fetch("/files/upload/", {
        method: "post",
        body: formData,
      });
      if (!response.ok) {
        console.log("error");
      }
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }
  if (isLoading) {
    return <Loader/>
  }
  return (
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
  );
}
