# VI_Cuadro_Resumen_BCRP_COBIT2019.xlsx
## Guía de uso — Kit oficial de Diseño COBIT 2019 (ISACA)

---

## Qué es este archivo

Es el **Kit de Diseño oficial de ISACA** (archivo base `615983147.xlsx`) completado con los datos reales del BCRP. No es un Excel creado por el equipo: es el instrumento oficial de ISACA para diseñar el Sistema de Gobierno de TI bajo COBIT 2019.

El Kit funciona así: el equipo ingresa datos del BCRP en las hojas DF1 a DF10, y la hoja **Canvas** calcula automáticamente la prioridad de los 40 procesos COBIT mediante fórmulas predefinidas por ISACA.

---

## Estructura de hojas y cómo se enlazan

```
┌─────────────────────────────────────────────────────────────────┐
│   Hojas de entrada (DF1 a DF10) — el equipo llena estos datos   │
└─────────────────────────────────────────────────────────────────┘
         │    │    │    │    │    │    │    │    │    │
        DF1  DF2  DF3  DF4  DF5  DF6  DF7  DF8  DF9  DF10
         │    │    │    │    │    │    │    │    │    │
         └────┴────┴────┴────┴────┴────┴────┴────┴────┘
                              │
                       fórmulas ISACA
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│   Hoja Canvas — resultado automático: 40 procesos con scores    │
└─────────────────────────────────────────────────────────────────┘
                              │
               columna "Agreed Level" (llenada por el equipo)
                              │
                              ▼
              Diseño final del EGIT del BCRP
```

---

## Hoja por hoja

### DF1 — Estrategia Empresarial
Califica con qué intensidad (escala 1–5) el BCRP sigue cada arquetipo estratégico de COBIT.

| Arquetipo | Valor BCRP | Por qué |
|---|:---:|---|
| Client Service / Stability | **5** | 3 de los 5 OE seleccionados apuntan a estabilidad (OE4, OE14, OE1/OE5). Es la misión constitucional del Banco. |
| Innovation / Differentiation | **4** | OE10 y OE9 del Plan Estratégico. CBDC e IA en analítica son iniciativas de diferenciación documentadas en el PETI. |
| Cost Leadership | **2** | La eficiencia existe como objetivo, pero el BCRP es monopolio constitucional y no compite en precio. |
| Growth / Acquisition | **1** | El BCRP no crece por adquisición. Límite legal y constitucional explícito. |

**Enlace con Canvas:** amplifica los procesos de continuidad (DSS04) y riesgo (APO12, EDM03).

---

### DF2 — Metas Empresariales
Califica la importancia (1–5) de cada una de las 13 metas corporativas COBIT (EG01–EG13).

En lugar de asignarlas subjetivamente, el equipo convirtió los puntajes reales de la **1ra Cascada** usando la siguiente fórmula:

```
Valor_DF2 = REDONDEO [ 1 + (Suma_cascada − Min) × (5 − 1) / (Max − Min) ]

Donde:
  Min = 2  (EG09, puntaje mínimo en la cascada)
  Max = 8  (EG08, puntaje máximo en la cascada)
```

| Meta COBIT | Puntaje 1ra Cascada | Valor en DF2 |
|---|:---:|:---:|
| EG08 — Optimización de procesos internos | 8 | **5** |
| EG06 — Continuidad y disponibilidad | 7 | **4** |
| EG12 — Transformación digital | 7 | **4** |
| EG02 — Riesgos gestionados | 6 | **3** |
| EG07 — Calidad de información gerencial | 6 | **3** |
| EG11 — Cumplimiento políticas internas | 6 | **3** |
| EG03 — Cumplimiento leyes externas | 3 | **1** |
| Resto (EG01, EG04, EG05, etc.) | 2 | **1** |

**Por qué así:** garantiza que la Cascada manual y el Kit ISACA sean matemáticamente coherentes. Si el mismo objetivo tiene 8 puntos en la Cascada, también tendrá el valor máximo en DF2.

**Enlace con Canvas:** DF2 es el factor con más peso en el Canvas. Amplifica directamente DSS05, APO13 y los procesos de riesgo.

