<?php
/*
Plugin Name: ENF Site Statique
Plugin URI: https://ecole-nationale-finances.cd
Description: Intègre le site statique complet de l'École Nationale des Finances (ENF) dans WordPress. Toutes les pages HTML, CSS, JS et images sont encapsulées dans ce plugin.
Version: 3.0.0
Author: ENF - École Nationale des Finances
License: GPL-2.0+
Text Domain: enf-site
*/

// Empêcher l'accès direct
if (!defined('ABSPATH')) {
    exit;
}

// --- CONSTANTES ---
define('ENF_SITE_PATH', plugin_dir_path(__FILE__));
define('ENF_SITE_URL', plugin_dir_url(__FILE__));

// -------------------------------------------------------
// 1. ENQUEUE DES ASSETS (CSS + JS)
// -------------------------------------------------------
add_action('wp_enqueue_scripts', 'enf_site_enqueue_assets');

function enf_site_enqueue_assets() {
    // On charge les assets uniquement sur les pages ENF
    if (!get_query_var('enf_page')) return;

    // Google Fonts
    wp_enqueue_style(
        'enf-google-fonts',
        'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500&display=swap',
        array(),
        null
    );

    // CSS principal du site ENF
    wp_enqueue_style(
        'enf-site-style',
        ENF_SITE_URL . 'css/main.css',
        array(),
        '3.0.0'
    );

    // JS : components.js (chargé en premier)
    wp_enqueue_script(
        'enf-site-components',
        ENF_SITE_URL . 'js/components.js',
        array(),
        '3.0.0',
        true
    );

    // JS : main.js (dépend de components.js)
    wp_enqueue_script(
        'enf-site-main',
        ENF_SITE_URL . 'js/main.js',
        array('enf-site-components'),
        '3.0.0',
        true
    );

    // Passer l'URL du plugin aux scripts JS (pour les chemins dynamiques)
    wp_localize_script('enf-site-main', 'enfSite', array(
        'pluginUrl' => ENF_SITE_URL,
        'siteUrl'   => home_url(),
    ));
}

// -------------------------------------------------------
// 2. ENREGISTREMENT DES RÈGLES DE RÉÉCRITURE (ROUTES)
// -------------------------------------------------------
add_action('init', 'enf_site_register_rewrite_rules');

function enf_site_register_rewrite_rules() {
    // Page d'accueil ENF  →  /enf/
    add_rewrite_rule('^enf/?$',                                          'index.php?enf_page=home',                  'top');

    // Pages principales
    add_rewrite_rule('^enf/a-propos/?$',                                 'index.php?enf_page=about',                 'top');
    add_rewrite_rule('^enf/formations/?$',                               'index.php?enf_page=formation',             'top');
    add_rewrite_rule('^enf/actualites/?$',                               'index.php?enf_page=actualites',            'top');
    add_rewrite_rule('^enf/contact/?$',                                  'index.php?enf_page=contact',               'top');
    add_rewrite_rule('^enf/espace-apprenant/?$',                         'index.php?enf_page=espace-apprenant',      'top');
    add_rewrite_rule('^enf/concours/?$',                                 'index.php?enf_page=concours',              'top');

    // Pages d'admission
    add_rewrite_rule('^enf/admission/initiale/?$',                       'index.php?enf_page=admission-initiale',    'top');
    add_rewrite_rule('^enf/admission/continue/?$',                       'index.php?enf_page=admission-continue',    'top');
    add_rewrite_rule('^enf/admission/certifiante/?$',                    'index.php?enf_page=admission-certifiante', 'top');

    // Articles d'actualité
    add_rewrite_rule('^enf/actualites/concours-2026/?$',                 'index.php?enf_page=actu-concours-2026',    'top');
    add_rewrite_rule('^enf/actualites/rentree-2025/?$',                  'index.php?enf_page=actu-rentree-2025',     'top');
    add_rewrite_rule('^enf/actualites/resultats-2025/?$',                'index.php?enf_page=actu-resultats-2025',   'top');
    add_rewrite_rule('^enf/actualites/salle-informatique/?$',            'index.php?enf_page=actu-salle-informatique','top');
    add_rewrite_rule('^enf/actualites/atelier-budget/?$',                'index.php?enf_page=actu-atelier-budget',   'top');
    add_rewrite_rule('^enf/actualites/resipif/?$',                       'index.php?enf_page=actu-resipif',          'top');
    add_rewrite_rule('^enf/actualites/audience-ministre/?$',             'index.php?enf_page=actu-audience-ministre','top');
}

