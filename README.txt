=== ENF Site Statique — Plugin WordPress v3.0 ===

Contributes by: École Nationale des Finances (ENF)
Tags: site statique, ENF, école, finances, RDC
Requires at least: 5.0
Tested up to: 6.7
Stable tag: 3.0.0
License: GPL-2.0+

== Description ==

Ce plugin intègre le site statique complet de l'École Nationale des Finances
(ENF) de la République Démocratique du Congo dans une installation WordPress.

== Structure du plugin ==

enf-site/
├── enf-site.php           ← Fichier principal du plugin (NE PAS SUPPRIMER)
├── css/
│   └── main.css           ← Feuille de styles du site ENF
├── js/
│   ├── main.js            ← Script principal
│   └── components.js      ← Composants JS
├── img/                   ← Toutes les images du site
│   ├── enf-logo.png
│   ├── hero-bg-1.png
│   └── ... (20 images)
├── pages/                 ← Toutes les pages HTML du site
│   ├── index.html         ← Accueil
│   ├── about.html
│   ├── formation.html
│   ├── actualites.html
│   ├── contact.html
│   ├── concours.html
│   ├── espace-apprenant.html
│   ├── admission-initiale.html
│   ├── admission-continue.html
│   ├── admission-certifiante.html
│   ├── actu-concours-2026.html
│   ├── actu-rentree-2025.html
│   ├── actu-resultats-2025.html
│   ├── actu-salle-informatique.html
│   ├── actu-atelier-budget.html
│   ├── actu-resipif.html
│   └── actu-audience-ministre.html
└── README.txt             ← Ce fichier

== Installation ==

1. Téléversez le dossier `enf-site/` dans `wp-content/plugins/`
   (ou uploadez le fichier ZIP via WordPress Admin → Extensions → Ajouter)

2. Activez le plugin dans WordPress Admin → Extensions → Plugins installés

3. ⚠️ IMPORTANT : Allez dans Réglages → Permaliens et cliquez sur
   "Enregistrer les modifications" pour activer les URLs propres.

4. Accédez au site ENF via : https://votredomaine.com/enf/

== URLs disponibles ==

| Page                      | URL                                         |
|---------------------------|---------------------------------------------|
| Accueil                   | /enf/                                       |
| À Propos                  | /enf/a-propos/                              |
| Formations                | /enf/formations/                            |
| Actualités                | /enf/actualites/                            |
| Concours                  | /enf/concours/                              |
| Espace Apprenant          | /enf/espace-apprenant/                      |
| Contact                   | /enf/contact/                               |
| Admission Initiale        | /enf/admission/initiale/                    |
| Admission Continue        | /enf/admission/continue/                    |
| Admission Certifiante     | /enf/admission/certifiante/                 |
| Actu: Concours 2026       | /enf/actualites/concours-2026/              |
| Actu: Rentrée 2025        | /enf/actualites/rentree-2025/               |
| Actu: Résultats 2025      | /enf/actualites/resultats-2025/             |
| Actu: Salle Informatique  | /enf/actualites/salle-informatique/         |
| Actu: Atelier Budget      | /enf/actualites/atelier-budget/             |
| Actu: RESIPIF             | /enf/actualites/resipif/                    |
| Actu: Audience Ministre   | /enf/actualites/audience-ministre/          |

== Administration ==

Après activation, un menu "ENF Site" apparaît dans le tableau de bord
WordPress. Il liste toutes les pages avec leurs URLs cliquables.

== Mise à jour du contenu ==

Pour modifier une page, éditez directement le fichier HTML correspondant
dans wp-content/plugins/enf-site/pages/ via FTP/SFTP.

== Changelog ==

= 3.0.0 =
* Version initiale du plugin
* 17 pages HTML intégrées
* Réécriture automatique des chemins d'assets et des liens internes
* Menu d'administration avec tableau de bord