---

### DF3 — Perfil de Riesgo
Para cada categoría de riesgo TI se asigna Impacto (1–5) y Probabilidad (1–5). El Canvas usa el producto de ambos.

| Categoría de riesgo | Impacto | Probabilidad | Criticidad |
|---|:---:|:---:|:---:|
| Ataques lógicos / maliciosos (APT, ransomware) | 5 | 5 | **25** |
| Acciones no autorizadas (fraude SWIFT) | 5 | 5 | **25** |
| Gestión de datos e información | 5 | 5 | **25** |
| Incidentes de infraestructura TI (sin 3er DC) | 5 | 4 | **20** |
| Incumplimiento regulatorio | 5 | 3 | **15** |

Evidencia: PETI BCRP p.9 — brechas críticas de ciberseguridad. SWIFT CSP obligatorio. Solo 2 data centers activos.

**Enlace con Canvas:** amplifica APO12, APO13, DSS05, EDM03.

---

### DF4 — Problemas Relacionados con TI
Lista de 20 problemas típicos de TI. Escala: 0 = no existe, 1 = menor, 2 = medio, 3 = grave.

El BCRP tiene **7 problemas clasificados como GRAVES** con evidencia directa en el PETI:

1. Incidentes significativos de seguridad → **3** (PETI p.9)
2. Recursos TI insuficientes / habilidades inadecuadas → **3** (OE9 del Plan Estratégico)
3. Proyectos TI que no cumplen o llegan tarde → **3** (modernización LBTR pendiente)
4. Implementación obstaculizada por arquitectura legacy → **3** (LBTR y SIMC generación anterior)
5. Problemas de calidad e integración de datos → **3** (OE7, brechas en datamarts)
6. Incapacidad de aprovechar nuevas tecnologías → **3** (CBDC y IA en evaluación)
7. Incumplimiento de requisitos regulatorios → **3** (ISO 27001 y SWIFT CSP pendientes)

**Enlace con Canvas:** amplifica MEA03, APO13, BAI03.

---

### DF5 — Panorama de Amenazas
Distribución porcentual entre niveles de amenaza (suma = 100%).

| Nivel | BCRP |
|---|:---:|
| Alto | **100%** |
| Normal | 0% |
| Bajo | 0% |

Los bancos centrales son objetivos de ciberataques de estado-nación. El BCRP opera el sistema de pagos interbancario de todo el Perú.

**Enlace con Canvas:** amplifica todos los procesos de seguridad y riesgo.

---

### DF6 — Requisitos de Cumplimiento
Nivel de exigencia normativa aplicable al BCRP.

| Nivel | BCRP |
|---|:---:|
| Alto | **100%** |

Marco normativo: Constitución Art. 84°, Ley Orgánica del BCRP, estándares BIS, SWIFT Customer Security Programme (CSP), ISO/IEC 27001 (objetivo PETI).

**Enlace con Canvas:** amplifica MEA03, APO13, APO12, EDM03.

---

### DF7 — Rol de TI en la Institución
Basado en la metodología McFarlan Strategic Grid. Escala 1–5.

| Rol | Valor BCRP | Por qué |
|---|:---:|---|
| Factory (Fábrica) | **5** | LBTR opera 24/7 sin ventana de mantenimiento. Cualquier interrupción es una crisis del sistema financiero nacional. |
| Strategic (Estratégico) | **5** | El PETI fue aprobado al máximo nivel institucional. OE10 define TI como habilitadora estratégica. |
| Support (Soporte) | **2** | Office 365, Intranet, GESCON son de soporte pero no dominan el perfil. |
| Turnaround (Transición) | **1** | El rol ya está consolidado. No hay TI "en transición" hacia nuevo modelo. |

**Enlace con Canvas:** amplifica DSS04, DSS01, EDM01-EDM05.

---

### DF8 — Modelo de Abastecimiento de TI
Cómo obtiene el BCRP sus capacidades tecnológicas (suma = 100%).

| Modelo | BCRP |
|---|:---:|
| Insourcing (interno) | **60%** |
| Cloud | **20%** |
| Outsourcing | **20%** |