// Enregistrer la query var personnalisée
add_filter('query_vars', 'enf_site_register_query_vars');

function enf_site_register_query_vars($vars) {
    $vars[] = 'enf_page';
    return $vars;
}

// -------------------------------------------------------
// 3. CORRESPONDANCE PAGE → FICHIER HTML
// -------------------------------------------------------
function enf_get_html_file($page_slug) {
    $map = array(
        'home'                  => 'index.html',
        'about'                 => 'about.html',
        'formation'             => 'formation.html',
        'actualites'            => 'actualites.html',
        'contact'               => 'contact.html',
        'espace-apprenant'      => 'espace-apprenant.html',
        'concours'              => 'concours.html',
        'admission-initiale'    => 'admission-initiale.html',
        'admission-continue'    => 'admission-continue.html',
        'admission-certifiante' => 'admission-certifiante.html',
        'actu-concours-2026'    => 'actu-concours-2026.html',
        'actu-rentree-2025'     => 'actu-rentree-2025.html',
        'actu-resultats-2025'   => 'actu-resultats-2025.html',
        'actu-salle-informatique' => 'actu-salle-informatique.html',
        'actu-atelier-budget'   => 'actu-atelier-budget.html',
        'actu-resipif'          => 'actu-resipif.html',
        'actu-audience-ministre'=> 'actu-audience-ministre.html',
    );
    return isset($map[$page_slug]) ? $map[$page_slug] : null;
}

// -------------------------------------------------------
// 4. INTERCEPTION ET SERVIR LE BON FICHIER HTML
// -------------------------------------------------------
add_action('template_redirect', 'enf_site_load_template');

function enf_site_load_template() {
    $enf_page = get_query_var('enf_page');
    if (!$enf_page) return;

    $html_file = enf_get_html_file($enf_page);

    if (!$html_file) {
        // Page ENF inconnue → 404
        global $wp_query;
        $wp_query->set_404();
        status_header(404);
        return;
    }

    $file_path = ENF_SITE_PATH . 'pages/' . $html_file;

    if (!file_exists($file_path)) {
        // Fichier manquant
        global $wp_query;
        $wp_query->set_404();
        status_header(404);
        return;
    }

    // Lire et adapter le contenu HTML
    $html = file_get_contents($file_path);

    // Remplacer les chemins relatifs des assets par les URLs absolues du plugin
    $plugin_url = ENF_SITE_URL;
    $html = enf_fix_asset_paths($html, $plugin_url);

    // Servir le HTML
    header('Content-Type: text/html; charset=UTF-8');
    echo $html;
    exit;
}

// -------------------------------------------------------
// 5. RÉÉCRITURE DES CHEMINS D'ASSETS
//    assets/css/... → plugin_url/css/...
//    assets/js/...  → plugin_url/js/...
//    assets/img/... → plugin_url/img/...
// -------------------------------------------------------
function enf_fix_asset_paths($html, $plugin_url) {
    // CSS
    $html = str_replace(
        'href="assets/css/',
        'href="' . $plugin_url . 'css/',
        $html
    );
    // JS
    $html = str_replace(
        'src="assets/js/',
        'src="' . $plugin_url . 'js/',
        $html
    );
    // Images (src=)
    $html = str_replace(
        'src="assets/img/',
        'src="' . $plugin_url . 'img/',
        $html
    );
    // Images (url() dans style=)
    $html = str_replace(
        "url('assets/img/",
        "url('" . $plugin_url . 'img/',
        $html
    );
    $html = str_replace(
        'url("assets/img/',
        'url("' . $plugin_url . 'img/',
        $html
    );

    // Réécrire les liens internes (href="index.html" → /enf/)
    $internal_links = array(
        'href="index.html"'               => 'href="' . home_url('/enf/') . '"',
        'href="about.html"'               => 'href="' . home_url('/enf/a-propos/') . '"',
        'href="formation.html"'           => 'href="' . home_url('/enf/formations/') . '"',
        'href="actualites.html"'          => 'href="' . home_url('/enf/actualites/') . '"',
        'href="contact.html"'             => 'href="' . home_url('/enf/contact/') . '"',
        'href="espace-apprenant.html"'    => 'href="' . home_url('/enf/espace-apprenant/') . '"',
        'href="concours.html"'            => 'href="' . home_url('/enf/concours/') . '"',
        'href="admission-initiale.html"'  => 'href="' . home_url('/enf/admission/initiale/') . '"',
        'href="admission-continue.html"'  => 'href="' . home_url('/enf/admission/continue/') . '"',
        'href="admission-certifiante.html"'=> 'href="' . home_url('/enf/admission/certifiante/') . '"',
        'href="actu-concours-2026.html"'  => 'href="' . home_url('/enf/actualites/concours-2026/') . '"',
        'href="actu-rentree-2025.html"'   => 'href="' . home_url('/enf/actualites/rentree-2025/') . '"',
        'href="actu-resultats-2025.html"' => 'href="' . home_url('/enf/actualites/resultats-2025/') . '"',
        'href="actu-salle-informatique.html"' => 'href="' . home_url('/enf/actualites/salle-informatique/') . '"',
        'href="actu-atelier-budget.html"' => 'href="' . home_url('/enf/actualites/atelier-budget/') . '"',
        'href="actu-resipif.html"'        => 'href="' . home_url('/enf/actualites/resipif/') . '"',
        'href="actu-audience-ministre.html"'=> 'href="' . home_url('/enf/actualites/audience-ministre/') . '"',
    );

    foreach ($internal_links as $old => $new) {
        $html = str_replace($old, $new, $html);
    }

    return $html;
}

