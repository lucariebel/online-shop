# Software Architecture Document

- [Software Architecture Document](#software-architecture-document)
    - [1. Introduction](#1-introduction)
        - [1.1 Purpose](#11-purpose)
        - [1.2 Scope](#12-scope)
        - [1.3 Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
        - [1.4 References](#14-references)
        - [1.5 Overview](#15-overview)
    - [2. Architecural Represetation](#2-architecural-represetation)
    - [3. Architectural Goals and Constraints](#3-architectural-goals-and-constraints)
    - [4. Use-Case View](#4-use-case-view)
        - [4.1 Use-Case Realizations](#41-use-case-realizations)
    - [5. Logical View](#5-logical-view)
        - [5.1 Overview](#51-overview)
        - [5.2 Architecturally Siginificant Design Packages](#52-architecturally-siginificant-design-packages)
    - [6. Process View](#6-process-view)
    - [7. Deployment View](#7-deployment-view)
    - [8. Implementation View](#8-implementation-view)
        - [8.1 Overview](#81-overview)
        - [8.2 Layers](#82-layers)
    - [9. Data View (optional)](#9-data-view-optional)
    - [10. Size and Performance](#10-size-and-performance)
    - [11. Quality](#11-quality)

## 1. Introduction
Dieses Dokument enthält die Spezifikation der Anwendungsfall Realisierung für den Anwendungsfall "Produkte durchsuchen".
Es bietet einen umfassenden Überblick über die Implementierung dieses Anwendungsfalls innerhalb unseres Online-Store-Projekts.
Das Dokument enthält den Zweck, den Umfang, Definitionen, Referenzen,
eine detaillierte Beschreibung des Designs und abgeleitete Anforderungen,
die bei der Implementierung berücksichtigt werden müssen.
### 1.1 Purpose
Der Zweck dieser Spezifikation zur Realisierung des Anwendungsfalls ist die Definition
und Beschreibung der technischen Implementierung des Anwendungsfalls "Produkte durchsuchen".
Sie dient als Leitfaden für das Entwicklungsteam, um sicherzustellen,
dass alle funktionalen und nicht-funktionalen Anforderungen korrekt und effizient umgesetzt werden.
### 1.2 Scope
Enthält Kategorien wie Navigation, Produktsuche und Filteranwendung.
### 1.3 Definitions, Acronyms and Abbreviations
- **Use Case**: Handlungen zur Erreichung eines bestimmten Ziels.
- **Mockup**: Visuelle Darstellung der Benutzeroberfläche.
- **Sequenzdiagramm**: Diagramm, das die Interaktionen von Objekten im Zeitverlauf zeigt.
- **UML**: Vereinheitlichte Modellierungssprache.
- **n.A.**: nicht anwendbar.
### 1.4 References
**n.a**
### 1.5 Overview
Dieses Dokument enthält einen präzisen Plan für die Implementierung des Anwendungsfalls "Produkte durchsuchen" in unserem Online-Shop.
Es umfasst den Zweck und den Umfang der Funktionalität, Schlüssel Definitionen, relevante Referenzen, einen detaillierten Designfluss von Ereignissen und abgeleitete Anforderungen.
Ziel ist es, das Entwicklungsteam bei der effizienten Umsetzung der Produkt-Durchsuchen Funktionen anzuleiten und sicherzustellen, dass alle Anforderungen erfüllt werden.
## 2. Architecural Represetation
![archiecural-representation.png](component-diagrams)
-

1. **Benutzeraktion**: Der Benutzer gibt einen Suchbegriff in die Suchleiste auf der Website ein.
2. **Frontend-Anfrage**: Das Frontend sendet eine "Search Product"-Anfrage an das Backend, einschließlich des vom Benutzer eingegebenen Suchbegriffs.
3. **Backend zur Datenbank**: Das Backend verarbeitet die Anfrage und sendet eine "get products from database"-Abfrage an die Datenbank, wobei der Suchbegriff zum Filtern der Produkte verwendet wird.
4. **Antwort der Datenbank**: Die Datenbank liefert eine Liste der Produkte, die den Suchkriterien entsprechen.
5. **Backend an Frontend**: Das Backend sendet die gefilterte Produktliste zurück an das Frontend.
6. **Anzeige im Frontend**: Das Frontend zeigt die Liste der passenden Produkte auf dem Bildschirm an, damit der Benutzer sie durchsuchen kann.

## 3. Architectural Goals and Constraints

1. **Logische Sicht:** Die Plattform besteht aus klar getrennten Modulen wie Benutzerverwaltung, Auktionslogik und Produktdatenbank.
2. **Prozess-Sicht:** Echtzeit-Updates werden über das Observer-Pattern umgesetzt, sodass alle Nutzer sofort über Änderungen informiert werden.
3. **Physische Sicht:** Load Balancing und skalierbare Cloud-Server gewährleisten hohe Verfügbarkeit.
4. **Entwicklungssicht:** Die Entwicklung erfolgt modular mit Angular für das Frontend und ASP.NET für das Backend. SQLite dient als Datenbank, unterstützt durch Caching mit Redis.

## 4. Use-Case View

### 4.1 Use-Case Realizations

## 5. Logical View

### 5.1 Overview

### 5.2 Architecturally Siginificant Design Packages

## 6. Process View

### Nach Produkten suchen

![UC01-sequence-diagram](/doc/use-cases/sequence-diagrams/UC01-search-product.png)

#### Beschreibung des Ablaufs

1. **Eingabe:** Der Nutzer gibt ein Suchwort auf der Website ein.
2. **Anfrage:** Die Website sendet die Methode `searchProduct()` an den `searchService`.
3. **Datenbankabfrage:** Der `searchService` ruft passende Produkte aus der `Database` ab.
4. **Antwort:** Die Ergebnisse werden über den `searchService` an die Website zurückgegeben und dem Nutzer angezeigt.

#### Schnittstellen

- **Website → searchService:**  
  Übergabe des Suchworts.
- **searchService → Database:**  
  Datenbankabfrage basierend auf dem Suchwort.
- **Database → searchService:**  
  Rückgabe der Produktdaten.
- **searchService → Website:**  
  Rückgabe einer Produktliste zur Anzeige.

### Benutzerkonto erstellen

![UC02-sequence-diagram](/doc/use-cases/sequence-diagrams/UC02-create-user-account.png)

#### Beschreibung des Ablaufs

1. **Eingabe:** Der Nutzer gibt Benutzername und Passwort auf der Website ein und klickt auf "Registrieren".
2. **Anfrage:** Die Website sendet die Methode `postUser()` an den `Userservice`.
3. **Datenbankoperation:** Der `Userservice` fügt die Benutzerdaten in die `Database` ein.
4. **Antwort:** Die `Database` bestätigt den Eintrag, und der `Userservice` gibt die Benutzerdaten an die Website
   zurück, die dem Nutzer eine Bestätigung anzeigt.

#### Schnittstellen

- **Website → Userservice:**  
  Übergabe der Benutzerdaten.
- **Userservice → Database:**  
  Datenbankoperation zum Einfügen neuer Daten.
- **Database → Userservice:**  
  Rückmeldung über den Erfolg der Operation.
- **Userservice → Website:**  
  Rückgabe der Benutzerdaten oder einer Erfolgsnachricht.

### Auktion für ein Produkt erstellen

![UC03-sequence-diagram](/doc/use-cases/sequence-diagrams/UC03-create-auction.png)

#### Beschreibung des Ablaufs

1. **Eingabe:** Der Nutzer gibt auf der Website die Auktionsdetails ein (z. B. Titel, Beschreibung, Startpreis) und
   klickt auf "Auktion erstellen".
2. **Anfrage:** Die Website sendet die Methode `createAuction()` an den `AuctionService`.
3. **Datenbankoperation:** Der `AuctionService` fügt die Auktionsdaten in die `Database` ein.
4. **Antwort:** Die `Database` bestätigt den Eintrag, und der `AuctionService` gibt die Auktionsdetails an die Website
   zurück, die dem Nutzer eine Bestätigung anzeigt.

#### Schnittstellen

- **Website → AuctionService:**  
  Übergabe der Auktionsdaten.
- **AuctionService → Database:**  
  Datenbankoperation zum Einfügen neuer Auktionsdaten.
- **Database → AuctionService:**  
  Rückmeldung über den Erfolg der Operation.
- **AuctionService → Website:**  
  Rückgabe der Auktionsdetails oder einer Erfolgsnachricht.

## 7. Deployment View

## 8. Implementation View

### 8.1 Overview

#### Ganzes Komponentendiagramm

![component-diagram](/doc/component-diagrams/component-diagram.png)

##### Beschreibung des Ablaufs

Der Benutzer gibt auf der Webseite des Webshops Benutzername und Passwort ein. Dann drückt er auf den Button 
`CreateUser`. Ein Benutzer Account wird erstellt. Der Benutzer wird auf die Startseite des Webshops geleitet.
Er kann nun verschiedene `Buttons` drücken. Ein `Button` heißt `SearchProduct`. Wenn der Benutzer auf den `Button`
`SearchProduct` drückt, dann kann er ein Produkt suchen. Die gesuchten Produkte werden in einer Liste angezeigt.
Wenn der Benutzer auf ein Produkt klickt, dann öffnet es sich. Nun kann er auf den Button `Bid` drücken um ein Gebot abzugeben. 
Ein anderer `Button` heißt `CreateAuction`. Wenn der Benutzer den `Button` anklickt, dann kann er eine Auktion 
erstellen. Ein anderer `Button` heißt `TrackBiddingAndAuctions`. Wenn der Benutzer diesen `Button` drückt, dann 
kann er seine Auktionen und Gebote verfolgen.  

### 8.2 Layers

#### Nach Produkten suchen

![UC01-component-diagram](/doc/component-diagrams/search-product.png)

##### Beschreibung des Ablaufs

Der Benutzer ist auf der Startseite des Webshops und gibt ein Produktname ein. Er drückt auf den Button `SearchProduct`. 
Die Datenbank bekommt von der Webseite, den vom Benutzer eingegebenen Produktnamen zugeschickt. Die Datenbank gleicht 
ihre Produktnameneinträge mit den eingegebenen Produktnamen ab. Wenn der eingegebene Produktname übereinstimmt,
dann gibt die Datenbank die Produkte, welche übereinstimmen in einer Liste an die Webseite zurück. Der Benutzer 
sieht nun die gesuchten Produkte.

#### Benutzerkonto erstellen

![UC02-component-diagram](/doc/component-diagrams/create-user-account.png)

##### Beschreibung des Ablaufs

Der Benutzer gibt auf der Webseite des Webshops einen Benutzernamen und ein Passwort ein. Dann drückt er auf den Button 
`CreateUser`. Die Webseite sendet den Benutzernamen und das Passwort an die Datenbank. Die Datenbank speichert
den Benutzernamen und das Passwort ab. Wenn das passiert ist, ladet die Webseite die Startseite. Somit ist der Benutzer
auf der Startseite.      

#### Auktion für ein Produkt erstellen

![UC03-component-diagram](/doc/component-diagrams/create-auction.png)

##### Beschreibung des Ablaufs

Der Benutzer befindet sich auf der Startseite des Webshops. Wenn der Benutzer auf den Button `CreateAuction`
drückt, öffnet sich auf der Webseite ein Formular mit Eingabefeldern. Dort kann der Benutzer Informationen zum Produkt,
dass er verkaufen möchte, eingeben. Wenn der Benutzer alle Eingabefelder ausgefüllt hat, kann er auf den Button `CreateAuction`
drücken. Die Webseite sendet die Informationen vom Produkt an die Datenbank. Die Datenbank speichert die Informationen des Produktes.
Wenn das passiert ist, dann ladet die Webseite wieder die Startseite. Nun ist der Benutzer wieder auf der Startseite.

## 9. Data View (optional)

## 10. Size and Performance
- **Maximale Nutzeranzahl:** 5.000 aktive Nutzer gleichzeitig
- **Lade Zeiten:** Die Ladezeiten der Browser Seiten sollt jederzeit unter einer Sekunde bleiben.


## 11. Quality
#### Die Wichtigsten  Architekturtaktik zusammengefasst:
- **Performance:** Das System muss unter Last schnell bleiben. Gebote sollen innerhalb von einer Sekunde verarbeitet werden, auch wenn viele Nutzer gleichzeitig aktiv sind.

- **Sicherheit:** Benutzerdaten müssen geschützt sein. Unberechtigte Zugriffe werden erkannt, blockiert und protokolliert.

- **Skalierbarkeit:** Die Plattform soll auch bei 10.000 gleichzeitigen Nutzern stabil laufen. Das ist wichtig für Spitzenlasten und zukünftiges Wachstum.
