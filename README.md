# klarTEXT – Barrierefreies Lernen

**klarTEXT** ist eine innovative Web-App, die Menschen dabei unterstützt, ihre Aussprache zu optimieren und komplexe Texte automatisch zu vereinfachen. Das Projekt wurde im Rahmen von **Jugend forscht** entwickelt und vereint moderne Webtechnologien mit KI-gestützter Sprachanalyse.

> [!IMPORTANT]
> **Erforderliches Backend:** Das Frontend benötigt zwingend das passende Backend, um zu funktionieren:  
> 👉 [klarTEXT Backend auf GitHub](https://github.com/Superdaadi/klarText-Backend)

---

## 🎯 Ziel des Projekts

Viele Menschen – insbesondere Menschen mit Migrationshintergrund oder Sprachbarrieren – stehen vor der Herausforderung, komplexe Texte zu verstehen oder die korrekte Betonung schwieriger Wörter zu meistern. **klarTEXT** bietet hier digitale Unterstützung auf zwei Ebenen:

* **Aussprachehilfe:** Nutzer können Wörter oder Sätze einsprechen und ihre eigene Aussprache gezielt trainieren.
* **Textvereinfachung:** Komplexe Inhalte werden automatisch auf ein leicht verständliches Sprachniveau umgeschrieben.
---

## ✨ Kernfunktionen

### 1. Ausspracheanalyse & Feedback
* **Audioverarbeitung:** Aufnahme und lokale Verarbeitung von `.wav`-Dateien.
* **Referenz-Audio:** Wiedergabe der korrekten Aussprache als Vorbild.
* **Detail-Analyse:** Vergleich der eigenen Stimme mit dem Zielklang inklusive Analyse der Betonung einzelner Laute.
* **Echtzeit-Feedback:** Sofortige Rückmeldung zur Verbesserung der Sprechweise.

### 2. Intelligente Textvereinfachung
* **KI-Analyse:** Deep-Learning-Modelle analysieren die Struktur des eingegebenen Textes.
* **Leichte Sprache:** Transformation in eine klare, gut lesbare Version.
* **Fokus:** Optionale Hervorhebung besonders komplexer Satzpassagen oder Begriffe.

---

## 🛠️ Technische Umsetzung

* **Frontend:** Entwickelt mit **Angular** (HTML, SCSS, TypeScript) für eine reaktive Benutzeroberfläche.
* **Backend:** Hybride Architektur aus einem **Node.js** Server (API-Management) und einem **Python**-Backend für die KI-Modelle.
* **Sprachmodelle:** Einsatz moderner LLMs und Speech-to-Text/Text-to-Speech Frameworks zur Analyse und Vereinfachung.

---

## 📦 Installation (für Entwickler)

```bash
# Repository klonen
git clone https://github.com/Superdaadi/klarText.git
cd klartext

# Abhängigkeiten installieren
npm install

# Webserver starten
ng serve
```

---

## 🧪 Roadmap & Zukunftsvision

* Lernhistorie: Speicherung persönlicher Fortschritte zur Langzeitanalyse.
* Multi-Level-Simplify: Auswahl verschiedener Schwierigkeitsstufen (z. B. "Einfach" vs. "Leichte Sprache").
* Mobile App: Native Erweiterung für das Training von unterwegs.
* Multilingualität: Unterstützung weiterer Ausgangssprachen.

---

## 📄 Lizenz

Dieses Projekt steht unter der GNU GPLv3.

---


