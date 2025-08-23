# Simple static web-hosting service
Short README for a learning project that hosts user-uploaded static sites on a Raspberry Pi using Docker.
Accesible on self-hoster.jakobmichaelsen.dk

### Summary
A minimal self-hosted web hosting service. Users register and log in (JWT), upload static site files, and the server generates NGINX config + TLS so each user gets a subdomain (e.g. userid.jakobmichaelsen.dk) with automatic Let's Encrypt certificates. Built as a learning project to explore Docker, REST APIs, SQLite, token authentication, unit testing and React.

### Features
- User registration / login (JWT)
- Upload static files which are served under a generated subdomain
- Automatic NGINX config generation + Let's Encrypt TLS
- SQLite for user storage
- Express REST API backend
- React frontend for auth + uploads
- Unit & integration tests with Jest + Supertest
- Deployed with Docker on a Raspberry Pi

### Tech stack
- Backend: Node.js + Express, SQLite
- Frontend: React
- Auth: JWT
- Testing: Jest, Supertest
- Deployment: Docker / Docker Compose on Raspberry Pi




