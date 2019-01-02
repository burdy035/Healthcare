"use strict";

import documentsControllers from "../controllers/documents";

import checkToken from "../middleware/auth";

const documentsRoutes = app => {
    app.get(
        "/patient-documents",
        checkToken,
        documentsControllers.getDocuments
    );

    app.post("/add-document", checkToken, documentsControllers.addDocument);

    app.get(
        "/get-heart-disease-rate",
        checkToken,
        documentsControllers.getHeartDiseaseRate
    );

    app.get(
        "/get-document-form",
        checkToken,
        documentsControllers.getDocumentsForm
    );

    app.post("/edit-document", checkToken, documentsControllers.editDocument);

    app.post(
        "/delete-documents",
        checkToken,
        documentsControllers.deleteDocuments
    );
};

export default documentsRoutes;
