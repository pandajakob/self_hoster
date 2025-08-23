import { useState } from "react";
import { Profile } from "./profile";

interface Props {
  userLoggedIn: boolean,
  onSetUserLoggedIn: (userLoggedIn: Boolean) => void;
    onUpdatePage: (page: string) => void;

}

export function Header( {userLoggedIn, onSetUserLoggedIn, onUpdatePage}:Props) {



  if (userLoggedIn) {
    return (<div className="header">
      <a href="#default" className="logo" onClick={()=>{onUpdatePage("DEFAULT")}}>
        Home
      </a>
      <div className="header-right">

        <a onClick={()=>{onUpdatePage("PROFILE")}}>
          Profile
        </a>

               <a
          onClick={() => {
            fetch("/users/logout", {method: "POST"}).then(()=>{
                      onSetUserLoggedIn(false);
            });
          }}
        >
          Sign out
        </a> 
 
      </div>
      </div>)
  } 
  return <div className="header">
      <a href="#default" className="logo" onClick={()=>{onUpdatePage("DEFAULT")}}>
        CompanyLogo
      </a>
      <div className="header-right">
        <a> Sign in</a>
      </div>
    </div>
}
