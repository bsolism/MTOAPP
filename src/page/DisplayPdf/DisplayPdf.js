import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { Stack, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { apiCamera, apiServer, apiDataSheet } from "../../services";
import { toast } from "react-toastify";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import "./DisplayPdf.scss";

const Input = styled("input")({
  display: "none",
});
export default function DisplayPdf({ item, type }) {
  const [numPage, setNumPage] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPage(numPages);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await apiDataSheet.GetDataSheet(item[0].id).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setFile(apiDataSheet.GetPdf(res.data.dataSheetName));
      }
    });
  };

  const handleChange = ({ target }) => {
    const fileReader = new FileReader();
    const name = target.accept.includes("PDF") ? "pdf" : "image";

    fileReader.readAsDataURL(target.files[0]);

    setFile(target.files[0]);
  };

  const handleSave = async () => {
    const data = {
      dataSheetName: item[0].model,
      deviceId: item[0].id,
      file: file,
    };
    console.log(data);
    await apiDataSheet.PostFile(data).then((res) => {
      console.log(res);
      if (res.status === 200) {
        toast("Saved");
      }
    });
  };

  const goToPrevPag = () => {
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
  };
  const goToNextPag = () => {
    setPageNumber(pageNumber + 1 >= numPage ? numPage : pageNumber + 1);
  };
  return (
    <div className="content-pdf">
      <div className="content-button">
        <Stack spacing={2} direction="row">
          <label htmlFor="contained-button-file">
            <Input
              accept="PDF/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleChange}
            />

            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
          <Button variant="outlined" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </div>
      {file != null ? (
        <>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} scale={1.5} />
          </Document>
          <p>
            Page {pageNumber} of {numPage}
          </p>
          <IconButton aria-label="refresh" onClick={goToPrevPag}>
            <ArrowBackIos />
          </IconButton>
          <IconButton aria-label="refresh" onClick={goToNextPag}>
            <ArrowForwardIos />
          </IconButton>
        </>
      ) : null}
    </div>
  );
}
