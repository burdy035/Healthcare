"use strict";

import documentsControllers from "../controllers/documents";

import checkToken from "../middleware/auth";

import validate from "../middleware/validateFields";

const documentsRoutes = app => {
    app.get(
        "/patient-documents",
        checkToken,
        validate("get", ["id"]),
        documentsControllers.getDocuments
    );

    app.post(
        "/add-document",
        checkToken,
        validate("post", ["id"]),
        documentsControllers.addDocument
    );

    app.get(
        "/get-heart-disease-rate",
        checkToken,
        validate("get", ["id"]),
        documentsControllers.getHeartDiseaseRate
    );

    app.get(
        "/get-document-form",
        checkToken,
        validate("get", ["id"]),
        documentsControllers.getDocumentsForm
    );

    app.post(
        "/edit-document",
        checkToken,
        validate("post", ["id"]),
        documentsControllers.editDocument
    );

    app.post(
        "/delete-documents",
        checkToken,
        validate("post", ["id"]),
        documentsControllers.deleteDocuments
    );
};

export default documentsRoutes;