LBTR, SIMC, SWIFT, DCs: gestionados directamente por la GTI. La externalización es mínima por razones de seguridad nacional y soberanía financiera. SWIFT es el único proveedor externo crítico.

**Enlace con Canvas:** amplifica APO07 (RRHH TI) y APO10 (proveedores).

---

### DF9 — Métodos de Implementación de TI
Cómo ejecuta el BCRP sus proyectos TI (suma = 100%).

| Metodología | BCRP |
|---|:---:|
| Tradicional / Cascada | **75%** |
| Ágil | **20%** |
| DevOps | **5%** |

Los cambios en LBTR, SIMC y SWIFT requieren UAT extensivo, pruebas de regresión completa y aprobaciones formales antes de cada despliegue. No es compatible con iteraciones ágiles sin validación formal.

**Enlace con Canvas:** amplifica BAI01, BAI06, BAI07.

---

### DF10 — Estrategia de Adopción Tecnológica
Cómo adopta el BCRP nuevas tecnologías (suma = 100%).

| Postura | BCRP |
|---|:---:|
| Seguidor / Follower | **75%** |
| Precursor / First Mover | **25%** |
| Rezagado / Slow Adopter | **0%** |

El BCRP adopta estándares ya validados internacionalmente (ISO 20022, SWIFT CSP, COBIT 2019). Es Precursor solo donde tiene mandato institucional: CBDC y IA para política monetaria.

**Enlace con Canvas:** amplifica APO04, BAI02, BAI03.

---

## Hoja Canvas — El resultado automático

La hoja Canvas combina los 10 factores mediante fórmulas predefinidas por ISACA y genera las siguientes columnas para cada uno de los 40 procesos COBIT:

| Columna | Quién la llena | Qué significa |
|---|---|---|
| Initial Scope | Fórmula ISACA | Score inicial basado en DF1-DF10 |
| Adjustment | Equipo (opcional) | Ajuste manual justificado |
| Reason | Equipo | Justificación del ajuste |
| Concluded Scope | Fórmula (Initial + Adjustment) | Score final del proceso |
| Suggested Level | Fórmula ISACA | Nivel de capacidad sugerido (0–5) |
| **Agreed Level** | **Equipo** | **Nivel de capacidad acordado (decisión final)** |
| Reason | Equipo | Justificación del nivel acordado |

### Resultados Canvas para el BCRP

| Proceso COBIT | Concluded Scope | Suggested Level | Agreed Level | Nota |
|---|:---:|:---:|:---:|---|
| APO12 — Gestionar el Riesgo | 100% | 4 | **4** | Score máximo. Riesgo TI sistémico nacional. |
| EDM03 — Optimización del Riesgo | 90% | 4 | **4** | Gobierno del riesgo desde el Directorio. |
| APO13 — Gestionar la Seguridad | 90% | 4 | **4** | ISO 27001 pendiente. SGSI sin formalizar. |
| DSS05 — Servicios de Seguridad | 90% | 4 | **4** | HSM, MDM, SIEM son brechas activas del PETI. |
| DSS04 — Gestionar la Continuidad | 80% | 4 | **4** | Sin tercer DC. LBTR requiere ≥99.9%. |
| MEA03 — Cumplimiento Externo | 80% | 4 | **4** | Art. 84°, BIS, SWIFT CSP son mandatorios. |
| MEA01 — Rendimiento y Conformidad | 70% | 2 | **3** | Ajuste: sin KPIs el sistema de gobierno es opaco. |

---

## El único ajuste manual — MEA01

El Canvas sugirió Nivel 2 para MEA01. El equipo lo ajustó a **Nivel 3** con la siguiente justificación:

> MEA01 es el proceso que mide el rendimiento de todos los demás. Si queda en Nivel 2, los KPIs de los 6 procesos centrales no estarán formalizados y el Directorio no puede verificar que el EGIT está funcionando. Un sistema de gobierno que no se mide, no funciona.

Este es el único punto donde el equipo modificó el resultado automático del Kit.

---

## Relación entre el Excel de Cascada y este Excel

