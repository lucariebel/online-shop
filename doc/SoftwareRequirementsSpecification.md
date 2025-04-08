# Webshop24 - Software Requirements Specification
## 1. Introduction
### 1.1 Purpose
Das Software Requirements Specification (SRS) beschreibt alle Spezifikationen für die Anwendung "Webshop24". Es enthält einen Überblick über das Projekt und seine Vision, detaillierte Informationen über die geplanten Funktionen und die Randbedingungen des Entwicklungsprozesses.
### 1.2 Scope
Dieses Software Requirements Specification (SRS)-Dokument hat das Ziel, die Anforderungen und das Verhalten der Wiki-Plattform umfassend zu beschreiben. Die Plattform soll es Nutzern ermöglichen, eigene Wiki-Seiten für ihre Communities zu erstellen, zu bearbeiten und zu verwalten. Dabei werden sowohl funktionale Anforderungen – wie die Benutzerauthentifizierung und das Anlegen von Seiten – als auch nicht-funktionale Anforderungen, etwa in Bezug auf Performance, Sicherheit und Zuverlässigkeit, berücksichtigt. Zusätzlich werden in diesem Dokument Designeinschränkungen festgelegt, die eine hohe Skalierbarkeit und gute Zugänglichkeit für die Nutzer sicherstellen. Das SRS dient als zentrale Orientierungshilfe für die Entwicklungs- und Testteams während des gesamten Projektverlaufs.
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
| [GitHub](https://github.com/lucariebel/online-shop)                     | 17.10.2024 | Webshop24 Team          |
### 1.5 Overview
Das folgende Kapitel bietet einen Überblick über dieses Projekt mit einer Vision und einem Overall-Use-Case-Diagram. Das dritte Kapitel (Requirements Specification) enthält weitere Einzelheiten zu den spezifischen Anforderungen in Bezug auf Funktionalität, Benutzerfreundlichkeit und Designparameter. Schließlich gibt es ein Kapitel mit unterstützenden Informationen.
## 2. Overall Description
### 2.1 Vision
Unsere Produktvision ist es, eine einzigartige Online-Plattform zu schaffen, die sowohl Sofortkauf- als auch Auktionsfunktionen bietet. Wir bieten eine breite Palette an coolen Produkten an, von Streetwear bis hin zu getunten Autos. Unser Ziel ist es, eine Anlaufstelle für Trendsetter zu sein.
### 2.2 Use Case Diagram
![overall-use-case-diagram](/doc/use-cases/overall-use-case-diagram.png)
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

[Nach Produkten suchen](use-cases/UC01-search-product.md)

#### 3.1.2 Benutzerkonto erstellen
Diese Funktion erlaubt es Nutzern, ein Konto im Webshop zu erstellen. Alle nötigen Informationen werden in einem Formular gesammelt. Nach der Registrierung haben Nutzer Zugang zu personalisierten Funktionen und können an Auktionen teilnehmen.

[Benutzerkonto erstellen](use-cases/UC02-create-user-account.md)

#### 3.1.3 Auktion für ein Produkt erstellen
Diese Funktion ermöglicht es Nutzern, eigene Produkte zur Auktion anzubieten. Alle wichtigen Informationen zum Produkt und zur Auktion werden hier hinzugefügt. Von der Übersicht aus können andere Nutzer auf das Produkt bieten.

[Auktion für ein Produkt erstellen](use-cases/UC03-create-auction.md)

#### 3.1.4 Auf ein Produkt bieten
Diese Funktion ermöglicht es Nutzern, an laufenden Auktionen teilzunehmen. Alle aktiven Gebote werden hier gesammelt. Nutzer können ein Produkt auswählen, ein Gebot abgeben und den Status der Auktion verfolgen.

[Auf ein Produkt bieten](use-cases/UC04-bid-on-product.md)

#### 3.1.5 Bietverlauf und Auktionen verfolgen
Diese Funktion bietet einen Überblick über alle aktiven Auktionen und die abgegebenen Gebote des Nutzers. Nutzer können hier den Status ihrer Gebote verfolgen und sehen, ob sie noch das höchste Gebot halten.

[Bietverlauf und Auktionen verfolgen](use-cases/UC05-track-bidding-and-auctions.md)

### 3.2 Usability
Die Anforderungen an die Benutzerfreundlichkeit legen den Fokus darauf, die Plattform sowohl für technisch versierte als auch weniger erfahrene Nutzer zugänglich und einfach zu bedienen zu gestalten. Das System sollte aktuellen Usability-Standards entsprechen und eine effiziente Interaktion für sowohl reguläre Nutzer als auch Administratoren gewährleisten.
### 3.3 Reliability
#### 3.3.1 Availability
Description: Die Plattform sollte zu 99,5 % der Zeit verfügbar sein, wobei geplante Wartungsarbeiten
außerhalb der Hauptverkehrszeiten stattfinden.
MTBF: Die mittlere Betriebsdauer zwischen zwei Ausfällen sollte mindestens 1.000 Stunden
betragen.
MTTR: Die mittlere Reparaturzeit sollte bei Systemausfällen 8 Stunden nicht überschreiten.
### 3.4 Performance
Load Times: Jede Seite des Online-Shops sollte von dem System in unter einer Sekunde laden
Capacity: Die Plattform sollte bis zu 5.000 aktive Nutzer zu einem bestimmten Zeitpunkt ohne
Leistungseinbußen unterstützen.
### 3.5 Supportability
Maintenance Access: Die Plattform sollte Systemadministratoren eine benutzerfreundliche Oberfläche zur Verfügung stellen, über die Wartungsaufgaben wie Datensicherungen, Softwareaktualisierungen und die Überwachung der Systemleistung einfach durchgeführt werden können.
### 3.6 Design Constraints
#### 3.6.1 Verwendete Programmiersprachen
Das System wird in den folgenden Programmiersprachen entwickelt:
- **C#**: Als Hauptprogrammiersprache für die Backend-Entwicklung unter Verwendung von ASP.NET.
- **HTML, CSS und JavaScript/TypeScript**: Für die Frontend-Entwicklung, um eine ansprechende Benutzeroberfläche zu gewährleisten.
  Das Entwicklungsteam muss den Agilen Softwareentwicklungsprozess einsetzen, um fortlaufende, schrittweise Fortschritte zu erzielen. Dazu gehören regelmäßige Sprint-Planungen, Reviews und Retrospektiven zur stetigen Verbesserung des Prozesses.
#### 3.6.2 Softwareentwicklungsprozess
Das Entwicklungsteam muss den Agilen Softwareentwicklungsprozess einsetzen, um fortlaufende, schrittweise Fortschritte zu erzielen. Dazu gehören regelmäßige Sprint-Planungen, Reviews und Retrospektiven zur stetigen Verbesserung des Prozesses.
#### 3.6.3 Entwicklungswerkzeuge
Für die Erstellung der Anwendung sind die folgenden Entwicklungswerkzeuge vorgeschrieben:
- **Git**: Für die Versionskontrolle des Quellcodes, um die Zusammenarbeit im Team zu ermöglichen.
#### 3.6.4 Architektur- und Designbeschränkungen
Das System muss eine Client-Server-Architektur verwenden, bei der der Server für die Geschäftslogik und die Verwaltung der Datenbank zuständig ist, während der Client (Browser) die Benutzeroberfläche bereitstellt. Diese Architektur soll die Skalierbarkeit und Wartbarkeit der Anwendung gewährleisten.
#### 3.6.5 Verwendung von gekauften Komponenten
Es werden keine gekauften Komponenten eingesetzt; alle Teile der Anwendung werden selbst entwickelt.
### 3.7 On-line User Documentation and Help System Requirements
Die Plattform wird ein integriertes Hilfesystem bereitstellen, das Anleitungen und häufig gestellte Fragen (FAQ) für sowohl reguläre Nutzer als auch Redakteure umfasst. Der Zugriff auf dieses System erfolgt über das Hauptnavigationsmenü.
### 3.8 Purchased Components
Für den Online-Shop sind keine gekauften Komponenten notwendig. Das gesamte System wird mit Open-Source-Technologien und eigenem Code entwickelt, wodurch zusätzliche Kosten für Lizenzgebühren oder spezielle Komponenten entfallen.
### 3.9 Interfaces
#### 3.9.1 User Interfaces
Die Plattform wird über eine responsive, webbasierte Benutzeroberfläche mit intuitiver Navigation verfügen, die den Nutzern unter anderem das Erstellen von Auktionen sowie das Bieten auf bestehende Auktionen ermöglicht.
#### 3.9.2 Hardware Interfaces
Das System wird cloudbasiert betrieben, sodass keine direkten Hardware-Schnittstellen notwendig sind.
#### 3.9.3 Software Interfaces
Der Online-Shop besitzt eine eigene API, welche jedoch nur für die Entwicklung zugänglich ist.
#### 3.9.4 Communication Interfaces
Die Plattform nutzt die Standardprotokolle HTTP und HTTPS, um eine sichere und zuverlässige Übertragung von Daten zu gewährleisten.
### 3.10 Licensing Requirements
Die Plattform erfüllt sämtliche Lizenzvorgaben für Drittanbieter-Bibliotheken, und alle Beiträge zur Plattform stehen unter einer permissiven Open-Source-Lizenz, wie beispielsweise der MIT-Lizenz.
### 3.11 Legal, Copyright, and Other Notices
Die Plattform wird die gesetzlich vorgeschriebenen Urheberrechtshinweise sowie die gängigen Haftungsausschlüsse enthalten.
### 3.12 Applicable Standards
Die SOLID-Prinzipien sollen für die Entwicklung des Online-Shops eingehalten werden.
## 4. Supporting Information
Für weitere Informationen können Sie das Team kontaktieren oder unseren Blog besuchen. Die Mitglieder des Teams sind:
- Luca Riebel
- Stefan Schäfer
- Oskar Barsch
- Sebastian Albert
- Philip Sagawe