# Webshop24 - Software Requirements Specification
## 1. Introduction
### 1.1 Purpose
Das Software Requirements Specification (SRS) beschreibt alle Spezifikationen für die Anwendung "Webshop24". Es enthält einen Überblick über das Projekt und seine Vision, detaillierte Informationen über die geplanten Funktionen und die Randbedingungen des Entwicklungsprozesses.
### 1.2 Scope
Das Projekt wird als Webapplikation realisiert.

Nutzer dieser Website sind die Betreiber der Website und die Kunden.

Geplante Untersysteme sind:
- ...
### 1.3 Definitions, Acronyms and Abbreviations
| Abkürzung | Erklärung                           |
|-----------|-------------------------------------|
| SRS       | Software Requirements Specification |
| UC        | Use Case                            |
| n/a       | not applicable                      |
| tbd       | to be determined                    |
| UCD       | overall Use Case Diagram            |
| FAQ       | Frequently asked Questions          |
### 1.4 References
| Titel                                                                   |   Datum    | Publishing organization |
|-------------------------------------------------------------------------|:----------:|-------------------------|
| [Webshop24 Blog](https://github.com/lucariebel/online-shop/discussions) | 17.10.2024 | Webshop24 Team          |
| [GitHub](https://github.com/lucariebel/online-shop)                     | 17.10.2024 | Webshop24 Team                   |
### 1.5 Overview
Das folgende Kapitel bietet einen Überblick über dieses Projekt mit einer Vision und einem Overall-Use-Case-Diagram. Das dritte Kapitel (Requirements Specification) enthält weitere Einzelheiten zu den spezifischen Anforderungen in Bezug auf Funktionalität, Benutzerfreundlichkeit und Designparameter. Schließlich gibt es ein Kapitel mit unterstützenden Informationen.
## 2. Overall Description
### 2.1 Vision
Unsere Produktvision ist es, eine einzigartige Online-Plattform zu schaffen, die sowohl Sofortkauf- als auch Auktionsfunktionen bietet. Wir bieten eine breite Palette an coolen Produkten an, von Streetwear bis hin zu getunten Autos. Unser Ziel ist es, eine Anlaufstelle für Trendsetter zu sein.
### 2.2 Use Case Diagram
### 2.3 Technology Stack
- Frontend: Angular
- Backend: ASP.NET
- Datenbank: SQLite
- IDE: JetBrains Webstorm & Rider
- Projektmanagement: Jira
## 3. Specific Requirements
### 3.1 Functionality
#### 3.1.1 Nach Produkten suchen
Diese Funktion bietet einen Überblick über alle verfügbaren Produkte im Shop. Nutzer können Produkte durchsuchen, die ihren Interessen entsprechen, und mithilfe von Filtern das Angebot verfeinern. Aus der Übersicht können sie ein Produkt auswählen und sich dessen Details ansehen.

[Nach Produkten suchen](../doc/use_cases/search_product.md)

#### 3.1.2 Benutzerkonto erstellen
Diese Funktion erlaubt es Nutzern, ein Konto im Webshop zu erstellen. Alle nötigen Informationen werden in einem Formular gesammelt. Nach der Registrierung haben Nutzer Zugang zu personalisierten Funktionen und können an Auktionen teilnehmen.

[Benutzerkonto erstellen](../doc/use_cases/create-user-account.md)

#### 3.1.3 Auktion für ein Produkt erstellen
Diese Funktion ermöglicht es Nutzern, eigene Produkte zur Auktion anzubieten. Alle wichtigen Informationen zum Produkt und zur Auktion werden hier hinzugefügt. Von der Übersicht aus können andere Nutzer auf das Produkt bieten.

[Auktion für ein Produkt erstellen](../doc/use_cases/create-auction.md)

#### 3.1.4 Auf ein Produkt bieten
Diese Funktion ermöglicht es Nutzern, an laufenden Auktionen teilzunehmen. Alle aktiven Gebote werden hier gesammelt. Nutzer können ein Produkt auswählen, ein Gebot abgeben und den Status der Auktion verfolgen.

[Auf ein Produkt bieten](../doc/use_cases/bid-on-product.md)

#### 3.1.5 Bietverlauf und Auktionen verfolgen
Diese Funktion bietet einen Überblick über alle aktiven Auktionen und die abgegebenen Gebote des Nutzers. Nutzer können hier den Status ihrer Gebote verfolgen und sehen, ob sie noch das höchste Gebot halten.

[Bietverlauf und Auktionen verfolgen](../doc/use_cases/track-bidding-and-auctions.md)

### 3.2 Usability
### 3.3 Reliability
### 3.4 Performance
### 3.5 Supportability
### 3.6 Design Constraints
### 3.7 On-line User Documentation and Help System Requirements
### 3.8 Purchased Components
### 3.9 Interfaces
#### 3.9.1 User Interfaces
#### 3.9.2 Hardware Interfaces
#### 3.9.3 Software Interfaces
#### 3.9.4 Communication Interfaces
### 3.10 Licensing Requirements
### 3.11 Legal, Copyright, and Other Notices
### 3.12 Applicable Standards
## 4. Supporting Information