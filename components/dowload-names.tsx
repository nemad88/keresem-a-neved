"use client";
import { Button } from "@/components/ui/button";
import { saveNames, uploadToDb } from "@/lib/seed";

const DownloadNames = () => {
  return (
    <div>
      <Button
        onClick={() => {
          saveNames("male");
        }}
      >
        Download Male data
      </Button>
      <Button
        onClick={() => {
          saveNames("female");
        }}
      >
        Download Female data
      </Button>
      <Button
        onClick={() => {
          uploadToDb("female");
        }}
      >
        Upload Female data
      </Button>
      <Button
        onClick={() => {
          uploadToDb("male");
        }}
      >
        Upload Male data
      </Button>
    </div>
  );
};

export default DownloadNames;