```
BASE/BCRP_Fase4_Cascada_COBIT2019.xlsx     FINAL/VI_Cuadro_Resumen_BCRP_COBIT2019.xlsx
─────────────────────────────────────       ──────────────────────────────────────────────
Herramienta 1 (manual)                      Herramienta 2 (automática, Kit ISACA)

1ra Cascada:                                DF2 recibe los valores convertidos
  EG08 = 8 puntos                    ──►      EG08 → valor 5 (fórmula lineal)
  EG06 = 7 puntos                    ──►      EG06 → valor 4
  EG09 = 2 puntos (mínimo)           ──►      EG09 → valor 1

3ra Cascada resultado:                      Canvas resultado:
  DSS05 = 14 pts  #1                 ═══►    DSS05 = 90%   Top
  DSS04 = 12 pts  #2                 ═══►    DSS04 = 80%   Top
  APO13 = 12 pts  #2                 ═══►    APO13 = 90%   Top
  APO12 = 10 pts  #4                 ═══►    APO12 = 100%  Top (sube al #1)
  EDM03 =  9 pts  #5                 ═══►    EDM03 = 90%   Top
  MEA03 =  8 pts  #6                 ═══►    MEA03 = 80%   Top

Ambas herramientas identifican exactamente los mismos 6 procesos.
La diferencia en ranking interno se debe a que el Canvas incluye
DF3 (riesgo) y DF5 (amenazas), que amplifican APO12 más que la Cascada.
```

---

## Cómo abrir y navegar el archivo

1. Abrir `VI_Cuadro_Resumen_BCRP_COBIT2019.xlsx` en Microsoft Excel (no Calc, las fórmulas son nativas de Excel)
2. Ir a la hoja **Canvas** para ver los resultados de los 40 procesos
3. Para ver cómo se ingresó cada factor, ir a las hojas **DF1, DF2, DF3... DF10**
4. Las celdas en **amarillo o con borde azul** son las que el equipo completó
5. Las celdas en gris son calculadas automáticamente por las fórmulas de ISACA — no modificar
6. La columna **Agreed Level** (última columna del Canvas) contiene la decisión final del equipo

---

---

## Glosario de abreviaciones

### Marco de referencia y organización

| Abreviación | Significado completo | Contexto de uso |
|---|---|---|
| **COBIT** | Control Objectives for Information and Related Technologies | Marco de gobierno y gestión de TI publicado por ISACA. La versión usada en este proyecto es COBIT 2019. |
| **ISACA** | Information Systems Audit and Control Association | Organización internacional que publica y mantiene el marco COBIT y certifica profesionales de gobierno TI. |
| **EGIT** | Enterprise Governance of Information and Technology | Sistema formal de Gobierno Empresarial de TI que se diseña con COBIT. Es el producto final del proyecto. |
| **BCRP** | Banco Central de Reserva del Perú | Institución pública autónoma, regulada por el Art. 84° de la Constitución Política del Perú. Caso de estudio del proyecto. |
| **GTI** | Gerencia de Tecnologías de Información | Área interna del BCRP responsable de toda la infraestructura y servicios tecnológicos. Equivale al área de TI. |
| **UPeU** | Universidad Peruana Unión | Institución académica donde se desarrolló el proyecto. |
| **PETI** | Plan Estratégico de Tecnologías de Información | Documento oficial del BCRP (período 2022–2026) que define la hoja de ruta TI, diagnóstico de brechas y proyectos. |
| **GRC** | Governance, Risk and Compliance | Sistema integrado de Gobierno, Riesgo y Cumplimiento. Herramienta recomendada para APO12 y MEA03. |

---

### Dominios y procesos COBIT 2019

COBIT 2019 organiza los 40 procesos en 5 dominios. Los dos primeros son de **gobierno** y los tres últimos de **gestión**.

| Abreviación | Significado | Tipo | Procesos |
|---|---|---|:---:|
| **EDM** | Evaluate, Direct and Monitor (Evaluar, Dirigir y Monitorear) | Gobierno | EDM01 a EDM05 |
| **APO** | Align, Plan and Organize (Alinear, Planificar y Organizar) | Gestión | APO01 a APO14 |
| **BAI** | Build, Acquire and Implement (Construir, Adquirir e Implementar) | Gestión | BAI01 a BAI11 |
| **DSS** | Deliver, Service and Support (Entregar, Dar Servicio y Soporte) | Gestión | DSS01 a DSS06 |
| **MEA** | Monitor, Evaluate and Assess (Monitorear, Evaluar y Valorar) | Gestión | MEA01 a MEA04 |

