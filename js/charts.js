const Charts = {
  instances: {},

  defaultOptions: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: 'Inter', size: 13 },
        bodyFont: { family: 'Inter', size: 12 },
        padding: 10,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { font: { family: 'Inter', size: 11 }, color: '#94A3B8' }
      },
      y: {
        grid: { color: '#F1F5F9' },
        border: { display: false },
        ticks: { font: { family: 'Inter', size: 11 }, color: '#94A3B8' },
        beginAtZero: true
      }
    }
  },

  createLine(canvasId, labels, datasets, customOptions = {}) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    datasets.forEach(ds => {
      ds.tension = ds.tension || 0.4;
      ds.borderWidth = ds.borderWidth || 2;
      ds.pointRadius = ds.pointRadius || 0;
      ds.pointHoverRadius = ds.pointHoverRadius || 4;
    });
    const options = this._mergeOptions(customOptions);
    this.instances[canvasId] = new Chart(ctx, {
      type: 'line', data: { labels, datasets }, options
    });
    return this.instances[canvasId];
  },

  createBar(canvasId, labels, datasets, customOptions = {}) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    datasets.forEach(ds => {
      ds.borderRadius = ds.borderRadius || 6;
      ds.borderSkipped = false;
    });
    const options = this._mergeOptions(customOptions);
    this.instances[canvasId] = new Chart(ctx, {
      type: 'bar', data: { labels, datasets }, options
    });
    return this.instances[canvasId];
  },

  createDoughnut(canvasId, labels, data, colors) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    this.instances[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data, backgroundColor: colors,
          borderWidth: 0, cutout: '75%'
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { family: 'Inter', size: 12 }, padding: 16, usePointStyle: true, pointStyle: 'circle' } },
          tooltip: { ...this.defaultOptions.plugins.tooltip }
        }
      }
    });
    return this.instances[canvasId];
  },

  createArea(canvasId, labels, datasets, customOptions = {}) {
    datasets.forEach(ds => { ds.fill = true; });
    return this.createLine(canvasId, labels, datasets, customOptions);
  },

  destroy(canvasId) {
    if (this.instances[canvasId]) {
      this.instances[canvasId].destroy();
      delete this.instances[canvasId];
    }
  },

  destroyAll() {
    Object.keys(this.instances).forEach(id => this.destroy(id));
  },

  update(canvasId, newData) {
    if (this.instances[canvasId]) {
      this.instances[canvasId].data.datasets[0].data = newData;
      this.instances[canvasId].update('none');
    }
  },

  _mergeOptions(custom) {
    return {
      ...this.defaultOptions,
      ...custom,
      plugins: { ...this.defaultOptions.plugins, ...(custom.plugins || {}) },
      scales: { ...this.defaultOptions.scales, ...(custom.scales || {}) }
    };
  }
};
