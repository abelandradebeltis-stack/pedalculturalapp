document.addEventListener("DOMContentLoaded", () => {
  const chartsGrid = document.getElementById("charts-grid-container");
  const statParticipantes = document.getElementById("stat-participantes");
  const statLocais = document.getElementById("stat-locais");

  // --- Funções Auxiliares ---
  const CHART_COLORS = [
    "#3d5b3e", "#6a8a6b", "#97ba98", "#c3d2c5", 
    "#e3efe4", "#a3b18a", "#588157", "#3a5a40",
    "#344e41", "#a3b18a"
  ];

  const createChartCard = (chartInfo) => {
    const chartBox = document.createElement("div");
    chartBox.className = "chart-box";
    const chartCard = document.createElement("article");
    chartCard.className = "chart-card";
    const header = document.createElement("header");
    const title = document.createElement("h3");
    title.textContent = chartInfo.title;
    header.appendChild(title);
    const chartContainer = document.createElement("div");
    chartContainer.className = "chart-container";
    const canvas = document.createElement("canvas");
    canvas.id = chartInfo.id;
    chartContainer.appendChild(canvas);
    chartCard.appendChild(header);
    chartCard.appendChild(chartContainer);
    chartBox.appendChild(chartCard);
    return { chartBox, canvas };
  };

  const renderChart = (canvas, chartInfo) => {
    const ctx = canvas.getContext("2d");
    const labels = Object.keys(chartInfo.data);
    const dataValues = Object.values(chartInfo.data);
    const backgroundColors = labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]);

    let chartType = 'bar';
    let options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
    };

    if (labels.length <= 4) {
        chartType = 'pie';
        options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        };
    }

    new Chart(ctx, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [{ label: chartInfo.title, data: dataValues, backgroundColor: backgroundColors, borderWidth: 0 }]
      },
      options: options
    });
  };

  const initMap = () => {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const map = L.map('map').setView([-23.55052, -46.633308], 12); // Centro de São Paulo

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    fetch('/api/map-data')
      .then(response => response.json())
      .then(locations => {
        locations.forEach(location => {
          L.marker(location.coords).addTo(map)
            .bindPopup(location.name);
        });
      })
      .catch(error => console.error('Erro ao buscar dados do mapa:', error));
  };

  // --- Lógica Principal ---
  if (chartsGrid) {
    fetch("/api/dashboard-data")
      .then(response => {
        if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
        return response.json();
      })
      .then(data => {
        if (data.error) {
          chartsGrid.innerHTML = `<p class="empty-state">${data.error} ${data.details || ""}</p>`;
          return;
        }

        if (statParticipantes) statParticipantes.textContent = data.total_participantes || '0';
        if (statLocais) statLocais.textContent = data.locais_mapeados || '0';
        
        if (!data.charts || data.charts.length === 0) {
          chartsGrid.innerHTML = `<p class="empty-state">Nenhum dado para exibir nos gráficos.</p>`;
          return;
        }

        chartsGrid.innerHTML = ''; 
        data.charts.forEach(chartInfo => {
          const { chartBox, canvas } = createChartCard(chartInfo);
          chartsGrid.appendChild(chartBox);
          renderChart(canvas, chartInfo);
        });
      })
      .catch(error => {
        console.error("Falha ao carregar dados do dashboard:", error);
        chartsGrid.innerHTML = `<p class="empty-state">Não foi possível carregar os dados do dashboard. Tente recarregar a página.</p>`;
      });
  }
    
  // Lazy-loading de imagens de eventos
  const eventCovers = document.querySelectorAll('.event-cover[data-bg-image]');
  eventCovers.forEach(cover => {
      cover.style.backgroundImage = `url(${cover.dataset.bgImage})`;
  });

  // Inicializa o mapa
  initMap();
});
