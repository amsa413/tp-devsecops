
"use strict";

// CyberShield - Vérification de l'état du backend Spring Boot

console.log("CyberShield : JavaScript chargé");

// Mettre à jour l'affichage du statut
function afficherStatut(element, texte, classeCSS) {
    element.textContent = texte;
    element.classList.remove("status-up", "status-down");

    if (classeCSS) {
        element.classList.add(classeCSS);
    }
}

// Vérifier l'état du backend
async function verifierApplication() {
    const statusElement = document.getElementById("app-status");

    if (!statusElement) {
        console.error("CyberShield : élément app-status introuvable");
        return;
    }

    afficherStatut(statusElement, "Vérification...", "");

    try {
        const response = await fetch("/actuator/health", {
            method: "GET",
            cache: "no-store",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Erreur HTTP : " + response.status);
        }

        const data = await response.json();

        console.log("CyberShield : état du backend =", data.status);

        if (data.status === "UP") {
            afficherStatut(statusElement, "UP", "status-up");
        } else {
            afficherStatut(statusElement, "DEGRADED", "status-down");
        }

    } catch (error) {
        console.error("CyberShield : vérification impossible", error);
        afficherStatut(statusElement, "UNAVAILABLE", "status-down");
    }
}

// Exécuter après le chargement du document HTML
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", verifierApplication);
} else {
    verifierApplication();
}
