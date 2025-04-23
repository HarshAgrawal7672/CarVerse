import Header from "@/components/Header";
import React from "react";
import Mylisting from "./components/Mylisting";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Index() {
  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <Tabs defaultValue="my-listing" className="w-full">
          <TabsList className=" w-full flex justify-start">
            <TabsTrigger value="my-listing">My Listing</TabsTrigger>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="my-listing" className="my-6">
          <Mylisting /> 
            
          </TabsContent>
          <TabsContent value="inbox">inboc tab.</TabsContent>
          <TabsContent value="profile">profile tab.</TabsContent>
        </Tabs>

      </div>
    </div>
  );
}

export default Index;
