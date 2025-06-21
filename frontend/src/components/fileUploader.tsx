import { ChangeEvent, useState } from "react";

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
        if (e.target.files[0].name !== "index.html") {
            console.log("Not html file!!!")
        }
        await setFile(e.target.files[0]);
        console.log(e.target.files[0]);
    }
  }
  return (
    <div>
      <input type="file" onChange={(e)=>{handleFileChange(e);    console.log("file",file);}} />
    </div>
  );
}
