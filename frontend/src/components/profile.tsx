import { useEffect, useState } from "react";
import { Loader } from "./loader";
interface User {
  name: string;
  email: string;
  id: string;
  // any other fields you return…
}
export function Profile() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getUserInfo() {
    setLoading(true);

    try {
      let response = await fetch("/users/");
      if (!response.ok) {
        return;
      }
      let data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);
  
  if (loading) {
    return <Loader />;
  }
  return (
    <article>
      <h1> profile </h1>
      <p> Email: {userInfo?.email} </p>
            <p> Name: {userInfo?.name} </p>

            <p> id: {userInfo?.id} </p>

    </article>
  );
}
