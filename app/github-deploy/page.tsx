/* ============================================================
   GITHUB & DEPLOYMENT PAGE
   ============================================================
   
   This page teaches a COMPLETE BEGINNER:
   1. What Git & GitHub are (and why you need them)
   2. How to set up Git for the first time
   3. Git staging, committing, pushing, pulling
   4. Branching & merging workflow
   5. Deploying Next.js on Vercel or Netlify
   
   Real repository used:
   https://github.com/wajidashraf/Next.Js-Guide.git
   ============================================================ */

import type { Metadata } from "next";
import Card from "../components/Card";
import CodeExample from "../components/CodeExample";

export const metadata: Metadata = {
  title: "GitHub & Deployment",
  description: "Learn Git, GitHub, and how to deploy Next.js apps to Vercel or Netlify",
};

export default function GitHubDeployPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">🚀 GitHub &amp; Deployment</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
        Learn how to use <strong>Git</strong> and <strong>GitHub</strong> to manage your code,
        and deploy your Next.js app live on <strong>Vercel</strong> or <strong>Netlify</strong>.
        No prior experience required — every step is explained.
      </p>

      {/* ========================================================
         PART 1: WHAT ARE GIT & GITHUB?
      ======================================================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">📖 Part 1: What Are Git &amp; GitHub?</h2>

        <Card title="Git vs GitHub — They Are Different!" variant="info">
          <div className="space-y-3">
            <p>
              <strong>Git</strong> is a <em>version control tool</em> that runs on your computer.
              Think of it like &quot;Save Game&quot; in a video game — you can save snapshots of your
              project, go back to any previous save, and try different things without losing work.
            </p>
            <p>
              <strong>GitHub</strong> is a <em>website</em> (github.com) that stores your Git
              saves online. It&apos;s like a cloud backup for your code. Other developers can see your
              code, contribute to it, and you can access it from any computer.
            </p>
            <div className="mt-3 p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <p className="font-mono text-xs">
                Git = Tool on your PC that tracks code changes<br/>
                GitHub = Website that hosts your Git repositories online<br/>
                Repository (repo) = A project folder tracked by Git
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* ========================================================
         PART 2: INSTALLING GIT
      ======================================================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">⬇️ Part 2: Installing &amp; Configuring Git</h2>

        <Card title="Step 1: Install Git">
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Windows:</strong> Download from <code>git-scm.com</code> → run installer → keep all defaults</li>
            <li><strong>Mac:</strong> Open Terminal → type <code>git --version</code> → it installs automatically</li>
            <li><strong>Linux:</strong> Run <code>sudo apt install git</code> (Ubuntu/Debian)</li>
          </ul>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Step 2: Configure Git (one-time setup)"
            language="bash"
            code={`# Tell Git who you are (used in every commit)
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# Verify your configuration
git config --list

# You should see:
# user.name=Your Name
# user.email=your-email@example.com`}
          />
        </div>

        <div className="mt-4">
          <Card title="Step 3: Create a GitHub Account" variant="info">
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to <code>github.com</code> and click &quot;Sign up&quot;</li>
              <li>Choose a username, enter your email, create a password</li>
              <li>Verify your email address</li>
              <li>You now have a GitHub account!</li>
            </ol>
          </Card>
        </div>
      </section>

      {/* ========================================================
         PART 3: HOW GIT WORKS (THE 3 STAGES)
      ======================================================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🔄 Part 3: How Git Works — The 3 Stages</h2>

        <Card title="Understanding Git's 3 Areas" variant="warning">
          <p className="mb-4">
            Every file in a Git project lives in one of three areas.
            Understanding these is the <strong>key to understanding Git</strong>:
          </p>
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
              <strong>1. WORKING DIRECTORY</strong> (your actual files)<br/>
              → These are the files you see and edit in VS Code<br/>
              → Changes here are NOT saved in Git yet
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800">
              <strong>2. STAGING AREA</strong> (ready to commit)<br/>
              → You add files here with <code>git add</code><br/>
              → Think of it as a &quot;shopping cart&quot; — you pick what to include<br/>
              → You can stage some files and leave others out
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <strong>3. REPOSITORY</strong> (committed / saved)<br/>
              → You save the staging area with <code>git commit</code><br/>
              → This creates a permanent snapshot of your code<br/>
              → Every commit has a unique ID and a message
            </div>
          </div>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Visual Flow: Working → Staging → Committed"
            language="text"
            code={`YOUR FILES          STAGING AREA         GIT HISTORY
(Working Dir)       (Index)              (Commits)
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Edit code   │ ──► │ git add     │ ──► │ git commit  │
│ in VS Code  │     │ (pick files │     │ (permanent  │
│             │     │  to save)   │     │  snapshot)  │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ▼
                                        ┌─────────────┐
                                        │ git push    │
                                        │ (upload to  │
                                        │  GitHub)    │
                                        └─────────────┘`}
          />
        </div>
      </section>

      {/* ========================================================
         PART 4: FIRST-TIME PUSH TO GITHUB
      ======================================================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">📤 Part 4: Push Your Project to GitHub</h2>

        <Card title="Step-by-step: From local folder to GitHub" variant="success">
          <p className="mb-2">Follow these steps in order. Open your terminal in VS Code
            (<code>Ctrl + `</code>) and run each command:
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Step 1: Initialize Git in Your Project"
            language="bash"
            code={`# Navigate to your project folder
cd firstnextapp

# Initialize a new Git repository
git init

# What this does:
# - Creates a hidden .git folder in your project
# - This folder contains all of Git's tracking data
# - Your project is now a "Git repository"`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Step 2: Check Status & Stage Files"
            language="bash"
            code={`# See which files Git has detected (all will be red = untracked)
git status

# Stage ALL files for commit (the dot means "everything")
git add .

# Check status again (all files should now be green = staged)
git status

# ALTERNATIVE: Stage specific files only
git add app/page.tsx             # Stage one file
git add app/forms/               # Stage an entire folder
git add *.tsx                    # Stage all .tsx files`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Step 3: Make Your First Commit"
            language="bash"
            code={`# Commit staged files with a descriptive message
git commit -m "Initial commit: Next.js learning project"

# What this does:
# - Creates a permanent snapshot of ALL staged files
# - The -m flag lets you write a message inline
# - The message describes WHAT changed and WHY
# - Each commit gets a unique ID like: a1b2c3d

# GOOD commit messages:
#   "Add contact form with server action validation"
#   "Fix hydration error in theme toggle"
#   "Update navbar with deployment page link"

# BAD commit messages:
#   "update"          ← What did you update?
#   "fix stuff"       ← What stuff?
#   "asdfasdf"        ← Meaningless`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Step 4: Create a GitHub Repository"
            language="text"
            code={`1. Go to github.com and sign in
2. Click the "+" button (top-right) → "New repository"
3. Repository name: Next.Js-Guide  (or any name you want)
4. Description: "A comprehensive Next.js learning guide"
5. Choose: Public (anyone can see) or Private (only you)
6. Do NOT check "Add a README" (we already have files)
7. Do NOT choose a .gitignore (Next.js already has one)
8. Click "Create repository"
9. GitHub will show you commands — use the ones below:`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Step 5: Connect Local Git to GitHub & Push"
            language="bash"
            code={`# Connect your local repo to GitHub (run once)
git remote add origin https://github.com/wajidashraf/Next.Js-Guide.git

# Verify the connection
git remote -v
# Should show:
# origin  https://github.com/wajidashraf/Next.Js-Guide.git (fetch)
# origin  https://github.com/wajidashraf/Next.Js-Guide.git (push)

# Push your code to GitHub (first time needs -u to set upstream)
git push -u origin main

# What this does:
# - Uploads ALL your committed code to GitHub
# - "origin" = the GitHub URL you just added
# - "main" = the branch name (default branch)
# - "-u" = sets this as the default push destination
#           so next time you can just type: git push`}
          />
        </div>

        <div className="mt-4">
          <Card title="⚠️ Authentication" variant="warning">
            <p className="mb-2">
              When you push for the first time, GitHub will ask for authentication.
              Passwords no longer work — you need a <strong>Personal Access Token (PAT)</strong>:
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)</li>
              <li>Click &quot;Generate new token (classic)&quot;</li>
              <li>Give it a name, set expiration, check the <code>repo</code> scope</li>
              <li>Click &quot;Generate token&quot; and <strong>copy it immediately</strong> (you can&apos;t see it again)</li>
              <li>When Git asks for your password, paste the token instead</li>
            </ol>
            <p className="mt-2 text-xs">
              <strong>Tip:</strong> To avoid entering the token every time, run:
              <code> git config --global credential.helper store</code>
            </p>
          </Card>
        </div>
      </section>

      {/* ========================================================
         PART 5: DAILY GIT WORKFLOW
      ======================================================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">📅 Part 5: Daily Git Workflow</h2>

        <Card title="The commands you'll use every day">
          <p className="mb-3">After the initial setup, your daily workflow is just 4 commands:</p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Daily Workflow: Edit → Stage → Commit → Push"
            language="bash"
            code={`# 1. Check what you've changed since last commit
git status

# 2. See actual line-by-line changes
git diff

# 3. Stage the files you want to save
git add .                  # Stage everything
git add app/forms/page.tsx # Or stage specific files

# 4. Commit with a descriptive message
git commit -m "Add form validation to contact page"

# 5. Push to GitHub
git push

# That's it! Your code is now backed up on GitHub.`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Pulling: Download Changes from GitHub"
            language="bash"
            code={`# Pull = Download latest code from GitHub to your computer
# Use this when:
# - You (or someone else) made changes on another computer
# - A teammate pushed new code
# - You edited files directly on GitHub

git pull

# What this does:
# 1. Downloads new commits from GitHub (git fetch)
# 2. Merges them into your local code (git merge)

# If you get a "merge conflict" — don't panic!
# Git will mark the conflicting lines in your files.
# Open the file, choose which version to keep, then:
git add .
git commit -m "Resolve merge conflict"`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Cloning: Download an Entire Repository"
            language="bash"
            code={`# Clone = Download a complete copy of a repository
# Use this to get a project onto a new computer

git clone https://github.com/wajidashraf/Next.Js-Guide.git

# What this does:
# 1. Creates a new folder called "Next.Js-Guide"
# 2. Downloads ALL files and ALL commit history
# 3. Automatically sets up the "origin" remote

# After cloning, install dependencies and run:
cd Next.Js-Guide
npm install        # Install all packages
npm run dev        # Start the development server`}
          />
        </div>
      </section>

      {/* ========================================================
         PART 6: GIT BRANCHING
      ======================================================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🌿 Part 6: Branches — Work on Features Safely</h2>

        <Card title="What Are Branches?" variant="info">
          <p className="mb-3">
            A <strong>branch</strong> is like a parallel universe for your code.
            You can create a branch, make changes on it, and your <code>main</code> branch
            stays completely untouched. When you&apos;re happy with the changes, you
            merge the branch back into <code>main</code>.
          </p>
          <p>
            <strong>Why use branches?</strong> Imagine you&apos;re adding a new feature but it&apos;s
            half-finished. Without branches, your main code is broken. With branches,
            you work separately and only merge when the feature is complete and tested.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Visual: How Branches Work"
            language="text"
            code={`main:          A ─── B ─── C ─────────── F (merge)
                               \\               /
feature/forms:                  D ─── E ──────

A = Initial commit
B = Add navbar
C = Add home page
D = Start working on forms (on a separate branch)
E = Finish forms feature
F = Merge forms branch into main → main now has everything`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Branch Commands"
            language="bash"
            code={`# See all branches (* = you are on this branch)
git branch
# * main

# Create a new branch AND switch to it
git checkout -b feature/contact-form
# Switched to a new branch 'feature/contact-form'

# Now any changes you make are ONLY on this branch
# Edit files, then commit normally:
git add .
git commit -m "Add contact form component"

# Push the new branch to GitHub
git push -u origin feature/contact-form

# Switch back to main branch
git checkout main

# Merge the feature branch into main
git merge feature/contact-form

# Push the merged main to GitHub
git push

# Delete the feature branch (optional, keeps things clean)
git branch -d feature/contact-form`}
          />
        </div>

        <div className="mt-4">
          <Card title="Branch Naming Conventions" variant="success">
            <ul className="list-disc list-inside space-y-1">
              <li><code>feature/contact-form</code> — New feature</li>
              <li><code>fix/hydration-error</code> — Bug fix</li>
              <li><code>update/navbar-links</code> — Update existing code</li>
              <li><code>refactor/forms-cleanup</code> — Code restructuring</li>
            </ul>
            <p className="mt-2 text-xs">
              Use lowercase and hyphens. The prefix makes it clear what the branch is for.
            </p>
          </Card>
        </div>
      </section>

      {/* ========================================================
         PART 7: .gitignore
      ======================================================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🚫 Part 7: .gitignore — What NOT to Upload</h2>

        <Card title="Never push these to GitHub!" variant="warning">
          <p className="mb-3">
            The <code>.gitignore</code> file tells Git which files to ignore.
            Next.js creates one for you automatically, but you should understand it:
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title=".gitignore — Files Git Should Ignore"
            language="text"
            code={`# Next.js creates this automatically — here's what each line means:

# Dependencies (huge! 100MB+, anyone can reinstall with npm install)
node_modules/

# Build output (generated from your source, not needed in Git)
.next/
out/

# Environment variables (SECRETS! API keys, database passwords)
.env
.env.local
.env.production

# OS junk files
.DS_Store          # Mac folder settings
Thumbs.db          # Windows thumbnails

# IDE settings (personal preferences, not project code)
.vscode/
.idea/

# RULE OF THUMB:
# If a file is GENERATED or contains SECRETS → add to .gitignore
# If a file is SOURCE CODE or CONFIG → commit it`}
          />
        </div>
      </section>

      {/* ========================================================
         PART 8: USEFUL GIT COMMANDS REFERENCE
      ======================================================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">📋 Part 8: Git Commands Cheat Sheet</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="text-left p-3 border border-gray-200 dark:border-gray-700">Command</th>
                <th className="text-left p-3 border border-gray-200 dark:border-gray-700">What It Does</th>
                <th className="text-left p-3 border border-gray-200 dark:border-gray-700">When to Use</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-xs">git init</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Start tracking a folder with Git</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Once, when starting a new project</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-xs">git status</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">See which files changed</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Before every commit</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-xs">git add .</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Stage all changed files</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Before every commit</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-xs">git commit -m &quot;msg&quot;</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Save a snapshot with a message</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">After staging files</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-xs">git push</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Upload commits to GitHub</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">After committing</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-xs">git pull</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Download latest from GitHub</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Before starting work</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-xs">git clone URL</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Download entire repository</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Get project on new computer</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-xs">git branch</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">List all branches</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Check which branch you&apos;re on</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-xs">git checkout -b name</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Create &amp; switch to new branch</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Starting a new feature</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-xs">git merge branch</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Merge a branch into current</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Feature is ready</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-xs">git log --oneline</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">View commit history</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Review what was done</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-xs">git diff</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Show line-by-line changes</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Review before committing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
         PART 9: DEPLOY ON VERCEL
      ======================================================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">▲ Part 9: Deploy on Vercel (Recommended)</h2>

        <Card title="Why Vercel?" variant="info">
          <p className="mb-3">
            Vercel is made by the <strong>same team that created Next.js</strong>.
            It&apos;s the easiest and most optimized way to deploy Next.js apps.
            Features include: automatic HTTPS, global CDN, preview deployments,
            serverless functions, and zero configuration.
          </p>
          <p className="text-xs">
            <strong>Free tier:</strong> Unlimited personal projects, 100GB bandwidth/month.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Deploy to Vercel — Step by Step"
            language="text"
            code={`STEP 1: Build Your Project Locally (Test First!)
═══════════════════════════════════════════════
$ npm run build

  This runs "next build" and checks for errors.
  If this fails → fix errors before deploying.
  If this succeeds → you're ready to deploy.

STEP 2: Push Your Code to GitHub
═══════════════════════════════════════════════
$ git add .
$ git commit -m "Ready for production deployment"
$ git push

STEP 3: Connect Vercel to GitHub
═══════════════════════════════════════════════
1. Go to vercel.com and click "Sign up"
2. Choose "Continue with GitHub" (links your account)
3. Click "Add New Project"
4. Select your repository: "Next.Js-Guide"
5. Vercel auto-detects it's a Next.js project ✓
6. Click "Deploy" — that's it!

STEP 4: Wait ~60 seconds
═══════════════════════════════════════════════
  Vercel will:
  ✓ Clone your repo
  ✓ Install dependencies (npm install)
  ✓ Build your project (npm run build)
  ✓ Deploy to a global CDN
  ✓ Give you a live URL like: nextjs-guide.vercel.app

STEP 5: Automatic Deployments (Forever!)
═══════════════════════════════════════════════
  From now on, every time you "git push" to main:
  → Vercel automatically rebuilds and deploys
  → Your live site updates in ~60 seconds
  → No manual action needed — ever!

BONUS: Preview Deployments
═══════════════════════════════════════════════
  If you push to a BRANCH (not main):
  → Vercel creates a temporary preview URL
  → You can test changes before merging to main
  → Teammates can review the preview link`}
          />
        </div>
      </section>

      {/* ========================================================
         PART 10: DEPLOY ON NETLIFY
      ======================================================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🔷 Part 10: Deploy on Netlify</h2>

        <Card title="Netlify — Another Great Option" variant="info">
          <p className="mb-3">
            Netlify is a popular alternative to Vercel. It supports Next.js via the
            <code> @netlify/plugin-nextjs</code> adapter and provides similar features:
            automatic deployments, preview URLs, and a generous free tier.
          </p>
          <p className="text-xs">
            Your Netlify team: <code>app.netlify.com/teams/wajidashraf/projects</code>
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Deploy to Netlify — Step by Step"
            language="text"
            code={`STEP 1: Push Code to GitHub (Same as Vercel)
═══════════════════════════════════════════════
$ git add .
$ git commit -m "Ready for Netlify deployment"
$ git push

STEP 2: Connect Netlify to GitHub
═══════════════════════════════════════════════
1. Go to app.netlify.com
2. Sign up / Log in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose "Deploy with GitHub"
5. Select your repository: "Next.Js-Guide"

STEP 3: Configure Build Settings
═══════════════════════════════════════════════
  Netlify should auto-detect these, but verify:
  
  Build command:    npm run build
  Publish directory: .next
  
  (Netlify's Next.js plugin handles the rest automatically)

STEP 4: Click "Deploy site"
═══════════════════════════════════════════════
  Netlify will:
  ✓ Clone your repository
  ✓ Install dependencies
  ✓ Run "npm run build"
  ✓ Deploy your app
  ✓ Give you a URL like: amazing-hopper-a1b2c3.netlify.app

STEP 5: Custom Domain (Optional)
═══════════════════════════════════════════════
  1. Go to Site settings → Domain management
  2. Click "Add a domain"
  3. Enter your domain name
  4. Follow DNS setup instructions

AUTOMATIC DEPLOYS: Same as Vercel!
═══════════════════════════════════════════════
  Every "git push" to main → Netlify auto-deploys
  Push to a branch → Netlify creates a preview URL`}
          />
        </div>
      </section>

      {/* ========================================================
         PART 11: VERCEL VS NETLIFY COMPARISON
      ======================================================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">⚖️ Part 11: Vercel vs Netlify</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="text-left p-3 border border-gray-200 dark:border-gray-700">Feature</th>
                <th className="text-left p-3 border border-gray-200 dark:border-gray-700">▲ Vercel</th>
                <th className="text-left p-3 border border-gray-200 dark:border-gray-700">🔷 Netlify</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Next.js Support</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Best (they made Next.js)</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Great (via adapter plugin)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Setup Difficulty</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Zero config</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Near-zero config</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Auto Deploy</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">✅ On every push</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">✅ On every push</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Preview Deploys</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">✅ Per branch/PR</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">✅ Per branch/PR</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Server Actions</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">✅ Full support</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">✅ Supported</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Free Tier</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Generous</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Generous</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Best For</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Next.js projects</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Any Jamstack project</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <Card title="💡 Recommendation" variant="success">
            <p>
              For Next.js projects, <strong>Vercel is the simplest choice</strong> because
              it&apos;s built by the same team — zero configuration, best performance,
              and first to support new Next.js features. Netlify is also excellent and
              may be preferred if you host other non-Next.js projects there already.
            </p>
          </Card>
        </div>
      </section>

      {/* ========================================================
         PART 12: PRODUCTION BUILD
      ======================================================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🏗️ Part 12: Production Build — What Happens</h2>

        <Card title="npm run build — Behind the Scenes" variant="info">
          <p className="mb-3">
            When you (or Vercel/Netlify) run <code>npm run build</code>, Next.js optimizes
            your entire app for production:
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="What 'npm run build' Does"
            language="text"
            code={`$ npm run build

Next.js performs these optimizations:
═══════════════════════════════════════════════

1. STATIC GENERATION (SSG)
   → Pages with no dynamic data are pre-rendered as HTML
   → These load INSTANTLY (served from CDN, no server needed)

2. CODE SPLITTING
   → Each page only loads the JavaScript it needs
   → User visiting /forms doesn't download /about code

3. IMAGE OPTIMIZATION
   → All <Image> components get optimized (WebP, lazy load)

4. CSS OPTIMIZATION
   → Tailwind purges unused classes (100KB → 10KB)
   → CSS is minified and inlined for critical path

5. TREE SHAKING
   → Unused code from libraries is removed
   → Only the functions you import end up in the bundle

6. MINIFICATION
   → JavaScript and CSS are compressed (remove spaces, shorten variables)

7. TYPE CHECKING
   → TypeScript errors are checked at build time
   → Build FAILS if there are type errors (catches bugs early!)

═══════════════════════════════════════════════
Build output folder: .next/
  → This is what gets deployed to Vercel/Netlify
  → Never commit .next/ to Git (it's in .gitignore)`}
          />
        </div>
      </section>

      {/* ========================================================
         PART 13: ENVIRONMENT VARIABLES
      ======================================================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🔐 Part 13: Environment Variables</h2>

        <Card title="Secrets in Production" variant="warning">
          <p className="mb-3">
            API keys, database URLs, and secrets should <strong>never be in your code</strong>.
            Use environment variables instead. They&apos;re set differently for local dev vs production.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Environment Variables in Next.js"
            language="bash"
            code={`# LOCAL DEVELOPMENT: Create a .env.local file
# (This file is in .gitignore — never pushed to GitHub!)

# .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
API_SECRET="my-super-secret-key"

# For variables that need to be accessible in the BROWSER,
# prefix them with NEXT_PUBLIC_
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# PRODUCTION: Set variables in your hosting dashboard
#
# Vercel:
#   Project Settings → Environment Variables → Add
#
# Netlify:
#   Site settings → Environment variables → Add

# ACCESS IN CODE:
# Server-side (API routes, Server Actions, Server Components):
#   process.env.DATABASE_URL
#   process.env.API_SECRET
#
# Client-side (Browser JavaScript):
#   process.env.NEXT_PUBLIC_SITE_URL   (only NEXT_PUBLIC_ vars!)
#   process.env.DATABASE_URL  ← UNDEFINED on client (by design!)`}
          />
        </div>
      </section>

      {/* ========================================================
         PART 14: COMPLETE WORKFLOW SUMMARY
      ======================================================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🎯 Complete Workflow Summary</h2>

        <div className="mt-4">
          <CodeExample
            title="From Code to Live Website — Full Workflow"
            language="text"
            code={`DEVELOPMENT CYCLE:
═══════════════════════════════════════════════

1. WRITE CODE
   → Edit files in VS Code
   → Test with: npm run dev (localhost:3000)

2. SAVE TO GIT
   → git add .
   → git commit -m "Describe what you changed"

3. PUSH TO GITHUB
   → git push
   → Code is now backed up online

4. AUTO-DEPLOY
   → Vercel/Netlify detects the push
   → Builds your project automatically
   → Deploys to a live URL
   → ✅ Your changes are live!

FEATURE DEVELOPMENT:
═══════════════════════════════════════════════

1. git checkout -b feature/new-page
2. Write code, test locally
3. git add . → git commit → git push
4. Vercel/Netlify creates a PREVIEW URL
5. Review the preview, test it
6. git checkout main → git merge feature/new-page
7. git push → PRODUCTION auto-updates
8. git branch -d feature/new-page (cleanup)`}
          />
        </div>
      </section>
    </div>
  );
}