#### Los 6 procesos priorizados para el BCRP

| Código | Nombre completo | Dominio |
|---|---|---|
| **APO12** | Gestionar el Riesgo | APO |
| **APO13** | Gestionar la Seguridad de la Información | APO |
| **DSS04** | Gestionar la Continuidad | DSS |
| **DSS05** | Gestionar los Servicios de Seguridad | DSS |
| **EDM03** | Asegurar la Optimización del Riesgo | EDM |
| **MEA03** | Gestionar el Cumplimiento de Requisitos Externos | MEA |

#### Proceso adicional incluido

| Código | Nombre completo | Razón de inclusión |
|---|---|---|
| **MEA01** | Gestionar el Rendimiento y la Conformidad | Ajuste manual: sin KPIs formales ningún proceso puede demostrar mejora al Directorio |

---

### Factores de diseño (hojas DF del Kit ISACA)

| Abreviación | Significado | Qué representa |
|---|---|---|
| **DF1** | Design Factor 1 — Enterprise Strategy | Estrategia empresarial del BCRP (escala 1–5 por arquetipo) |
| **DF2** | Design Factor 2 — Enterprise Goals | Metas empresariales COBIT (EG01–EG13), derivadas de la 1ra Cascada |
| **DF3** | Design Factor 3 — Risk Profile | Perfil de riesgo TI (impacto × probabilidad por categoría) |
| **DF4** | Design Factor 4 — IT-Related Issues | Problemas TI actuales del BCRP (0=no existe, 3=grave) |
| **DF5** | Design Factor 5 — Threat Landscape | Panorama de amenazas externas (distribución % por nivel) |
| **DF6** | Design Factor 6 — Compliance Requirements | Exigencia normativa aplicable (% por nivel de rigor) |
| **DF7** | Design Factor 7 — Role of IT | Rol de TI en el BCRP según la grilla de McFarlan (escala 1–5) |
| **DF8** | Design Factor 8 — Sourcing Model | Modelo de abastecimiento TI (% entre insourcing/cloud/outsourcing) |
| **DF9** | Design Factor 9 — IT Implementation Methods | Metodologías de implementación de proyectos TI (% por tipo) |
| **DF10** | Design Factor 10 — Technology Adoption Strategy | Postura de adopción tecnológica (% seguidor/precursor/rezagado) |
| **DF11** | Design Factor 11 — Enterprise Size | Tamaño de la organización (Pequeña / Mediana / Grande) |

> **Nota:** El proyecto menciona 11 factores porque COBIT 2019 Design Guide incluye DF11 (tamaño) como factor adicional al kit base de 10 factores.

---

### Metas del Modelo en Cascada

#### Metas Corporativas (EG — Enterprise Goals)
Las 13 metas corporativas de COBIT 2019 que conectan los objetivos del negocio con TI.

| Código | Nombre |
|---|---|
| EG01 | Valor del portafolio de inversiones en negocio y servicios TI |
| EG02 | Riesgos relacionados con el negocio gestionados |
| EG03 | Cumplimiento de leyes y regulaciones externas |
| EG04 | Calidad de información financiera |
| EG05 | Orientación al cliente |
| EG06 | Continuidad y disponibilidad de servicios de negocio |
| EG07 | Decisiones de negocio basadas en información de calidad |
| EG08 | Optimización de la funcionalidad de procesos internos |
| EG09 | Optimización de los costos de los procesos de negocio |
| EG10 | Habilidades, motivación y productividad del personal |
| EG11 | Cumplimiento con políticas internas |
| EG12 | Transformación digital del negocio |
| EG13 | Innovación de productos y servicios de negocio |

*Priorizadas para el BCRP (puntaje ≥ 6 en 1ra Cascada):* **EG08, EG06, EG12, EG02, EG07, EG11**

