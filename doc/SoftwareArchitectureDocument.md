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

### 1.1 Purpose

### 1.2 Scope

### 1.3 Definitions, Acronyms and Abbreviations

### 1.4 References

### 1.5 Overview

## 2. Architecural Represetation

## 3. Architectural Goals and Constraints

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

### 8.2 Layers

## 9. Data View (optional)

## 10. Size and Performance

## 11. Quality
#### Die Wichtigsten  Architekturtaktik zusammengefasst:
- **Performance:** Das System muss unter Last schnell bleiben. Gebote sollen innerhalb von einer Sekunde verarbeitet werden, auch wenn viele Nutzer gleichzeitig aktiv sind.

- **Sicherheit:** Benutzerdaten müssen geschützt sein. Unberechtigte Zugriffe werden erkannt, blockiert und protokolliert.

- **Skalierbarkeit:** Die Plattform soll auch bei 10.000 gleichzeitigen Nutzern stabil laufen. Das ist wichtig für Spitzenlasten und zukünftiges Wachstum.