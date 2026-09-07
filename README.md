# LMEE Frontend

Web app for the Live Match Event Engine. It shows football matches in real time: anyone can read the
matches and the incidents, an operator records the incidents of a live match, and an administrator
manages the clubs, the players and the calendar.

The app reads the history with REST and gets the new incidents with a STOMP WebSocket subscription.

| Resource | Address |
| --- | --- |
| Web app | https://zealous-dune-00b527710.5.azurestaticapps.net |
| API | https://backend.redisland-a629e2ff.centralus.azurecontainerapps.io |
| Swagger UI | https://backend.redisland-a629e2ff.centralus.azurecontainerapps.io/swagger-ui.html |
| Backend repository | [RaidThabet/lmee](https://github.com/RaidThabet/lmee) |

Built with Angular 21 (standalone, zoneless, signals), Tailwind CSS 4, Optimus UI, keycloak-angular
and `@stomp/stompjs`.

## Routes

| Route | Content | Access |
| --- | --- | --- |
| `/matches` | The match list | Anonymous |
| `/matches/:matchId` | The score and the incident feed | Anonymous |
| `/clubs` | Club management | ADMIN |
| `/players` | Player management | ADMIN |

## Get started

You need Node.js 22 and a running [backend](https://github.com/RaidThabet/lmee).

```bash
npm install
```

```bash
npm start
```

Open http://localhost:4200. The development configuration is in
[`src/environments/environment.development.ts`](src/environments/environment.development.ts), and the
production one is in [`src/environments/environment.ts`](src/environments/environment.ts).

> [!IMPORTANT]
> The Keycloak client `angular-app` must permit the redirect URI `http://localhost:4200/*` and the
> web origin `http://localhost:4200`. The backend must permit this origin too, for CORS and for the
> WebSocket handshake.

## Commands

```bash
npm run build
```

Writes the production build to `dist/frontend/browser`.

```bash
npm test
```

Runs the tests with Vitest.

```bash
NG_API_BASE_URL=http://localhost:8080 npm run api:types
```

Regenerates `src/app/api/schema.d.ts` from the OpenAPI file of the running backend.

## Project structure

```
src/app/
├── api/            The services, the API types and the STOMP client
├── auth/           The Auth signals and the admin route guard
├── matches/        The match list and the match page
├── clubs/          Club management
├── players/        Player management
├── app.config.ts   The providers
└── app.routes.ts   The routes
src/environments/   The configuration files
public/             The static files and the silent single sign-on page
```

## Deployment

GitHub Actions deploys to Azure Static Web Apps on each push to `main`
([`deploy.yml`](.github/workflows/deploy.yml)).
