# Test Plan – WebShop24

## Cover Page

**Projekt:** WebShop24  
**Testplan für:** Webshop Frontend und Backend  
**Verantwortlich:** Luca Riebel  
**Datum:** 28.04.2025

---

# 1. Introduction

## 1.1 Purpose

Dieser Testplan beschreibt die Teststrategie für das Projekt *WebShop24*. Er definiert die eingesetzten Testarten, die angestrebte Testabdeckung, verwendete Werkzeuge sowie das Vorgehen zur Qualitätssicherung.

## 1.2 Scope

Der Testplan umfasst Tests des **Frontends** (Angular), des **Backends** (ASP.NET) sowie der **REST-APIs**.  
Folgende Testarten werden eingesetzt:
- Unit-Tests
- API-Tests (Integrationstests)

Nicht abgedeckt:
- Last- und Performancetests
- UI-/End-to-End-Tests

## 1.3 Intended Audience

Dieser Plan richtet sich an das Entwickler- und Testteam sowie an betreuende Personen im Projektkontext.

---

# 2. Evaluation Mission and Test Motivation

## 2.1 Evaluation Mission

Ziel ist es, Fehler frühzeitig zu identifizieren, die korrekte Funktion der Anwendung sicherzustellen und schwerwiegende Defekte zu vermeiden, die die Benutzererfahrung negativ beeinflussen könnten.

## 2.2 Test Motivators

- Sicherstellung zentraler Funktionen (Produkte anzeigen, Auktionen erstellen, Gebote abgeben)
- Minimierung technischer Risiken (z. B. nicht funktionierende Schnittstellen)
- Einhaltung von Qualitätsstandards trotz begrenzter Zeit und Ressourcen

---

# 3. Target Test Items

- Angular-Frontend-Komponenten (Services, Pipes, Logik)
- ASP.NET-Backend-Komponenten (Controller, Services, Modelle)
- RESTful-APIs (GET, POST, PUT, DELETE-Endpunkte)

---

# 4. Outline of Planned Tests

## 4.1 Test Inclusions

- **Frontend:**
  - Unit-Tests mit Jasmine und Karma

- **Backend:**
  - Unit-Tests mit NUnit
  - API-Tests über **Swagger** (manuell)

## 4.2 Test Exclusions

- Keine Lasttests, Performance- oder UI-Tests vorgesehen

---

# 5. Test Approach

## 5.1 Testing Techniques and Types

### 5.1.1 Unit Testing

- **Frontend:** Unit-Tests für Komponenten, Services und Pipes mit Jasmine/Karma
- **Backend:** Unit-Tests für Klassen und Methoden mit NUnit

### 5.1.2 Integration Testing (API-Tests)

- Manuelles Testen der REST-Endpunkte über **Swagger**
- Prüfung auf Statuscodes, Antwortzeiten und Datenstruktur

---

# 6. Entry and Exit Criteria

## 6.1 Entry Criteria

- Alle geplanten Funktionen sind implementiert und lokal ausführbar
- Entwicklerumgebung für Tests ist eingerichtet

## 6.2 Exit Criteria

- Testabdeckung von 20–30 % im Frontend und Backend erreicht
- Alle wichtigen Unit- und API-Tests bestehen fehlerfrei

---

# 7. Deliverables

- **Testberichte:**
  - Jasmine/Karma-Reports für Frontend
  - NUnit-Reports für Backend
  - Swagger-Checkliste (manuelle API-Prüfung)

- **Testabdeckungsberichte:**
  - Automatisch generiert durch Karma (Frontend) und Coverage-Tools (Backend)

- **Fehlerdokumentation:**
  - Verwaltung über Git (Issues und Commit-Referenzen)

---

# 8. Testing Workflow

- Entwickler schreiben Unit-Tests parallel zur Implementierung
- Tests werden lokal am Entwickler-PC (z. B. mit VS Code oder Visual Studio) ausgeführt
- Vor jedem Commit werden die Tests manuell durchgeführt
- Wöchentlicher Überblick über den Teststatus
- Keine CI/CD-Automatisierung, nur manuelle Testausführung

---

# 9. Environmental Needs

- **Frontend-Testumgebung:**
  - Node.js + Angular CLI
  - Jasmine, Karma

- **Backend-Testumgebung:**
  - .NET 7 oder höher
  - NUnit, Swagger

- **Hardware:**
  - Lokale Entwicklerrechner

---

# 10. Responsibilities, Staffing, and Training Needs

- **Testverantwortlich:** Luca Riebel
- **Pflege der Testfälle:** Jeder Entwickler ist für die eigenen Tests verantwortlich
- **Schulungen:** Keine erforderlich – Grundkenntnisse in Jasmine, Karma und NUnit werden vorausgesetzt

---

# 11. Risks, Dependencies, Assumptions, and Constraints

| Risiko                              | Maßnahme                                 |
|------------------------------------|-------------------------------------------|
| Geringe Testabdeckung durch Zeitdruck | Konzentration auf Kernfunktionen         |
| Fehlerhafte Testumgebung             | Frühe Einrichtung und Toolprüfung         |
| Änderungen an API-Struktur           | Enge Abstimmung zwischen Frontend/Backend |

---

# Summary

- Fokus auf Unit- und API-Tests
- Ziel: 20–30 % Testabdeckung
- Manuelle Tests auf lokalen Entwicklerrechnern
- Dokumentation über Git und automatische Reports (Jasmine, Karma, NUnit)
- Keine CI/CD-Integration
