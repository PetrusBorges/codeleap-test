## CodeLeap Test – Local Development Rules

This is a Next.js (App Router) project. Follow the rules below to run it locally with **npm** or **yarn**.

### Prerequisites

- **Node.js**: `>= 18` (recommended: latest LTS)
- **Package manager**: either **npm** (comes with Node) or **yarn**

Do **not** mix npm and yarn in the same clone. Pick **one** and use it consistently.

---

### 1. Install dependencies

- **Using npm**

```bash
npm install
```

- **Using yarn**

```bash
yarn install
```

---

### 2. Run the development server

- **With npm**

```bash
npm run dev
```

- **With yarn**

```bash
yarn dev
```

The app will be available at `http://localhost:3000`.

---

### 3. Build and run in production mode

- **Using npm**

```bash
npm run build
npm start
```

- **Using yarn**

```bash
yarn build
yarn start
```

---

### 4. Linting

- **With npm**

```bash
npm run lint
```

- **With yarn**

```bash
yarn lint
```

Fix any reported issues before committing.

---

### 5. Recommended workflow

- **Clone** the repo
- **Install** dependencies with **either** `npm install` **or** `yarn install`
- **Run** `npm run dev` **or** `yarn dev`
- Optionally **lint** with `npm run lint` or `yarn lint` before pushing changes
