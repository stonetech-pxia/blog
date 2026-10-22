// Faille PHP 2026-10-21 – boutons de copie, parcours non-tech et générateur de prompt.
// Tout s'exécute dans le navigateur : aucune donnée n'est envoyée.
// Les textes sont choisis selon la langue de la page (<html lang="fr|en">).

// Faits à jour : à modifier ici (et dans src/tutoriels/sos-php/*.html et src/tutoriels/php2shell/*.html) si la situation évolue.
const TEXTS = {
  fr: {
    copy: "Copier",
    copied: "Copié ✓",
    copyFailed: "Sélectionnez et copiez",
    masked: "[MASQUÉ]",
    ipMasked: "[IP MASQUÉE]",
    emailMasked: "[E-MAIL MASQUÉ]",
    redactionNote: (n) =>
      `Nous avons masqué ${n} information(s) potentiellement sensible(s) (adresse IP, e-mail ou mot de passe) dans ce que vous avez saisi.`,
    other: (t) => `Autre (${t})`,
    situations: {
      agence: "Mon site a été créé et est géré par une agence ou un prestataire.",
      mutualise: "Je paie un hébergement web (mutualisé) et personne d'autre ne s'occupe du site. Je n'ai probablement pas d'accès administrateur au serveur.",
      plateforme: "J'utilise une plateforme tout-en-un (type Wix, Shopify, Squarespace, WordPress.com).",
      serveur: "J'ai mon propre serveur (VPS, serveur dédié ou cloud), et c'est à moi de le mettre à jour.",
      inconnu: "Je ne sais pas qui héberge ni qui gère mon site.",
    },
    niveaux: {
      debutant: "Je n'ai jamais utilisé de terminal ni de ligne de commande.",
      intermediaire: "J'ai déjà tapé quelques commandes en suivant un tutoriel, mais je ne les comprends pas vraiment.",
      avance: "Je suis à l'aise avec l'informatique, mais je ne suis pas développeur.",
    },
    branches: {
      agence: "Aide-moi surtout à comprendre ce que je dois demander à mon prestataire, à rédiger un message clair, et à vérifier moi-même ensuite que le travail a été fait (sans accès technique).",
      mutualise: "Guide-moi en priorité via le tableau de bord de mon site (pour WordPress : Outils → Santé du site pour connaître la version de PHP) et via l'espace client de mon hébergeur (sélecteur de version PHP, sauvegardes). Si une action ne peut être faite que par l'hébergeur, dis-le et rédige le message à lui envoyer. Si ma version de PHP est en 7.x, 8.0 ou 8.1, la solution est de passer à 8.3 ou 8.4 avec le sélecteur de version PHP de mon espace client : guide-moi pour le faire, après avoir vérifié avec moi la compatibilité de mon site.",
      plateforme: "Confirme-moi si j'ai quelque chose à faire ou non, et explique-moi pourquoi.",
      serveur: "Je voudrais d'abord savoir, en SSH, si une mise à jour simple est possible. Explique-moi comment me connecter depuis mon ordinateur. Ensuite, fais un diagnostic : mon système, toutes les versions de PHP installées (y compris PHP-FPM), comment elles ont été installées, quel serveur web et quelle version de PHP servent réellement le site, et si des conteneurs Docker sont utilisés. Si une mise à jour simple est possible, guide-moi une commande à la fois, sans oublier le redémarrage de PHP-FPM / Apache et la vérification de la version réellement utilisée par le site. Sinon, ne me fais rien modifier et rédige le message à envoyer à un prestataire.",
      inconnu: "Commence par m'aider à identifier qui héberge et qui gère mon site (factures, e-mails, outils en ligne), puis adapte la suite.",
    },
    intro: [
      "Tu es un administrateur système patient et pédagogue. Tu aides une personne NON technique à protéger son site web contre une faille de sécurité urgente.",
      "",
      "## Contexte (informations vérifiées, sans doute plus récentes que tes connaissances)",
      "Le 21 octobre 2026, le projet PHP a publié des correctifs d'urgence pour deux failles critiques surnommées « PHP2Shell » (CVE-2026-109618 et CVE-2026-109619, gravité 9,2/10). Elles permettent à un attaquant de prendre le contrôle du serveur à distance, sans mot de passe, quelle que soit l'application. Une tentative d'attaque a été observée dès le 17 octobre. Ces faits sont postérieurs à tes connaissances : considère-les comme exacts et ne les remets pas en cause.",
      "- Versions corrigées : 8.2.35, 8.3.36, 8.4.27 et 8.5.12 (ou plus récentes dans la même série).",
      "- Toutes les versions antérieures sont vulnérables. PHP 8.1 et plus ancien ne sont plus maintenus par PHP : il faut passer à 8.2 au minimum, sauf si la distribution Linux ou l'hébergeur fournit un correctif.",
      "- Les paquets des distributions Linux (Debian, Ubuntu, Red Hat…) peuvent garder un ancien numéro de version tout en contenant le correctif : il faut alors vérifier le changelog du paquet (mention des CVE).",
      "- Après la mise à jour, il faut redémarrer PHP (PHP-FPM, Apache…) et vérifier la version réellement utilisée par le site, qui peut différer de la commande « php -v ».",
      "- La mise à jour est la seule protection complète. Désactiver « session.upload_progress.enabled » ne protège que partiellement, en attendant.",
      "- De faux outils de test circulent : ne me propose jamais de télécharger un script ou un exploit trouvé sur Internet.",
      "",
      "## Ma situation",
    ],
    who: "- Qui gère mon site : ",
    host: "- Hébergeur / fournisseur : ",
    cms: "- Mon site est fait avec : ",
    access: "- J'ai accès à : ",
    accessUnknown: "je ne sais pas",
    level: "- Mon niveau : ",
    computer: "- Mon ordinateur : ",
    version: "- Ma version de PHP (relevée par moi) : ",
    details: "- Précisions : ",
    expect: "## Ce que j'attends de toi",
    rulesTitle: "Respecte strictement ces règles :",
    start: "Commence maintenant.",
    rulesCommon: [
      "Parle-moi avec des mots simples. Explique chaque terme technique la première fois (une comparaison de la vie courante m'aide).",
      "Commence par me dire en 3 phrases maximum : suis-je concerné, est-ce urgent, et ce que nous allons faire.",
      "Si une information te manque pour être sûr de toi, pose-moi tes questions AVANT de commencer.",
      "Étape 0 obligatoire : m'aider à faire une sauvegarde complète (fichiers et base de données) et à vérifier qu'elle existe bien. Si j'ai déjà fait un snapshot chez mon hébergeur, vérifie seulement qu'il est terminé.",
    ],
    rulesTerminal: [
      "Une seule étape à la fois, et une seule commande par message, y compris pendant le diagnostic. Pour chaque étape, indique : le but, où cliquer ou la commande exacte à copier, ce que je dois voir si tout va bien (en précisant que l'affichage peut varier un peu), et quoi faire sinon. Puis attends que je te réponde avant de passer à la suivante.",
      "Pour découvrir mon environnement, utilise uniquement des commandes standard, courtes (une seule ligne) et qui ne font que lire (par exemple : cat /etc/os-release, php -v). Explique chacune avant que je la tape. Jamais de script à créer ou à télécharger, jamais de curl ou wget, jamais de longue suite de commandes enchaînées, jamais de commande qui affiche un fichier contenant des mots de passe (wp-config.php, .env…).",
      "Ne me propose jamais de commande qui supprime des fichiers ou des données, qui change les droits d'accès (ex. chmod 777) ou qui désinstalle des logiciels, sans m'expliquer clairement le risque et me demander mon accord.",
      "Ne me demande jamais de mot de passe, et rappelle-moi de ne jamais t'en envoyer, ni l'e-mail qui le contient. Distingue toujours ce que je tape dans le terminal (j'y tape la vraie adresse IP et mon mot de passe, qui ne s'affiche pas : c'est normal) de ce que je te colle ici (j'y remplace l'adresse IP par MON-IP et le nom de mon site par MONSITE). Dis-moi exactement quoi remplacer, sans crochets ni chevrons.",
      "Si mon système est en fin de support (Debian 10 ou plus ancien, Ubuntu 20.04 ou plus ancien, CentOS 7…) ou si PHP est en 7.x, ne me guide pas pour une mise à niveau : explique-moi calmement la situation, dis-moi qu'il faudra aussi vérifier que le serveur n'a pas été piraté, et rédige le message pour un prestataire. Ne me propose jamais d'ajouter un dépôt de logiciels, de modifier /etc/apt/sources.list, ni de lancer apt full-upgrade, dist-upgrade ou do-release-upgrade.",
    ],
    rulesNoTerminal: [
      "Une seule étape à la fois. Pour chaque étape, indique : le but, où cliquer exactement, ce que je dois voir si tout va bien (en précisant que l'affichage peut varier un peu), et quoi faire sinon. Puis attends que je te réponde avant de passer à la suivante.",
      "Ne me fais pas utiliser de terminal ni de ligne de commande : passe uniquement par le tableau de bord de mon site et l'espace client de mon hébergeur. Si une action n'est possible qu'en ligne de commande, dis-le et rédige le message à envoyer à mon hébergeur ou à un prestataire.",
      "Ne me demande jamais de mot de passe, et rappelle-moi de ne jamais t'en envoyer, ni l'e-mail qui le contient.",
    ],
    rulesEnd: [
      "Avant tout changement de version de PHP, vérifie avec moi que mon site (et ses extensions ou modules) est compatible, et explique comment revenir en arrière si le site ne fonctionne plus.",
      "Si la mise à jour n'est pas possible tout de suite, propose-moi les mesures provisoires les plus simples, y compris mettre le site hors ligne, et laisse-moi décider.",
      "Si une étape est trop risquée pour un non-technicien, dis-le franchement, et rédige-moi un message à envoyer à mon hébergeur ou à un prestataire.",
      "Termine par une vérification : comment confirmer que mon site utilise bien une version corrigée et qu'il fonctionne normalement.",
    ],
  },
  en: {
    copy: "Copy",
    copied: "Copied ✓",
    copyFailed: "Select and copy",
    masked: "[REDACTED]",
    ipMasked: "[IP REDACTED]",
    emailMasked: "[EMAIL REDACTED]",
    redactionNote: (n) =>
      `We removed ${n} piece(s) of possibly sensitive information (IP address, email or password) from what you typed.`,
    other: (t) => `Other (${t})`,
    situations: {
      agence: "My website was built and is managed by an agency or a contractor.",
      mutualise: "I pay for web hosting (shared hosting) and nobody else looks after the site. I probably don't have administrator access to the server.",
      plateforme: "I use an all-in-one platform (such as Wix, Shopify, Squarespace, WordPress.com).",
      serveur: "I have my own server (VPS, dedicated or cloud server), and keeping it up to date is my job.",
      inconnu: "I don't know who hosts or manages my website.",
    },
    niveaux: {
      debutant: "I have never used a terminal or the command line.",
      intermediaire: "I have typed a few commands while following a tutorial, but I don't really understand them.",
      avance: "I'm comfortable with computers, but I'm not a developer.",
    },
    branches: {
      agence: "Mainly help me understand what to ask my contractor, write a clear message, and then check for myself that the work has been done (without technical access).",
      mutualise: "Guide me first through my website's dashboard (for WordPress: Tools → Site Health to find the PHP version) and through my host's control panel (PHP version selector, backups). If something can only be done by the host, say so and write the message to send them. If my PHP version is 7.x, 8.0 or 8.1, the fix is to switch to 8.3 or 8.4 with the PHP version selector in my control panel: guide me through it, after checking with me that my site is compatible.",
      plateforme: "Tell me whether I need to do anything or not, and explain why.",
      serveur: "First I'd like to know, over SSH, whether a simple update is possible. Explain how to connect from my computer. Then run a diagnosis: my operating system, every installed PHP version (PHP-FPM included), how they were installed, which web server and which PHP version actually serve the site, and whether Docker containers are used. If a simple update is possible, guide me one command at a time, including restarting PHP-FPM / Apache and checking the PHP version the site really uses. Otherwise, don't make me change anything and write the message to send to a professional.",
      inconnu: "Start by helping me find out who hosts and who manages my website (invoices, emails, online tools), then adapt the rest.",
    },
    intro: [
      "You are a patient system administrator who is good at explaining things. You are helping a NON-technical person protect their website against an urgent security flaw.",
      "",
      "## Context (verified information, probably newer than your training data)",
      "On 21 October 2026, the PHP project released emergency fixes for two critical vulnerabilities nicknamed \"PHP2Shell\" (CVE-2026-109618 and CVE-2026-109619, severity 9.2/10). They let an attacker take control of the server remotely, without a password, whatever the application. An attack attempt was seen as early as 17 October. These facts are newer than your knowledge: treat them as accurate and don't question them.",
      "- Fixed versions: 8.2.35, 8.3.36, 8.4.27 and 8.5.12 (or later in the same series).",
      "- All earlier versions are vulnerable. PHP 8.1 and older are no longer maintained by PHP: you need 8.2 at least, unless the Linux distribution or the host provides a fix.",
      "- Linux distribution packages (Debian, Ubuntu, Red Hat…) can keep an old version number while including the fix: in that case check the package changelog (look for the CVEs).",
      "- After the update, PHP must be restarted (PHP-FPM, Apache…) and you must check the PHP version the site actually uses, which can differ from what \"php -v\" shows.",
      "- Updating is the only complete protection. Turning off \"session.upload_progress.enabled\" only partly protects in the meantime.",
      "- Fake testing tools are going around: never suggest I download a script or an exploit found on the internet.",
      "",
      "## My situation",
    ],
    who: "- Who manages my website: ",
    host: "- Host / provider: ",
    cms: "- My website is built with: ",
    access: "- I have access to: ",
    accessUnknown: "I don't know",
    level: "- My level: ",
    computer: "- My computer: ",
    version: "- My PHP version (as I found it): ",
    details: "- More details: ",
    expect: "## What I expect from you",
    rulesTitle: "Follow these rules strictly:",
    start: "Start now.",
    rulesCommon: [
      "Use simple words. Explain each technical term the first time you use it (an everyday comparison helps me).",
      "Start by telling me, in 3 sentences at most: am I affected, is it urgent, and what we are going to do.",
      "If you are missing information to be sure, ask me your questions BEFORE starting.",
      "Mandatory step 0: help me make a full backup (files and database) and check that it really exists. If I have already taken a snapshot at my host, just check that it has finished.",
    ],
    rulesTerminal: [
      "One step at a time, and one command per message, including during the diagnosis. For each step, tell me: the goal, where to click or the exact command to copy, what I should see if all is well (mentioning that the output may vary a little), and what to do if not. Then wait for my answer before moving on.",
      "To find out about my setup, only use standard, short (one line) commands that only read information (for example: cat /etc/os-release, php -v). Explain each one before I type it. Never a script to create or download, never curl or wget, never a long chain of commands, never a command that displays a file containing passwords (wp-config.php, .env…).",
      "Never suggest a command that deletes files or data, changes permissions (e.g. chmod 777) or uninstalls software without clearly explaining the risk and asking for my agreement.",
      "Never ask me for a password, and remind me never to send you one, nor the email that contains it. Always separate what I type in the terminal (there I type the real IP address and my password, which doesn't show as I type: that's normal) from what I paste here (here I replace the IP address with MY-IP and my site's name with MYSITE). Tell me exactly what to replace, without brackets or angle brackets.",
      "If my operating system is out of support (Debian 10 or older, Ubuntu 20.04 or older, CentOS 7…) or if PHP is 7.x, don't guide me through an upgrade: calmly explain the situation, tell me the server will also need to be checked for a break-in, and write the message for a professional. Never suggest adding a software repository, editing /etc/apt/sources.list, or running apt full-upgrade, dist-upgrade or do-release-upgrade.",
    ],
    rulesNoTerminal: [
      "One step at a time. For each step, tell me: the goal, exactly where to click, what I should see if all is well (mentioning that the screen may look a little different), and what to do if not. Then wait for my answer before moving on.",
      "Don't make me use a terminal or the command line: only go through my website's dashboard and my host's control panel. If something can only be done on the command line, say so and write the message to send to my host or to a professional.",
      "Never ask me for a password, and remind me never to send you one, nor the email that contains it.",
    ],
    rulesEnd: [
      "Before any change of PHP version, check with me that my site (and its plugins or modules) is compatible, and explain how to go back if the site stops working.",
      "If the update isn't possible right away, suggest the simplest temporary measures, including taking the site offline, and let me decide.",
      "If a step is too risky for a non-technical person, say so plainly, and write me a message to send to my host or to a professional.",
      "Finish with a check: how to confirm that my site really uses a fixed version and works normally.",
    ],
  },
};
const T = TEXTS[document.documentElement.lang === "en" ? "en" : "fr"];

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
  btn.textContent = T.copy;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pre.innerText);
      btn.textContent = T.copied;
    } catch {
      btn.textContent = T.copyFailed;
    }
    setTimeout(() => (btn.textContent = T.copy), 2000);
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
    [/((?:pass(?:word|wd)?|pwd|mdp|mot[ _-]?de[ _-]?passe|secret|token|api[_-]?key|auth[_-]?key)\w*\s*[:=]\s*)(["']?)[^\s"',;]+\2/gi, "$1" + T.masked],
    // Lookarounds : ne pas confondre avec un numéro de version (ex. 0ubuntu0.24.04.5)
    [/(?<![\w.])(?:\d{1,3}\.){3}\d{1,3}(?![\w.])/g, T.ipMasked],
    [/\b(?:[0-9a-f]{1,4}:){3,7}[0-9a-f]{1,4}\b/gi, T.ipMasked],
    [/[\w.+-]+@[\w-]+\.[\w.-]+/g, T.emailMasked],
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
function buildPrompt(d) {
  const lines = [...T.intro, T.who + T.situations[d.gestion]];
  if (d.hebergeur) lines.push(T.host + d.hebergeur);
  lines.push(
    T.cms + d.cms,
    T.access + (d.acces.length ? d.acces.join(", ") : T.accessUnknown),
    T.level + T.niveaux[d.niveau],
    T.computer + d.poste
  );
  if (d.version) lines.push(T.version + d.version);
  if (d.precisions) lines.push(T.details + d.precisions);
  // Les consignes liées au terminal ne concernent que la personne qui gère son propre serveur.
  const terminal = d.gestion === "serveur";
  const regles = [...T.rulesCommon, ...(terminal ? T.rulesTerminal : T.rulesNoTerminal), ...T.rulesEnd];
  lines.push(
    "",
    T.expect,
    T.branches[d.gestion],
    "",
    T.rulesTitle,
    ...regles.map((r, i) => `${i + 1}. ${r}`),
    "",
    T.start
  );
  return lines.join("\n");
}

// Champ libre affiché quand l'outil du site est « Autre » (option marquée data-other)
const cmsSelect = document.getElementById("f-cms");
const cmsAutre = document.getElementById("f-cms-autre");
const isOther = () => cmsSelect.selectedOptions[0]?.hasAttribute("data-other");
if (cmsSelect && cmsAutre) {
  cmsSelect.addEventListener("change", () => {
    cmsAutre.hidden = !isOther();
    if (!cmsAutre.hidden) cmsAutre.focus();
  });
}

const form = document.getElementById("gen-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { text: precisions, count: countPrecisions } = redact(document.getElementById("f-precisions").value.trim());
    const autre = isOther() ? redact(cmsAutre.value.trim()) : { text: "", count: 0 };
    const count = countPrecisions + autre.count;
    const data = {
      version: document.getElementById("f-version").value.trim(),
      precisions,
      gestion: gestionSelect.value,
      hebergeur: document.getElementById("f-hebergeur").value.trim(),
      cms: autre.text ? T.other(autre.text) : cmsSelect.value,
      acces: Array.from(form.querySelectorAll('input[name="acces"]:checked'), (i) => i.value),
      niveau: document.getElementById("f-niveau").value,
      poste: document.getElementById("f-poste").value,
    };
    document.getElementById("prompt-out").textContent = buildPrompt(data);

    const note = document.getElementById("redaction-note");
    note.hidden = count === 0;
    note.textContent = count ? T.redactionNote(count) : "";

    const section = document.getElementById("prompt-section");
    section.hidden = false;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
