# Bericht

**Datum:** 23. Mai 2025  
**Startzeit:** 12:00 Uhr  
**Endzeit:** 12:45 Uhr

## Teilnehmer

- Philip Sagawe (Moderator)
- Sebastian Albert (Interner Reviewer)
- Stefan Schäfer (Interner Reviewer)
- Oskar Bartsch (Notizen)
- Luca Riebel (Autor des Codes)
- Christoph Niederer (Externer Reviewer, DeskFlex)

## Fokus der Review

Überprüfung des **AuctionService** und **AuthService**. Die beiden Komponenten wurden ausgewählt, weil sie die Hauptfunktionen für die Authentifizierung und den Auktionshandel enthalten.

## Komponenten für die Review:

- `AuctionService` & `IAuctionService`
- `AuthService` & `IAuthService`

## Kriterien für die Review

| Komponente       | Kriterien                                                         |
| ---------------- | ----------------------------------------------------------------- |
| `AuctionService` | Codequalität, Fehlerbehandlung                                    |
| `AuthService`    | Sicherheit, Passwort-Hashing, JWT-Korrektheit, Konfigurierbarkeit |

## Review-Methodik

Formale Inspektion: Vorab-Prüfung durch alle, danach strukturierte Besprechung im Meeting.

## Ergebnisse und Maßnahmen

### `AuctionService`

#### Positiv

- Klare Implementierung der grundlegenden CRUD-Methoden
- Gute Fehlerbehandlung (`NotFound`, `BadRequest`, etc.)

#### Verbesserungspotenzial

- Redundante Update-Logik -> `Entry.State` & `Update()` ist doppelt
- Keine Validierung bei `PostAuction` -> z. B. `StartTime`, `EndTime`, Startgebot
- Performanceproblem bei `GetRandomArticles()` bei großen Tabellen
- Sicherheitslücke möglich: keine Prüfung, ob Nutzer Auktionsrechte besitzt (z. B. beim Put/Delete)

### `AuthService`

#### Positiv

- JWT-Token korrekt signiert und mit Ablaufzeit
- Strukturierung sauber und logisch getrennt

#### Verbesserungspotenzial

- **Token enthält keine Claims (z. B. UserId, Rollen)** -> _Maßnahme:_ Claims einbauen in `SecurityTokenDescriptor`
- `_tokenKey` und `_hashKey` im Code hardcodiert -> _Maßnahme:_ In `appsettings.json` oder Umgebungsvariablen auslagern

## Abgeleitete Maßnahmen

| Bereich           | Maßnahme                                           |
| ----------------- | -------------------------------------------------- |
| `AuctionsService` | Validierung ergänzen, Performance prüfen           |
| `AuthService`     | Token Claims ergänzen, Keys auslagern              |
| Allgemein         | Public Methoden dokumentieren, Interfaces anpassen |

## Lernpunkte / Best Practices

- Sicherheitsfunktionen immer vollständig implementieren, auch in der Entwicklung
- Konfigurierbare Schlüssel erhöhen Sicherheit und Flexibilität
- Code Reviews mit externen Personen helfen, Sicherheitslücken zu erkennen