#### Metas de Alineación TI (AG — Alignment Goals)
Las 13 metas que traducen las metas corporativas en objetivos de TI.

| Código | Nombre |
|---|---|
| AG01 | Alineación de la estrategia de TI con la estrategia de negocio |
| AG02 | Riesgos relacionados con TI gestionados |
| AG03 | Realización de beneficios del portafolio de programas e inversiones TI |
| AG04 | Calidad de la información gestionada |
| AG05 | Entrega de servicios TI alineada con los requisitos del negocio |
| AG06 | Agilidad para convertir los requisitos de negocio en soluciones TI eficaces |
| AG07 | Seguridad de la información, infraestructura de procesamiento y aplicaciones |
| AG08 | Integración y estandarización de procesos de negocio y aplicaciones TI |
| AG09 | Entrega de programas de TI en tiempo, dentro del presupuesto y con calidad requerida |
| AG10 | Competencias e innovación del personal de TI |
| AG11 | Cumplimiento de políticas internas de TI |
| AG12 | Personal de TI competente y motivado |
| AG13 | Conocimiento, experiencia e iniciativas en innovación de TI |

*Priorizadas para el BCRP (puntaje ≥ 9 en 2da Cascada):* **AG07, AG08, AG05, AG06, AG09, AG11**

---

### Sistemas y tecnologías del BCRP

| Abreviación | Significado | Rol en el BCRP |
|---|---|---|
| **LBTR** | Sistema de Liquidación Bruta en Tiempo Real | Procesa las transferencias interbancarias de alto valor en el Perú. Opera 24/7. Es el sistema más crítico del BCRP. |
| **SIMC** | Sistema de Mensajería Interbancaria y Compensación | Gestiona la compensación de pagos de menor valor entre entidades financieras. |
| **SWIFT** | Society for Worldwide Interbank Financial Telecommunication | Red internacional de mensajería financiera que conecta al BCRP con el sistema financiero global y la gestión de reservas internacionales. |
| **HSM** | Hardware Security Module (Módulo de Seguridad Hardware) | Dispositivo físico que protege las claves criptográficas del LBTR y SWIFT. Identificado como brecha activa en el PETI. |
| **SIEM** | Security Information and Event Management | Sistema de detección y respuesta a incidentes de seguridad en tiempo real. Identificado como brecha activa en el PETI. |
| **MDM** | Mobile Device Management | Plataforma de gestión y control de dispositivos móviles corporativos. Brecha del PETI. |
| **VPN** | Virtual Private Network (Red Privada Virtual) | Conexión cifrada para acceso remoto seguro. |
| **CBDC** | Central Bank Digital Currency (Moneda Digital del Banco Central) | Proyecto en evaluación en el BCRP para emitir una versión digital del Sol peruano. |
| **DC** | Data Center (Centro de Datos) | Instalación física que aloja los servidores y sistemas del BCRP. Actualmente tiene 2 DCs; el tercer DC es objetivo urgente del PETI. |
| **BCP** | Business Continuity Plan (Plan de Continuidad del Negocio) | Documento y procedimientos para mantener operaciones durante una crisis. Relacionado con DSS04. |
| **RTO** | Recovery Time Objective (Objetivo de Tiempo de Recuperación) | Tiempo máximo aceptable para restaurar un servicio tras un incidente. Meta BCRP: ≤ 4 horas. |
| **RPO** | Recovery Point Objective (Objetivo de Punto de Recuperación) | Máxima pérdida de datos tolerable. Complemento del RTO. |
| **IA** | Inteligencia Artificial | Tecnología mencionada en el PETI para analítica de política monetaria, datamarts y big data. |

---

### Estándares y marcos normativos

