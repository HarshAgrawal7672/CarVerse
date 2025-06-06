import React from "react";
import logo from "../assets/logo.png";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="flex justify-between items-center shadow-sm ">
      <Link to="/">
      <img src={logo} width={100} height={50} alt="" />
      </Link>
      <ul className=" hidden md:flex gap-16">
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Home
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          {" "}
          Search
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          New
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Preowned
        </li>
      </ul>
      {isSignedIn ? (
        <div className=" flex items-center gap-5">
          <UserButton />
          <Link to="/profile">
            <Button>Submit Listing</Button>
          </Link>
        </div>
      ) : (
        <SignInButton mode="modal" forceRedirectUrl="/">
          <Button>Sign in</Button>
        </SignInButton>
      )}
    </div>
  );
}

export default Header;
