# GTW-test


Front :

- Pas de test, j'aurais fait du gherkin, test d'intégration
- Pas de mock avec MSW, aurait permis de POC rapidement l'interface avec une API fake (+ pratique pour mock les calls API pour les tests)

Back :

- J'ai utilisé les 3/4 des trucs de base de Laravel, pas de custom pour les requêtes (donc ORM par défaut);
- Je n'ai pas exclude certaines donné useless au retour API type "user_id"
- J'utilise 2 type de validation disctincte (même lib derrière), voir Todos / Auth controller|request
- Pas d'utilisation du templating blade ou d'injection de react via laravel mix (C'est à éviter l'injection par Laravel mix, de ce que j'ai vu)