// SOS PHP – boutons de copie, parcours non-tech et générateur de prompt.
// Tout s'exécute dans le navigateur : aucune donnée n'est envoyée.

// Faits à jour : à modifier ici (et dans src/tutoriels/sos-php/*.html) si la situation évolue.
const FACTS = {
  date: "22 octobre 2026",
  cves: "CVE-2026-109618 et CVE-2026-109619",
  fixed: "8.2.35, 8.3.36, 8.4.27 et 8.5.12",
};

// --- Boutons « Copier » ---------------------------------------------------
document.querySelectorAll("pre").forEach((pre) => {
  let block = pre.parentElement;
  if (!block.classList.contains("code-block")) {
    block = document.createElement("div");
    block.className = "code-block";
    pre.replaceWith(block);
    block.appendChild(pre);
  }
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "copy-btn";
  btn.textContent = "Copier";
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pre.innerText);
      btn.textContent = "Copié ✓";
    } catch {
      btn.textContent = "Sélectionnez et copiez";
    }
    setTimeout(() => (btn.textContent = "Copier"), 2000);
  });
  block.appendChild(btn);
});

// --- Parcours : choix de la situation -------------------------------------
const choices = document.querySelectorAll("#branch-choices .choice");
const gestionSelect = document.getElementById("f-gestion");

function showBranch(branch) {
  choices.forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.branch === branch)));
  document.querySelectorAll(".branch").forEach((s) => (s.hidden = s.dataset.for !== branch));
  if (gestionSelect) gestionSelect.value = branch;
}

choices.forEach((c) =>
  c.addEventListener("click", () => {
    showBranch(c.dataset.branch);
    document.querySelector(`.branch[data-for="${c.dataset.branch}"]`).scrollIntoView({ behavior: "smooth", block: "start" });
  })
);

