const dashboardSection = document.getElementById("dashboard");

if (dashboardSection) {
  fetch("/api/dashboard-data")
    .then((res) => res.json())
    .then((data) => {
      if (data.error) return;

      const total = document.getElementById("stat-participantes");
      const locais = document.getElementById("stat-locais");
      if (total) total.textContent = data.total_participantes ?? "–";
      if (locais) locais.textContent = Object.keys(data.locais || {}).length || "–";

      renderHorizontalBar(
        "chart-frequencia",
        data.frequencia_uso,
        "#6c5ce7"
      );
      renderVerticalBar("chart-idade", data.faixa_etaria, "#00b894");
      renderHorizontalBar("chart-desafios", data.principais_desafios, "#fd9644");
      renderPie("chart-ativismo", data.ativismo, ["#0984e3", "#00b894", "#fdcb6e"]);
    })
    .catch((err) => {
      console.error("Erro ao carregar dashboard:", err);
    });
}

function renderHorizontalBar(canvasId, dataset, color) {
  const el = document.getElementById(canvasId);
  if (!el || !dataset) return;
  const labels = Object.keys(dataset);
  const values = Object.values(dataset);

  new Chart(el, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: color,
          borderRadius: 8,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { precision: 0 },
        },
        y: {
          grid: { display: false },
        },
      },
    },
  });
}

function renderVerticalBar(canvasId, dataset, color) {
  const el = document.getElementById(canvasId);
  if (!el || !dataset) return;
  const labels = Object.keys(dataset);
  const values = Object.values(dataset);

  new Chart(el, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: color,
          borderRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { display: true }, ticks: { precision: 0 } },
      },
    },
  });
}

function renderPie(canvasId, dataset, colors) {
  const el = document.getElementById(canvasId);
  if (!el || !dataset) return;
  const labels = Object.keys(dataset);
  const values = Object.values(dataset);

  new Chart(el, {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { boxWidth: 10 } },
      },
    },
  });
}

// Carrega as imagens de fundo dinamicamente para evitar erros de linter
document.addEventListener("DOMContentLoaded", () => {
  const coverElements = document.querySelectorAll("[data-bg-image]");
  coverElements.forEach(element => {
    const imageUrl = element.getAttribute("data-bg-image");
    if (imageUrl) {
      element.style.backgroundImage = `url(${imageUrl})`;
    }
  });
});
