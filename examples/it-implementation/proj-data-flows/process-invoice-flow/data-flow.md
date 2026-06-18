# Data flow - Invoice flow (FV)

> Example. All content fictional.

## 1. Overview

{CUSTOM_SYSTEM} is the source of invoices; {CORE_SYSTEM} is the system of
record. Headers and lines flow one way, with a status returned.

## 2. Data flow diagram (DFD)

```mermaid
flowchart LR
    A["{CUSTOM_SYSTEM}<br/>invoice entry"] -->|header + lines| B["Integration<br/>web service"]
    B -->|posted document| C["{CORE_SYSTEM}<br/>system of record"]
    C -->|status| B
    B -->|status| A
```

## 3. Business process (BPMN-style)

```mermaid
flowchart TD
    S([Invoice registered]) --> V{Valid?}
    V -->|no| R[Return to entry]
    V -->|yes| P["Map to expense-type dictionary"]
    P --> X["Post to {CORE_SYSTEM}"]
    X --> E([Posted])
```

## 4. Changelog

| Date | Version | Change | Source |
|------|---------|--------|--------|
| 2026-05-07 | v0.1 | Initial draft | note 2026-05-07 |

## 5. Open items

| # | Question | Context |
|---|----------|---------|
| 1 | Expense-type dictionary name | from note 2026-05-07 |
