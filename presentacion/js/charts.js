/* =============================================
   CHARTS.JS — Visualizaciones SVG
   Proyecto BCRP · COBIT 2019
   ============================================= */

'use strict';

const Charts = (() => {

  /* =============================================
     DATOS: 40 procesos COBIT con scores del Canvas
     Fuente: VI_Cuadro_Resumen_BCRP_COBIT2019.xlsx
     ============================================= */
  const PROCESSES = [
    { code:'EDM01', name:'Marco de Gobierno',      domain:'EDM', score:70,  top:false },
    { code:'EDM02', name:'Entrega de Beneficios',  domain:'EDM', score:60,  top:false },
    { code:'EDM03', name:'Optimización del Riesgo',domain:'EDM', score:90,  top:true  },
    { code:'EDM04', name:'Optimización Recursos',  domain:'EDM', score:65,  top:false },
    { code:'EDM05', name:'Transparencia Partes Int.',domain:'EDM',score:55,  top:false },
    { code:'APO01', name:'Marco Gestión TI',       domain:'APO', score:65,  top:false },
    { code:'APO02', name:'Gestionar Estrategia',   domain:'APO', score:70,  top:false },
    { code:'APO03', name:'Arquitectura Empresa',   domain:'APO', score:60,  top:false },
    { code:'APO04', name:'Gestionar Innovación',   domain:'APO', score:70,  top:false },
    { code:'APO05', name:'Gestionar Portafolio',   domain:'APO', score:55,  top:false },
    { code:'APO06', name:'Presupuesto y Costos',   domain:'APO', score:50,  top:false },
    { code:'APO07', name:'Recursos Humanos',       domain:'APO', score:60,  top:false },
    { code:'APO08', name:'Gestionar Relaciones',   domain:'APO', score:55,  top:false },
    { code:'APO09', name:'Acuerdos de Servicio',   domain:'APO', score:65,  top:false },
    { code:'APO10', name:'Gestionar Proveedores',  domain:'APO', score:60,  top:false },
    { code:'APO11', name:'Gestionar Calidad',      domain:'APO', score:65,  top:false },
    { code:'APO12', name:'Gestionar el Riesgo',    domain:'APO', score:100, top:true  },
    { code:'APO13', name:'Gestionar Seguridad',    domain:'APO', score:90,  top:true  },
    { code:'APO14', name:'Gestionar Datos',        domain:'APO', score:75,  top:false },
    { code:'BAI01', name:'Programas y Proyectos',  domain:'BAI', score:65,  top:false },
    { code:'BAI02', name:'Definición Requisitos',  domain:'BAI', score:70,  top:false },
    { code:'BAI03', name:'Construcción Soluciones',domain:'BAI', score:75,  top:false },
    { code:'BAI04', name:'Disponibilidad y Capac.',domain:'BAI', score:75,  top:false },
    { code:'BAI05', name:'Cambio Organizacional',  domain:'BAI', score:55,  top:false },
    { code:'BAI06', name:'Cambios TI',             domain:'BAI', score:65,  top:false },
    { code:'BAI07', name:'Transición de Cambios',  domain:'BAI', score:60,  top:false },
    { code:'BAI08', name:'Gestionar Conocimiento', domain:'BAI', score:60,  top:false },
    { code:'BAI09', name:'Gestionar Activos',      domain:'BAI', score:55,  top:false },
    { code:'BAI10', name:'Configuración',          domain:'BAI', score:55,  top:false },
    { code:'BAI11', name:'Gestionar Proyectos',    domain:'BAI', score:65,  top:false },
    { code:'DSS01', name:'Gestionar Operaciones',  domain:'DSS', score:75,  top:false },
    { code:'DSS02', name:'Solicitudes e Incidentes',domain:'DSS',score:70,  top:false },
    { code:'DSS03', name:'Gestionar Problemas',    domain:'DSS', score:65,  top:false },
    { code:'DSS04', name:'Gestionar Continuidad',  domain:'DSS', score:80,  top:true  },
    { code:'DSS05', name:'Servicios de Seguridad', domain:'DSS', score:90,  top:true  },
    { code:'DSS06', name:'Controles de Proceso',   domain:'DSS', score:65,  top:false },
    { code:'MEA01', name:'Rendimiento y Conform.', domain:'MEA', score:70,  top:false },
    { code:'MEA02', name:'Control Interno',        domain:'MEA', score:70,  top:false },
    { code:'MEA03', name:'Cumplimiento Externo',   domain:'MEA', score:80,  top:true  },
    { code:'MEA04', name:'Aseguramiento',          domain:'MEA', score:55,  top:false },
  ];

  /* Colores por dominio */
  const DOMAIN_COLORS = {
    EDM: '#2c4a6e',
    APO: '#1b2d45',
    BAI: '#3d6494',
    DSS: '#0a1628',
    MEA: '#5b83b5',
  };

  /* =============================================
     CHART 1: Barras horizontales — 40 procesos
     ============================================= */
  function renderProcessChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const sorted = [...PROCESSES].sort((a, b) => b.score - a.score);
    const barH = 22;
    const barGap = 6;
    const labelW = 70;
    const scoreW = 40;
    const chartW = container.clientWidth || 800;
    const trackW = chartW - labelW - scoreW - 20;
    const totalH = sorted.length * (barH + barGap) + 40;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${chartW} ${totalH}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');
    svg.style.display = 'block';

    sorted.forEach((proc, i) => {
      const y = 20 + i * (barH + barGap);
      const fillW = (proc.score / 100) * trackW;
      const color = proc.top ? '#c8a84b' : DOMAIN_COLORS[proc.domain] || '#2c4a6e';
      const alpha = proc.top ? 'ff' : '88';

      // Label
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', '0');
      label.setAttribute('y', y + barH / 2 + 4);
      label.setAttribute('font-family', 'JetBrains Mono, monospace');
      label.setAttribute('font-size', '9');
      label.setAttribute('fill', proc.top ? '#c8a84b' : '#718096');
      label.setAttribute('font-weight', proc.top ? '700' : '400');
      label.textContent = proc.code;
      svg.appendChild(label);

      // Track
      const track = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      track.setAttribute('x', labelW);
      track.setAttribute('y', y);
      track.setAttribute('width', trackW);
      track.setAttribute('height', barH);
      track.setAttribute('rx', '3');
      track.setAttribute('fill', '#f1f3f6');
      svg.appendChild(track);

      // Fill (animatable)
      const fill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      fill.setAttribute('x', labelW);
      fill.setAttribute('y', y);
      fill.setAttribute('width', '0');
      fill.setAttribute('height', barH);
      fill.setAttribute('rx', '3');
      fill.setAttribute('fill', color + alpha);
      fill.setAttribute('data-target-width', fillW);
      svg.appendChild(fill);

      // Highlight border for top processes
      if (proc.top) {
        const border = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        border.setAttribute('x', labelW);
        border.setAttribute('y', y);
        border.setAttribute('width', trackW);
        border.setAttribute('height', barH);
        border.setAttribute('rx', '3');
        border.setAttribute('fill', 'none');
        border.setAttribute('stroke', '#c8a84b');
        border.setAttribute('stroke-width', '1.5');
        svg.appendChild(border);
      }

      // Score
      const score = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      score.setAttribute('x', labelW + trackW + 8);
      score.setAttribute('y', y + barH / 2 + 4);
      score.setAttribute('font-family', 'JetBrains Mono, monospace');
      score.setAttribute('font-size', '9');
      score.setAttribute('fill', proc.top ? '#c8a84b' : '#a0aec0');
      score.setAttribute('font-weight', proc.top ? '700' : '400');
      score.textContent = `${proc.score}%`;
      svg.appendChild(score);
    });

    container.innerHTML = '';
    container.appendChild(svg);

    // Animate bars with IntersectionObserver
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const fills = svg.querySelectorAll('rect[data-target-width]');
        fills.forEach((fill, i) => {
          const targetW = parseFloat(fill.getAttribute('data-target-width'));
          setTimeout(() => {
            fill.style.transition = 'width 1s cubic-bezier(.4,0,.2,1)';
            fill.setAttribute('width', targetW);
          }, i * 15);
        });
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observer.observe(container);
  }

  /* =============================================
     CHART 2: Madurez radial / spider simplificado
     (6 procesos priorizados — AS-IS vs TO-BE)
     ============================================= */
  const MATURITY_DATA = [
    { code: 'DSS05', name: 'Seguridad',    current: 1, target: 4 },
    { code: 'DSS04', name: 'Continuidad',  current: 2, target: 4 },
    { code: 'APO13', name: 'Seg. Info.',   current: 2, target: 4 },
    { code: 'APO12', name: 'Riesgo',       current: 2, target: 4 },
    { code: 'EDM03', name: 'Opt. Riesgo',  current: 1, target: 4 },
    { code: 'MEA03', name: 'Cumplimiento', current: 2, target: 4 },
  ];

  function renderMaturityChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const W = container.clientWidth || 480;
    const cx = W / 2;
    const cy = W / 2 + 20;
    const maxR = W / 2 - 48;
    const n = MATURITY_DATA.length;
    const maxLevel = 5;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${W + 40}`);
    svg.setAttribute('width', '100%');

    // Radial grid levels
    for (let l = 1; l <= maxLevel; l++) {
      const r = (l / maxLevel) * maxR;
      const points = Array.from({ length: n }, (_, i) => {
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
        return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
      }).join(' ');
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      poly.setAttribute('points', points);
      poly.setAttribute('fill', 'none');
      poly.setAttribute('stroke', '#e2e8f0');
      poly.setAttribute('stroke-width', l === maxLevel ? '1.5' : '1');
      svg.appendChild(poly);

      // Level label
      const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      lbl.setAttribute('x', cx + 4);
      lbl.setAttribute('y', cy - r + 3);
      lbl.setAttribute('font-family', 'JetBrains Mono, monospace');
      lbl.setAttribute('font-size', '7');
      lbl.setAttribute('fill', '#a0aec0');
      lbl.textContent = `N${l}`;
      svg.appendChild(lbl);
    }

    // Axes
    MATURITY_DATA.forEach((_, i) => {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      const x2 = cx + maxR * Math.cos(angle);
      const y2 = cy + maxR * Math.sin(angle);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy);
      line.setAttribute('x2', x2); line.setAttribute('y2', y2);
      line.setAttribute('stroke', '#e2e8f0'); line.setAttribute('stroke-width', '1');
      svg.appendChild(line);
    });

    // Target polygon (level 4)
    const targetPts = MATURITY_DATA.map((d, i) => {
      const r = (d.target / maxLevel) * maxR;
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(' ');
    const targetPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    targetPoly.setAttribute('points', targetPts);
    targetPoly.setAttribute('fill', 'rgba(14,64,40,.08)');
    targetPoly.setAttribute('stroke', '#276749');
    targetPoly.setAttribute('stroke-width', '1.5');
    targetPoly.setAttribute('stroke-dasharray', '4 3');
    svg.appendChild(targetPoly);

    // Current polygon (animated)
    const currentPts = MATURITY_DATA.map((d, i) => {
      const r = (d.current / maxLevel) * maxR;
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(' ');
    const currentPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    currentPoly.setAttribute('points', currentPts);
    currentPoly.setAttribute('fill', 'rgba(27,45,69,.15)');
    currentPoly.setAttribute('stroke', '#2c4a6e');
    currentPoly.setAttribute('stroke-width', '2');
    currentPoly.style.opacity = '0';
    currentPoly.style.transition = 'opacity .8s ease .4s';
    svg.appendChild(currentPoly);

    // Dots current
    MATURITY_DATA.forEach((d, i) => {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      const r = (d.current / maxLevel) * maxR;
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', cx + r * Math.cos(angle));
      dot.setAttribute('cy', cy + r * Math.sin(angle));
      dot.setAttribute('r', '4');
      dot.setAttribute('fill', '#2c4a6e');
      dot.setAttribute('stroke', '#fff');
      dot.setAttribute('stroke-width', '1.5');
      svg.appendChild(dot);
    });

    // Labels
    MATURITY_DATA.forEach((d, i) => {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      const labelR = maxR + 24;
      const x = cx + labelR * Math.cos(angle);
      const y = cy + labelR * Math.sin(angle);

      const grp = document.createElementNS('http://www.w3.org/2000/svg', 'g');

      const code = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      code.setAttribute('x', x); code.setAttribute('y', y);
      code.setAttribute('text-anchor', 'middle');
      code.setAttribute('font-family', 'JetBrains Mono, monospace');
      code.setAttribute('font-size', '8'); code.setAttribute('font-weight', '700');
      code.setAttribute('fill', '#c8a84b');
      code.textContent = d.code;
      grp.appendChild(code);

      svg.appendChild(grp);
    });

    // Legend
    const legendY = W + 10;
    [
      { color: '#2c4a6e', dash: null,  label: 'Nivel Actual (AS-IS)' },
      { color: '#276749', dash: '4 3', label: 'Nivel Objetivo (TO-BE)' },
    ].forEach((item, i) => {
      const gx = W / 2 - 100 + i * 140;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', gx); line.setAttribute('y1', legendY);
      line.setAttribute('x2', gx + 20); line.setAttribute('y2', legendY);
      line.setAttribute('stroke', item.color); line.setAttribute('stroke-width', '2');
      if (item.dash) line.setAttribute('stroke-dasharray', item.dash);
      svg.appendChild(line);

      const ltxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      ltxt.setAttribute('x', gx + 24); ltxt.setAttribute('y', legendY + 4);
      ltxt.setAttribute('font-family', 'Inter, sans-serif');
      ltxt.setAttribute('font-size', '8'); ltxt.setAttribute('fill', '#718096');
      ltxt.textContent = item.label;
      svg.appendChild(ltxt);
    });

    container.innerHTML = '';
    container.appendChild(svg);

    // Animate on visible
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        currentPoly.style.opacity = '1';
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(container);
  }

  /* =============================================
     CHART 3: Cascada flow - matriz de scoring
     ============================================= */
  function renderCascadeMatrix(containerId, data, title) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { rows, cols, values, topRows, topCols } = data;
    const cellSize = 32;
    const labelColW = 180;
    const labelRowH = 80;
    const W = labelColW + cols.length * cellSize + 60;
    const H = labelRowH + rows.length * cellSize + 40;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', '100%');

    // Column headers (rotated)
    cols.forEach((col, j) => {
      const x = labelColW + j * cellSize + cellSize / 2;
      const isTop = topCols && topCols.includes(col.code);
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('transform', `translate(${x}, ${labelRowH - 8}) rotate(-60)`);
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('font-family', 'JetBrains Mono, monospace');
      t.setAttribute('font-size', '7.5');
      t.setAttribute('fill', isTop ? '#c8a84b' : '#4a5568');
      t.setAttribute('font-weight', isTop ? '700' : '400');
      t.textContent = col.code;
      g.appendChild(t);
      svg.appendChild(g);
    });

    // Row labels + cells
    rows.forEach((row, i) => {
      const y = labelRowH + i * cellSize;
      const isTopRow = topRows && topRows.includes(row.code);

      // Row background
      if (isTopRow) {
        const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bg.setAttribute('x', '0'); bg.setAttribute('y', y);
        bg.setAttribute('width', W); bg.setAttribute('height', cellSize);
        bg.setAttribute('fill', 'rgba(200,168,75,.06)');
        svg.appendChild(bg);
      }

      // Row label
      const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      lbl.setAttribute('x', labelColW - 8);
      lbl.setAttribute('y', y + cellSize / 2 + 4);
      lbl.setAttribute('text-anchor', 'end');
      lbl.setAttribute('font-family', 'JetBrains Mono, monospace');
      lbl.setAttribute('font-size', '7.5');
      lbl.setAttribute('fill', isTopRow ? '#c8a84b' : '#4a5568');
      lbl.setAttribute('font-weight', isTopRow ? '700' : '400');
      lbl.textContent = row.code;
      svg.appendChild(lbl);

      // Cells
      cols.forEach((col, j) => {
        const x = labelColW + j * cellSize;
        const val = (values[i] && values[i][j]) || 0;
        const cellColor = val === 2 ? '#1b2d45' : val === 1 ? '#8aaed4' : '#f1f3f6';
        const textColor = val === 2 ? '#ffffff' : val === 1 ? '#2c4a6e' : '#e2e8f0';

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x + 1); rect.setAttribute('y', y + 1);
        rect.setAttribute('width', cellSize - 2); rect.setAttribute('height', cellSize - 2);
        rect.setAttribute('fill', cellColor);
        rect.setAttribute('rx', '2');
        svg.appendChild(rect);

        if (val > 0) {
          const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          t.setAttribute('x', x + cellSize / 2);
          t.setAttribute('y', y + cellSize / 2 + 4);
          t.setAttribute('text-anchor', 'middle');
          t.setAttribute('font-family', 'JetBrains Mono, monospace');
          t.setAttribute('font-size', '8'); t.setAttribute('font-weight', '700');
          t.setAttribute('fill', textColor);
          t.textContent = val;
          svg.appendChild(t);
        }
      });

      // Row total
      const total = (values[i] || []).reduce((a, b) => a + b, 0);
      const tot = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tot.setAttribute('x', labelColW + cols.length * cellSize + 8);
      tot.setAttribute('y', y + cellSize / 2 + 4);
      tot.setAttribute('font-family', 'JetBrains Mono, monospace');
      tot.setAttribute('font-size', '8.5'); tot.setAttribute('font-weight', '700');
      tot.setAttribute('fill', isTopRow ? '#c8a84b' : '#a0aec0');
      tot.textContent = total;
      svg.appendChild(tot);
    });

    // Grid lines
    for (let i = 0; i <= rows.length; i++) {
      const y = labelRowH + i * cellSize;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', labelColW); line.setAttribute('y1', y);
      line.setAttribute('x2', labelColW + cols.length * cellSize); line.setAttribute('y2', y);
      line.setAttribute('stroke', '#e2e8f0'); line.setAttribute('stroke-width', '.5');
      svg.appendChild(line);
    }
    for (let j = 0; j <= cols.length; j++) {
      const x = labelColW + j * cellSize;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x); line.setAttribute('y1', labelRowH);
      line.setAttribute('x2', x); line.setAttribute('y2', labelRowH + rows.length * cellSize);
      line.setAttribute('stroke', '#e2e8f0'); line.setAttribute('stroke-width', '.5');
      svg.appendChild(line);
    }

    container.innerHTML = '';
    container.appendChild(svg);
  }

  /* =============================================
     INIT
     ============================================= */
  function init() {
    // Chart de procesos (en canvas.html y index.html)
    renderProcessChart('chart-processes');

    // Radar de madurez
    renderMaturityChart('chart-maturity');

    // Matrices de cascada (en cascada.html)
    if (document.getElementById('matrix-cascada-1')) {
      renderCascadaMatrices();
    }
  }

  function renderCascadaMatrices() {
    // 1ra Cascada: 5 OBJ × 13 EG
    const matrix1 = {
      rows: [
        { code:'OE4',    label:'Estabilidad financiera y pagos' },
        { code:'OE10',   label:'Desarrollos informáticos innovadores' },
        { code:'OE14',   label:'Gestión de riesgos en todos los procesos' },
        { code:'OE1/OE5',label:'Inflación en rango meta / Reservas int.' },
        { code:'OE9',    label:'Atraer y retener talento profesional' },
      ],
      cols: [
        {code:'EG01'},{code:'EG02'},{code:'EG03'},{code:'EG04'},{code:'EG05'},
        {code:'EG06'},{code:'EG07'},{code:'EG08'},{code:'EG09'},{code:'EG10'},
        {code:'EG11'},{code:'EG12'},{code:'EG13'},
      ],
      values: [
        [1,2,1,0,2,2,1,2,0,0,1,2,1],
        [1,1,2,0,1,2,1,2,0,1,2,2,2],
        [0,2,2,1,0,1,1,2,0,0,2,1,0],
        [0,1,0,2,1,2,2,2,1,0,0,1,0],
        [0,0,0,0,1,0,0,0,0,2,0,2,0],
      ],
      topRows: ['OE4','OE10'],
      topCols: ['EG06','EG08','EG11','EG12','EG07','EG02'],
    };
    renderCascadeMatrix('matrix-cascada-1', matrix1, '1ra Cascada');
  }

  return { init, renderProcessChart, renderMaturityChart };
})();

document.addEventListener('DOMContentLoaded', Charts.init);