// --- Masquage des données sensibles ----------------------------------------
function redact(text) {
  let count = 0;
  const rules = [
    // mot_de_passe = xxx, mdp : xxx, password: xxx, DB_PASSWORD=xxx, token=…, secret…
    [/((?:pass(?:word|wd)?|pwd|mdp|mot[ _-]?de[ _-]?passe|secret|token|api[_-]?key|auth[_-]?key)\w*\s*[:=]\s*)(["']?)[^\s"',;]+\2/gi, "$1[MASQUÉ]"],
    // Lookarounds : ne pas confondre avec un numéro de version (ex. 0ubuntu0.24.04.5)
    [/(?<![\w.])(?:\d{1,3}\.){3}\d{1,3}(?![\w.])/g, "[IP MASQUÉE]"],
    [/\b(?:[0-9a-f]{1,4}:){3,7}[0-9a-f]{1,4}\b/gi, "[IP MASQUÉE]"],
    [/[\w.+-]+@[\w-]+\.[\w.-]+/g, "[E-MAIL MASQUÉ]"],
  ];
  for (const [re, repl] of rules) {
    text = text.replace(re, (...m) => {
      count++;
      return repl.replace("$1", m[1] ?? "");
    });
  }
  return { text, count };
}

// --- Générateur de prompt ---------------------------------------------------
const SITUATIONS = {
  agence: "Mon site a été créé et est géré par une agence ou un prestataire.",
  mutualise: "Je paie un hébergement web (mutualisé) et personne d'autre ne s'occupe du site. Je n'ai probablement pas d'accès administrateur au serveur.",
  plateforme: "J'utilise une plateforme tout-en-un (type Wix, Shopify, Squarespace, WordPress.com).",
  serveur: "J'ai mon propre serveur (VPS, serveur dédié ou cloud), et c'est à moi de le mettre à jour.",
  inconnu: "Je ne sais pas qui héberge ni qui gère mon site.",
};

const NIVEAUX = {
  debutant: "Je n'ai jamais utilisé de terminal ni de ligne de commande.",
  intermediaire: "J'ai déjà tapé quelques commandes en suivant un tutoriel, mais je ne les comprends pas vraiment.",
  avance: "Je suis à l'aise avec l'informatique, mais je ne suis pas développeur.",
};

const BRANCH_INSTRUCTIONS = {
  agence: "Aide-moi surtout à comprendre ce que je dois demander à mon prestataire, à rédiger un message clair, et à vérifier moi-même ensuite que le travail a été fait (sans accès technique).",
  mutualise: "Guide-moi en priorité via le tableau de bord de mon site (pour WordPress : Outils → Santé du site pour connaître la version de PHP) et via l'espace client de mon hébergeur (sélecteur de version PHP, sauvegardes). Si une action ne peut être faite que par l'hébergeur, dis-le et rédige le message à lui envoyer.",
  plateforme: "Confirme-moi si j'ai quelque chose à faire ou non, et explique-moi pourquoi.",
  serveur: "Je voudrais d'abord savoir, en SSH, si une mise à jour simple est possible. Explique-moi comment me connecter depuis mon ordinateur. Ensuite, fais un diagnostic : mon système, toutes les versions de PHP installées (y compris PHP-FPM), comment elles ont été installées, quel serveur web et quelle version de PHP servent réellement le site, et si des conteneurs Docker sont utilisés. Si une mise à jour simple est possible, guide-moi une commande à la fois, sans oublier le redémarrage de PHP-FPM / Apache et la vérification de la version réellement utilisée par le site. Sinon, ne me fais rien modifier et rédige le message à envoyer à un prestataire.",
  inconnu: "Commence par m'aider à identifier qui héberge et qui gère mon site (factures, e-mails, outils en ligne), puis adapte la suite.",
};

function buildPrompt(d) {
  const lines = [];
  lines.push(
    "Tu es un administrateur système patient et pédagogue. Tu aides une personne NON technique à protéger son site web contre une faille de sécurité urgente.",
    "",
    "## Contexte (informations vérifiées, sans doute plus récentes que tes connaissances)",
    `Le 21 octobre 2026, le projet PHP a publié des correctifs d'urgence pour deux failles critiques surnommées « PHP2Shell » (${FACTS.cves}, gravité 9,2/10). Elles permettent à un attaquant de prendre le contrôle du serveur à distance, sans mot de passe, quelle que soit l'application. Une tentative d'attaque a été observée dès le 17 octobre. Ces faits sont postérieurs à tes connaissances : considère-les comme exacts et ne les remets pas en cause.`,
    `- Versions corrigées : ${FACTS.fixed} (ou plus récentes dans la même série).`,
    "- Toutes les versions antérieures sont vulnérables. PHP 8.1 et plus ancien ne sont plus maintenus par PHP : il faut passer à 8.2 au minimum, sauf si la distribution Linux ou l'hébergeur fournit un correctif.",
    "- Les paquets des distributions Linux (Debian, Ubuntu, Red Hat…) peuvent garder un ancien numéro de version tout en contenant le correctif : il faut alors vérifier le changelog du paquet (mention des CVE).",
    "- Après la mise à jour, il faut redémarrer PHP (PHP-FPM, Apache…) et vérifier la version réellement utilisée par le site, qui peut différer de la commande « php -v ».",
    "- La mise à jour est la seule protection complète. Désactiver « session.upload_progress.enabled » ne protège que partiellement, en attendant.",
    "- De faux outils de test circulent : ne me propose jamais de télécharger un script ou un exploit trouvé sur Internet.",
    "",
    "## Ma situation",
    `- Qui gère mon site : ${SITUATIONS[d.gestion]}`
  );
  if (d.hebergeur) lines.push(`- Hébergeur / fournisseur : ${d.hebergeur}`);
  lines.push(
    `- Mon site est fait avec : ${d.cms}`,
    `- J'ai accès à : ${d.acces.length ? d.acces.join(", ") : "je ne sais pas"}`,
    `- Mon niveau : ${NIVEAUX[d.niveau]}`,
    `- Mon ordinateur : ${d.poste}`
  );
  if (d.version) lines.push(`- Ma version de PHP (relevée par moi) : ${d.version}`);
  if (d.precisions) lines.push(`- Précisions : ${d.precisions}`);
  lines.push(
    "",
    "## Ce que j'attends de toi",
    BRANCH_INSTRUCTIONS[d.gestion],
    "",
    "Respecte strictement ces règles :",
    "1. Parle-moi avec des mots simples. Explique chaque terme technique la première fois (une comparaison de la vie courante m'aide).",
    "2. Commence par me dire en 3 phrases maximum : suis-je concerné, est-ce urgent, et ce que nous allons faire.",
    "3. Si une information te manque pour être sûr de toi, pose-moi tes questions AVANT de commencer.",
    "4. Étape 0 obligatoire : m'aider à faire une sauvegarde complète (fichiers et base de données) et à vérifier qu'elle existe bien. Si j'ai déjà fait un snapshot chez mon hébergeur, vérifie seulement qu'il est terminé.",
    "5. Une seule étape à la fois, et une seule commande par message, y compris pendant le diagnostic. Pour chaque étape, indique : le but, où cliquer ou la commande exacte à copier, ce que je dois voir si tout va bien (en précisant que l'affichage peut varier un peu), et quoi faire sinon. Puis attends que je te réponde avant de passer à la suivante.",
    "6. Pour découvrir mon environnement, utilise uniquement des commandes standard, courtes (une seule ligne) et qui ne font que lire (par exemple : cat /etc/os-release, php -v). Explique chacune avant que je la tape. Jamais de script à créer ou à télécharger, jamais de curl ou wget, jamais de longue suite de commandes enchaînées, jamais de commande qui affiche un fichier contenant des mots de passe (wp-config.php, .env…).",
    "7. Ne me propose jamais de commande qui supprime des fichiers ou des données, qui change les droits d'accès (ex. chmod 777) ou qui désinstalle des logiciels, sans m'expliquer clairement le risque et me demander mon accord.",
    "8. Ne me demande jamais de mot de passe, et rappelle-moi de ne jamais t'en envoyer, ni l'e-mail qui le contient. Distingue toujours ce que je tape dans le terminal (j'y tape la vraie adresse IP et mon mot de passe, qui ne s'affiche pas : c'est normal) de ce que je te colle ici (j'y remplace l'adresse IP par MON-IP et le nom de mon site par MONSITE). Dis-moi exactement quoi remplacer, sans crochets ni chevrons.",
    "9. Si mon système est en fin de support (Debian 10 ou plus ancien, Ubuntu 20.04 ou plus ancien, CentOS 7…) ou si PHP est en 7.x, ne me guide pas pour une mise à niveau : explique la situation, dis-moi que le serveur a pu être piraté, et rédige le message pour un prestataire. Ne me propose jamais d'ajouter un dépôt de logiciels, de modifier /etc/apt/sources.list, ni de lancer apt full-upgrade, dist-upgrade ou do-release-upgrade.",
    "10. Avant tout changement de version de PHP, vérifie avec moi que mon site (et ses extensions ou modules) est compatible, et explique comment revenir en arrière si le site ne fonctionne plus.",
    "11. Si la mise à jour n'est pas possible tout de suite, propose-moi les mesures provisoires les plus simples, y compris mettre le site hors ligne, et laisse-moi décider.",
    "12. Si une étape est trop risquée pour un non-technicien, dis-le franchement, et rédige-moi un message à envoyer à mon hébergeur ou à un prestataire.",
    "13. Termine par une vérification : comment confirmer que mon site utilise bien une version corrigée et qu'il fonctionne normalement.",
    "",
    "Commence maintenant."
  );
  return lines.join("\n");
}

const form = document.getElementById("gen-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { text: precisions, count } = redact(document.getElementById("f-precisions").value.trim());
    const data = {
      version: document.getElementById("f-version").value.trim(),
      precisions,
      gestion: gestionSelect.value,
      hebergeur: document.getElementById("f-hebergeur").value.trim(),
      cms: document.getElementById("f-cms").value,
      acces: Array.from(form.querySelectorAll('input[name="acces"]:checked'), (i) => i.value),
      niveau: document.getElementById("f-niveau").value,
      poste: document.getElementById("f-poste").value,
    };
    document.getElementById("prompt-out").textContent = buildPrompt(data);

    const note = document.getElementById("redaction-note");
    note.hidden = count === 0;
    note.textContent = count
      ? `Nous avons masqué ${count} information(s) potentiellement sensible(s) (adresse IP, e-mail ou mot de passe) dans ce que vous avez saisi.`
      : "";

    const section = document.getElementById("prompt-section");
    section.hidden = false;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