// -------------------------------------------------------
// 6. MENU D'ADMINISTRATION
// -------------------------------------------------------
add_action('admin_menu', 'enf_site_add_admin_menu');

function enf_site_add_admin_menu() {
    add_menu_page(
        'ENF — Site Statique',
        'ENF Site',
        'manage_options',
        'enf-site-dashboard',
        'enf_site_dashboard_page',
        'dashicons-building',
        30
    );
}

function enf_site_dashboard_page() {
    $base = home_url('/enf/');
    ?>
    <div class="wrap">
        <h1>🏛️ ENF — Site Statique v3.0</h1>
        <p>Le site de l'École Nationale des Finances est <strong>actif</strong>.</p>
        <hr>
        <h2>Pages disponibles</h2>
        <table class="widefat striped" style="max-width:700px">
            <thead><tr><th>Page</th><th>URL publique</th></tr></thead>
            <tbody>
                <?php
                $pages = array(
                    'Accueil'               => '',
                    'À Propos'              => 'a-propos/',
                    'Formations'            => 'formations/',
                    'Actualités'            => 'actualites/',
                    'Concours'              => 'concours/',
                    'Espace Apprenant'      => 'espace-apprenant/',
                    'Contact'               => 'contact/',
                    'Admission Initiale'    => 'admission/initiale/',
                    'Admission Continue'    => 'admission/continue/',
                    'Admission Certifiante' => 'admission/certifiante/',
                    'Actu: Concours 2026'   => 'actualites/concours-2026/',
                    'Actu: Rentrée 2025'    => 'actualites/rentree-2025/',
                    'Actu: Résultats 2025'  => 'actualites/resultats-2025/',
                    'Actu: Salle Informatique' => 'actualites/salle-informatique/',
                    'Actu: Atelier Budget'  => 'actualites/atelier-budget/',
                    'Actu: RESIPIF'         => 'actualites/resipif/',
                    'Actu: Audience Ministre'=> 'actualites/audience-ministre/',
                );
                foreach ($pages as $label => $slug):
                    $url = $base . $slug;
                ?>
                <tr>
                    <td><?php echo esc_html($label); ?></td>
                    <td><a href="<?php echo esc_url($url); ?>" target="_blank"><?php echo esc_html($url); ?></a></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <br>
        <p>
            <a href="<?php echo esc_url($base); ?>" target="_blank" class="button button-primary button-large">
                🌐 Voir le site ENF
            </a>
        </p>
        <hr>
        <h2>⚠️ Remarques importantes</h2>
        <ul style="list-style:disc;padding-left:2em;">
            <li>Les images doivent se trouver dans <code>wp-content/plugins/enf-site/img/</code></li>
            <li>Pour modifier du contenu, éditez les fichiers HTML dans <code>wp-content/plugins/enf-site/pages/</code></li>
            <li>Après activation initiale, allez dans <strong>Réglages → Permaliens</strong> et sauvegardez pour activer les URLs propres.</li>
        </ul>
    </div>
    <?php
}

// -------------------------------------------------------
// 7. ACTIVATION / DÉSACTIVATION
// -------------------------------------------------------
register_activation_hook(__FILE__, 'enf_site_activate');
function enf_site_activate() {
    enf_site_register_rewrite_rules();
    flush_rewrite_rules();
}

register_deactivation_hook(__FILE__, 'enf_site_deactivate');
function enf_site_deactivate() {
    flush_rewrite_rules();
}
?>
