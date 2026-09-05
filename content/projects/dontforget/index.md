---
title: "dontforget"
description: "your edentic memory."
link: "https://github.com/vaproh/dontforget"
image: "/img/dontforget.png"
tags: ['python']
date: 2026-07-15
weight: 2
draft: false
---

> 🍴 **A fork of [`bugswriter/dontforget`](https://github.com/bugswriter/dontforget).**

[![PyPI version](https://img.shields.io/pypi/v/better-dontforget.svg)](https://pypi.org/project/better-dontforget/)
[![Python](https://img.shields.io/badge/python-3.11%2B-blue.svg)](https://www.python.org/)
[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0.en.html)
[![CI](https://github.com/vaproh/dontforget/actions/workflows/ci.yml/badge.svg)](https://github.com/vaproh/dontforget/actions/workflows/ci.yml)
[![code style: ruff](https://img.shields.io/badge/code%20style-ruff-000000.svg)](https://github.com/astral-sh/ruff)

**Better Dontforget** is a focused improvement of the upstream `dontforget`
project: an AI-assisted terminal tool for quickly capturing and retrieving small
personal memory dumps, with a better TUI, configurable AI providers, optional
reminders with persistent desktop notifications, optional per-note encryption,
XDG-compliant storage, and CLI/TUI-based configuration.

> It is a quick personal memory-dump tool. Reminders and encryption are optional
> and per-note. It is **not** a calendar, task manager, or full notes application.

## ✨ Features

* **⚡ Zero-friction capture:** `bdf "anything"`. Works offline; your input is
  never lost even if the AI is unavailable.
* **🔍 Search & AI recall:** full-text search (`search`) and AI-assisted answers
  (`remind`) over your memories (SQLite + FTS5).
* **🤖 Multiple AI providers:** Gemini (default), OpenAI-compatible (OpenAI,
  OpenRouter, self-hosted), and Groq — behind a small provider abstraction.
* **🖥️ Improved TUI:** live preview pane, in-place editing, encryption, reminders,
  settings, and a dark/light theme toggle — all keyboard-driven.
* **⏰ Optional reminders:** attach a due time via `--remind` or natural language
  ("remind me tomorrow to …").
* **🔔 Desktop notifications:** due reminders notify via `notify-send` (libnotify),
  with a one-shot `notify-pending` command and a systemd user timer.
* **📦 One-command notifier setup:** `bdf install-notifier` installs and enables
  the systemd timer — no manual file copying.
* **🔐 Optional per-note encryption:** authenticated (Fernet + PBKDF2),
  passphrase-based, explicit per note; encrypted content is never sent to AI.
* **📁 XDG-compliant storage** and **CLI/TUI configuration** (no manual file editing).

## 📦 Install

From [PyPI](https://pypi.org/project/better-dontforget/):

```bash
pip install better-dontforget
bdf config set provider gemini
bdf config set api_key "$GEMINI_API_KEY"
```

Or with [`uv`](https://docs.astral.sh/uv/):

```bash
uv tool install better-dontforget
```

Or, for development from source:

```bash
uv sync
bdf "anything"
```

The short alias **`bdf`** is installed alongside `better-dontforget`.

## 🚀 Quick start

```bash
bdf "ratatui was that rust tui library"
bdf "John recommended Severance"
bdf "remind me tomorrow 9am to check that library"
bdf search "rust tui"
bdf remind "what rust tui library was recommended?"
bdf list
bdf tui
```

Run `bdf --help` for the full list of commands and options.

See `docs/docs.md` for full usage and
`docs/config.md` for configuration.

## ⏰ Reminders & notifications

Attach a reminder to any note:

```bash
bdf --remind "tomorrow 9am" "check the library"
```

To have reminders delivered automatically (even while the app is closed), install
the notifier with a single command:

```bash
bdf install-notifier      # installs + enables a systemd user timer
bdf uninstall-notifier    # removes it
```

`bdf remind` (and capturing a note with `--remind`) will print a hint to run
`bdf install-notifier` when the notifier isn't active, so you never silently lose
a reminder.

> Linux-only: desktop notifications and the systemd timer use libnotify / systemd
> user units. Core capture/search/recall works everywhere Python does.

## 🛠️ Development

```bash
just install     # uv sync
just check       # format + lint + type + tests + build (canonical gate)
just test
just lint
just fmt
just type
```

## 📄 License

GPL-3.0. Upstream `dontforget` by Suraj Kushwah; legacy server/client retained
under `legacy/` for attribution.

## 🙏 Credits

Better Dontforget is a fork of [`bugswriter/dontforget`](https://github.com/bugswriter/dontforget)
by **Suraj Kushwah**. The original SQLite + FTS5 storage engine and AI-assisted
capture/recall concept are carried over and extended; the legacy FastAPI
server and bash `curl` client are preserved under `legacy/` for reference.
