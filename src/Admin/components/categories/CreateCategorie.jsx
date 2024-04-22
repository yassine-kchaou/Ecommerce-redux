import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { addCategorie } from "../../../services/CategorieService";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { Grid } from "@mui/material";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const CreateCategorie = () => {
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);

  const [categorie, setCategorie] = useState({
    handleDelete: "",
    imagecategorie: "",
  });

  const handlechange = (e) => {
    setCategorie({ ...categorie, [e.target.name]: e.target.value });
  };
  const addcategorie = (newproduit) => {
    setCategorie([newproduit, ...categorie]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      //faire le add dans la BD
      addCategorie(categorie)
        .then((res) => {
          addcategorie(res.data);
          handleReset();
          setValidated(false);
        })
        .catch((error) => {
          console.log(error);
          alert("Erreur ! Insertion non effectuée");
        });
    }
    setValidated(true);
  };
  const handleReset = () => {
    setCategorie({});
    handleClose();
  };
  // server options
  const serverOptions = () => {
    console.log("server pond");
    return {
      load: (source, load, error, progress, abort, headers) => {
        var myRequest = new Request(source);
        fetch(myRequest).then(function (response) {
          response.blob().then(function (myBlob) {
            load(myBlob);
          });
        });
      },
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "firstuse");
        data.append("cloud_name", "dliykgknn");
        data.append("public_id", file.name);
console.log("wsol post")
        axios.post("https://api.cloudinary.com/v1_1/dliykgknn/image/upload", data)

          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setCategorie({ ...categorie, imagecategorie: data.url });
            load(data);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            error("Upload failed");
            abort();
          });
      },
    };
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-outline-danger">
        <div className="container-fluid">
          <Button
            onClick={handleShow}
            variant="outline-dark"
            style={{ float: "left", margin: 10, left: 10, fontFamily: "Arial" }}
          >
            <i class="fa-solid fa-plus fa-bounce"></i>
            &nbsp; Nouveau
          </Button>
        </div>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <h2>Create categorie</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="container w-100 d-flex justify-content-center">
              <div>
                <div className="form mt-3">
                  <Row className="mb-2">
                    <Form.Group as={Col} md="6">
                      <Form.Label>Nom *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="Nom"
                        placeholder="Nom"
                        value={categorie.nomcategorie}
                        onChange={(e) => handlechange(e)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Saisir Nom
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Grid item xs={12}>
                    <FilePond
                      files={file}
                      allowMultiple={false}
                      onupdatefiles={setFile}
                      labelIdle='<span className="filepond--label-action">BrowseOne</span>'
                      server={serverOptions()}
                    />
                  </Grid>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Enregistrer</Button>
            <Button
              type="button"
              className="btn btn-warning"
              onClick={() => handleReset()}
            >
              Annuler
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateCategorie;
