import { useEffect, useState } from "react";
import { Loader } from "./loader";
import { getUserInfo } from "../scripts/apiFunctions";
import { User } from "../types/interfaces";

export function Profile() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getUserInfo().then(setUserInfo).finally(()=>{setLoading(false)});
  }, []);
  
  if (loading) {
  }
  return (
    <article>
      {loading ? <Loader /> : <div/>}
      <h1> profile </h1>
      <p> Email: {userInfo?.email} </p>
            <p> Name: {userInfo?.name} </p>

            <p> id: {userInfo?.id} </p>

    </article>
  );
}
