const config = require("./config.json");

  // Vérification en ligne de la licence
  async function verifierLicenceEnLigne(licence) {
    // Effectuez ici une requête HTTP à un serveur de vérification en ligne
    // Envoyez la licence chiffrée et attendez la réponse du serveur
    const response = await fetch('https://bloume-protect.fr/verification.php?licence=' + licence, {
      method: 'POST',
      body: JSON.stringify({ licence }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const verificationResult = await response.json();
      return verificationResult.valid;
    } else {
      throw new Error('Erreur lors de la vérification en ligne de la licence');
    }
  }
  
  // Fonction principale pour exécuter le code
  
  async function executerCode(licence) {
  
    try {
      const estLicenceValide = await verifierLicenceEnLigne(licence);
      if (estLicenceValide) {
        // Code autorisé
        console.log("Licence validée démarrage");
        // Mettez ici le code que vous souhaitez exécuter
      } else {
        // Code non autorisé
        console.log("Licence invalide. Impossible d'exécuter le code.");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de la licence en ligne :", error);
    }
  }
  
  const licenceUtilisateur = config.licence;
  executerCode(licenceUtilisateur)