| Abreviación | Significado | Relación con el BCRP |
|---|---|---|
| **ISO 27001** | International Organization for Standardization — Norma 27001 (Sistema de Gestión de Seguridad de la Información) | Meta del PETI 2022-2026. Aún no obtenida. Su ausencia es una brecha clasificada como GRAVE en DF4. Amplifica APO13 y MEA03. |
| **ISO 20022** | Estándar internacional de mensajería financiera | Estándar adoptado por SWIFT para reemplazar el formato MT. El BCRP está en proceso de migración. |
| **SWIFT CSP** | SWIFT Customer Security Programme | Programa de seguridad obligatorio para todos los usuarios de la red SWIFT. Auditorías anuales. Su incumplimiento implica desconexión de pagos internacionales. |
| **BIS** | Bank for International Settlements (Banco de Pagos Internacionales) | Organismo internacional que emite estándares de gobierno TI y operacional para bancos centrales. El BCRP debe adherirse a sus principios. |
| **RACI** | Responsible, Accountable, Consulted, Informed | Matriz que define quién es Responsable (R), quién Rinde cuentas (A), quién debe ser Consultado (C) e Informado (I) en cada subproceso. |
| **UAT** | User Acceptance Testing (Pruebas de Aceptación de Usuario) | Fase de validación formal antes de desplegar cambios en sistemas críticos como el LBTR. Justifica el 75% de método Tradicional en DF9. |
| **APT** | Advanced Persistent Threat | Tipo de ciberataque sofisticado y prolongado, típicamente ejecutado por actores patrocinados por estados. El BCRP es objetivo directo. |

---

### Herramientas del modelo en cascada

| Abreviación | Significado | Qué es |
|---|---|---|
| **OE** | Objetivo Estratégico | Los 14 objetivos del Plan Estratégico BCRP 2022-2026 (OE1–OE14). El proyecto usó 5 de ellos: OE4, OE10, OE14, OE1/OE5, OE9. |
| **EG** | Enterprise Goal (Meta Corporativa COBIT) | Las 13 metas corporativas del marco COBIT 2019 (EG01–EG13). Primera capa de la cascada. |
| **AG** | Alignment Goal (Meta de Alineación TI) | Las 13 metas de alineación TI del marco COBIT 2019 (AG01–AG13). Segunda capa de la cascada. |
| **GMO** | Governance and Management Objective | Los 40 procesos u objetivos de gobierno y gestión de COBIT 2019. Tercera capa de la cascada y resultado del Canvas. |

---

### Niveles de madurez COBIT 2019

| Nivel | Nombre | Descripción |
|:---:|---|---|
| **0** | Incompleto | El proceso no existe o no alcanza su propósito. |
| **1** | Inicial | El proceso existe pero de forma reactiva y desorganizada. Sin control formal. |
| **2** | Gestionado | El proceso está planificado y monitoreado. Existe documentación básica. Estado actual del BCRP. |
| **3** | Definido | El proceso está estandarizado a nivel institucional. Los procedimientos son formales. Meta alcanzable en el corto plazo. |
| **4** | Cuantitativamente Gestionado | El proceso se mide con KPIs. Permite gestión predictiva. **Meta final para los 6 procesos centrales.** |
| **5** | En Optimización | Mejora continua sistemática. Benchmarking externo constante. |

---

### Personas y roles

| Abreviación | Significado | Rol en el EGIT del BCRP |
|---|---|---|
| **CIO** | Chief Information Officer | Máximo responsable de TI en el BCRP. Lidera la GTI. Rinde cuentas al Directorio sobre el EGIT. |
| **CISO** | Chief Information Security Officer | Responsable de seguridad de la información. Rol identificado como necesario para APO13 y DSS05. |
| **CSIRT** | Computer Security Incident Response Team | Equipo de respuesta ante incidentes de ciberseguridad. Necesario para DSS05. |
| **CERT** | Computer Emergency Response Team | Similar al CSIRT; en algunos países es el término oficial para el equipo nacional de respuesta. |
| **CGEIT** | Certified in the Governance of Enterprise IT | Certificación ISACA para profesionales de gobierno TI. Perfil recomendado para el Comité de Gobierno TI del BCRP. |
| **GOMEF** | Gerencia de Operaciones Monetarias y Estabilidad Financiera | Gerencia misional del BCRP que opera el LBTR y el SIMC. Cliente principal de la GTI. |

---

*Proyecto COBIT 2019 aplicado al BCRP — Universidad Peruana Unión, IX Ciclo, 2025*  
*Docente: Ing. Rick Armando Ccapa Luque*
