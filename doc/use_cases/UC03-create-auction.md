# Use-Case Specification: Auktion für ein Produkt erstellen
## 1.1 Beschreibung
Dieser Anwendungsfall ermöglicht es dem Nutzer, ein eigenes Produkt zur Auktion im Webshop einzustellen. Der Nutzer füllt ein Formular aus, in dem alle notwendigen Informationen zum Produkt angegeben werden, einschließlich Startpreis, Auktionsdauer und Mindestgebot. Sobald die Auktion erstellt wurde, ist das Produkt für andere Nutzer sichtbar, die darauf bieten können.
## 1.2 Mockup
![UC03-mockup](doc/use_cases/mockups/create-auction.png)
## 1.3 1.3 Aktivitätsdiagramm
![UC03-activity-diagram](/doc/use_cases/activity-diagrams/UC03-create-auction.png)
## 1.4 Sequenzdiagramm
![UC03-sequence-diagram](/doc/use_cases/sequence-diagrams/UC03-create-auction.png)
## 1.5 Vorbedingungen
Der Nutzer öffnet den Webshop und meldet sich an. Er drückt den Button "Auktion für ein Produkt erstellen".
## 1.6 Nachbedingungen
Der Nutzer wird auf die Hauptseite weitergeleitet. Es werden alle Informationen von der Auktion in der Datenbank gespeichert.
## 1.7 Aufwandsschätzung
Wir haben den Aufwand für die Implementierung der Auktionserstellung auf 13 Storypunkte geschätzt.